import { Router, json } from 'express'
import { AppContext } from '../context'

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
  router.post(`${routePrefix}-shared/inbox`, async function (req, res) {
    inbox.push(JSON.stringify(req.body))
    return res.json()
  })

  // hack
  router.get(`${routePrefix}/:actor/inspect`, async function (req, res) {
    console.log(inbox)
    return res.type('text/plain').send(inbox.join('\n\n'))
  })

  router.get(`${routePrefix}/:actor/outbox`, async function (req, res) {
    return res.json([`outbox ${req.params.actor}`])
  })

  router.get(`${routePrefix}/:actor/followers`, async function (req, res) {
    return res.json([`followers ${req.params.actor}`])
  })

  /*
  router.get(`${routePrefix}/:actor/following`, async function (req, res) {
    return res.json([`following ${req.params.actor}`])
  })
  */

  router.get(`${routePrefix}/:actor`, async function (req, res) {
    const domPrefix = `${req.protocol}://${req.hostname}`

    const atHandle = `${req.params.actor}.${req.hostname}`
    //const pubHandle = `${req.params.actor}@${req.hostname}`
    const uriHandle = `${domPrefix}${routePrefix}/${req.params.actor}`

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
      console.log(user)
      did = user?.did
    } catch (err) {
      return res.status(500).send('Internal Server Error')
    }
    if (!did) {
      return res.status(404).send('User not found')
    }

    return res.json({
      '@context': [
        'https://www.w3.org/ns/activitystreams',
        'https://w3id.org/security/v1',
      ],
      id: uriHandle,
      type: 'Person',
      name: req.params.actor,
      preferredUsername: req.params.actor,
      inbox: `${uriHandle}/inbox`,
      outbox: `${uriHandle}/outbox`,
      followers: `${uriHandle}/followers`,
      //following: `${uriHandle}/following`,
      publicKey: {
        id: `${uriHandle}#main-key`,
        owner: uriHandle,
        publicKeyPem:
          '-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----',
      },
    })
  })

  // This code should correctly identify a user when a-records are on both domains
  //   site.com/.well-known/webfinger?resource=acct:user@site.com
  //   user.site.com/.well-known/webfinger?resource=acct:user@site.com (but only user, not user2)
  router.get('/.well-known/webfinger', async function (req, res) {
    if (typeof req.query.resource !== 'string') {
      return res.status(400).send() // unknown request (Mastodon sends a blank 400)
    }
    const pubSubject = req.query.resource
    const [pubResourceType, pubHandle, ...pubSubjectMore] =
      pubSubject.split(':')
    if (pubSubjectMore || !pubHandle || pubResourceType !== 'acct') {
      return res.status(400).send() // invalid resource type (Mastodon sends a blank 400)
    }
    // This only allows direct subdomain users (user@pds.website.com -> user.pds.website.com || pds.website.com/user)
    // TODO: allow alternate domain subdomains (user@website.com -> user.pds.website.com && user.website.com)
    // TODO: support atproto domain aliases as a child of the PDS (alias.blog@mypds.com)
    const [pubActor, pubDomain, ...pubHandleMore] = pubHandle.split('@')
    if (
      pubHandleMore ||
      !pubDomain ||
      (req.hostname.split('.')[0] === pubActor &&
        !req.hostname.split('.')[1].endsWith(pubDomain)) ||
      !req.hostname.endsWith(pubDomain)
    ) {
      return res.status(400).send() // invalid or impossible handle (Mastodon sends a blank 400)
    }

    const atHandle =
      req.hostname.split('.')[0] === pubActor
        ? req.hostname
        : `${pubActor}.${pubDomain}`

    // check if user exists, send 404 if not

    let did: string | undefined
    try {
      const user = await ctx.accountManager.getAccount(atHandle)
      console.log(user)
      did = user?.did
    } catch (err) {
      return res.status(500).send('Internal Server Error')
    }

    ctx.cfg.service.hostnameRoot

    // todo look at hostname, and also hostnameRoot, an optional property I added

    const domPrefix = `${req.protocol}://${req.hostname}`

    // application/jrd+json; charset=utf-8
    return res.json({
      subject: pubSubject,
      links: [
        {
          rel: 'self',
          type: 'application/activity+json',
          href: `${domPrefix}${routePrefix}/${pubActor}`,
        },
      ],
      did: did,
    })
  })

  return router
}
