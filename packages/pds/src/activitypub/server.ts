import { Router, json } from 'express'
//import { AuthScope } from '../auth-verifier'
import { AppContext } from '../context'
import { Record as ProfileRecord } from '../lexicon/types/app/bsky/actor/profile'

export const routePrefix = '/activitypub'
const inbox: string[] = []

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const activityStreamResponseBase = {
  '@context': ['https://www.w3.org/ns/activitystreams'],
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const activityStreamSecureResponseBase = {
  '@context': [
    'https://www.w3.org/ns/activitystreams',
    'https://w3id.org/security/v1',
  ],
}

export const createRouter = (ctx: AppContext): Router => {
  const router = Router()
  router.use(json())

  // actor should be one of req.hostname-ctx.cfg.service.hostname or req.hostname-ctx.cfg.service.hostnameRoot

  router.post(`${routePrefix}/:actor/inbox`, async function (req, res) {
    inbox.push(JSON.stringify(req.body))
    return res.json()
  })

  // Messages to multiple recipients go here
  router.post(`${routePrefix}-inbox`, async function (req, res) {
    inbox.push(JSON.stringify(req.body))
    return res.json()
  })

  // hack
  router.get(`${routePrefix}/:actor/inspect`, async function (req, res) {
    console.log(inbox)
    return res.type('text/plain').send(inbox.join('\n\n'))
  })

  router.get(`${routePrefix}/:actor/outbox`, async function (req, res) {
    return res.json({
      '@context': ['https://www.w3.org/ns/activitystreams'],

      test: `outbox ${req.params.actor}`,
    })
  })

  router.get(`${routePrefix}/:actor/followers`, async function (req, res) {
    return res.json({
      '@context': ['https://www.w3.org/ns/activitystreams'],

      test: `followers ${req.params.actor}`,
    })
  })

  router.get(`${routePrefix}/:actor/following`, async function (req, res) {
    return res.json({
      '@context': ['https://www.w3.org/ns/activitystreams'],

      test: `following ${req.params.actor}`,
    })
  })

  router.get(`${routePrefix}/:actor`, async function (req, res) {
    const domPrefix = `${req.protocol}://${req.hostname}`

    const atHandle = `${req.params.actor}.${req.hostname}`
    //const pubHandle = `${req.params.actor}@${req.hostname}`
    const pubUriHandle = `${domPrefix}${routePrefix}/${req.params.actor}`

    /*
    if (
      !ctx.cfg.identity.serviceHandleDomains.some(
        (host) => atHandle.endsWith(host) || atHandle === host.slice(1),
      )
    ) {
      return res.status(404).send('User not found')
    }
    */

    let did: string | undefined
    try {
      const user = await ctx.accountManager.getAccount(atHandle)
      //console.log(user)
      did = user?.did
    } catch (err) {
      return res.status(500).send('Internal Server Error')
    }
    if (!did) {
      return res.status(404).send('User not found')
    }

    let profile: ProfileRecord | undefined

    // lookup using did
    await ctx.actorStore.read(did, async (actor) => {
      /*
      const eventData = await actor.repo.getSyncEventData()
      const prefs = await actor.pref.getPreferences(
        'app.bsky.actor.getPreferences',
        AuthScope.Access,
      )
      */
      profile = (await actor.record.getProfileRecord()) as ProfileRecord

      //console.log(did, '\n', eventData, '\n', prefs, '\n', profile)
    })

    return res.json({
      '@context': [
        'https://www.w3.org/ns/activitystreams',
        'https://w3id.org/security/v1',
      ],
      id: pubUriHandle,
      type: 'Person',
      name: req.params.actor,
      preferredUsername: profile?.displayName,
      summary: `<p>${profile?.description}</p>`,
      //url: '',
      inbox: `${pubUriHandle}/inbox`,
      outbox: `${pubUriHandle}/outbox`,
      followers: `${pubUriHandle}/followers`,
      following: `${pubUriHandle}/following`,
      publicKey: {
        id: `${pubUriHandle}#main-key`,
        owner: pubUriHandle,
        publicKeyPem:
          '-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----',
      },
      icon: profile?.avatar
        ? {
            type: 'Image',
            mediaType: 'image/png',
            url: profile?.avatar,
          }
        : undefined,
    })
  })

  // This code should correctly identify a user when a-records are on both domains
  //   site.com/.well-known/webfinger?resource=acct:user@site.com
  //   user.site.com/.well-known/webfinger?resource=acct:user@site.com (but only user, not user2)
  router.get('/.well-known/webfinger', async function (req, res) {
    if (typeof req.query.resource !== 'string') {
      return res.status(400).send() // Mastodon sends a blank 400
    }
    const pubSubject = req.query.resource
    const [pubResourceType, pubHandle, pubSubjectExtra] = pubSubject.split(':')
    if (pubSubjectExtra || !pubHandle || pubResourceType !== 'acct') {
      return res.status(400).send('Invalid Resource') // Mastodon sends a blank 400
    }
    // This only allows direct subdomain users (user@pds.website.com -> user.pds.website.com || pds.website.com/user)
    // TODO: allow alternate domain subdomains (user@website.com -> user.pds.website.com && user.website.com)
    // TODO: support atproto domain aliases as a child of the PDS (alias.blog@mypds.com)
    const [pubActor, pubDomain, pubHandleExtra] = pubHandle.split('@')
    if (
      pubHandleExtra ||
      !pubDomain ||
      //(req.hostname.split('.')[0] === pubActor &&
      //  !req.hostname.split('.')[1].endsWith(pubDomain)) ||
      !req.hostname.endsWith(pubDomain)
    ) {
      return res.status(400).send('Invalid Handle') // Mastodon sends a blank 400
    }

    const atHandle =
      req.hostname.split('.')[0] === pubActor
        ? req.hostname
        : `${pubActor}.${pubDomain}`

    let did: string | undefined
    try {
      const user = await ctx.accountManager.getAccount(atHandle)
      //console.log(atHandle, user)
      did = user?.did
    } catch (err) {
      return res.status(500).send('Internal Server Error')
    }

    if (!did) {
      return res.status(404).send('Not Found') // Mastodon sends a blank 404
    }

    const domPrefix = `${req.protocol}://${req.hostname}`
    return res.type('application/jrd+json; charset=utf-8').json({
      subject: pubSubject,
      links: [
        {
          rel: 'self',
          type: 'application/activity+json',
          href: `${domPrefix}${routePrefix}/${pubActor}`,
        },
      ],
      did: did, // temporary
    })
  })

  return router
}
