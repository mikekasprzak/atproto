import { Router, json } from 'express'
//import { AuthScope } from '../auth-verifier'
import { AppContext } from '../context'
import { Record as ProfileRecord } from '../lexicon/types/app/bsky/actor/profile'

export const pubRoutePrefix = '/activitypub'
export const atRoutePrefix = '/atpub'

export const createRouter = (ctx: AppContext): Router => {
  const router = Router()
  router.use(json())

  // actor should be one of req.hostname-ctx.cfg.service.hostname or req.hostname-ctx.cfg.service.hostnameRoot

  const inferPubHandle = function (
    hostname: string,
    pubActor: string,
    atHandle: string,
  ) {
    return !pubActor.startsWith('did:')
      ? `${pubActor}@${atHandle.substring(pubActor.length + 1)}`
      : atHandle !== ctx.cfg.service.hostname &&
          atHandle.endsWith(ctx.cfg.service.hostname)
        ? `${atHandle.substring(0, atHandle.length - ctx.cfg.service.hostname.length - 1)}@${ctx.cfg.service.hostname}`
        : ctx.cfg.service.hostnameRoot &&
            atHandle !== ctx.cfg.service.hostnameRoot &&
            atHandle.endsWith(ctx.cfg.service.hostnameRoot)
          ? `${atHandle.substring(0, atHandle.length - ctx.cfg.service.hostnameRoot.length - 1)}@${ctx.cfg.service.hostnameRoot}`
          : atHandle !== hostname && atHandle.endsWith(hostname)
            ? `${atHandle.substring(0, atHandle.length - hostname.length - 1)}@${hostname}`
            : `${atHandle}@${hostname}`
  }

  type DIDByActorHost = {
    did?: string | undefined
    didFoundBy?: string | undefined
    handle?: string | undefined
  }

  const findDIDByActorHost = async function (
    req,
    res,
    actor: string,
    host: string,
  ) {
    const ret: DIDByActorHost = {}

    if (!ret.did) {
      // Test with the given hostname, or without if its the same as the actor or a DID
      const atHandle =
        actor.startsWith('did:') || actor === host ? actor : `${actor}.${host}`
      const atUser = await ctx.accountManager.getAccount(atHandle)
      ret.did = atUser?.did
      if (ret.did) {
        ret.didFoundBy = 'given'
        ret.handle =
          actor.startsWith('did:') && atUser?.handle
            ? `${atUser.handle}`
            : atHandle
      }
    }

    if (actor.startsWith('did:')) {
      return ret // return early
    }

    if (!ret.did) {
      // Test with the service hostname, or without if its the same as the given hostname
      const atHandle =
        host === ctx.cfg.service.hostname
          ? actor
          : `${actor}.${ctx.cfg.service.hostname}`
      const atUser = await ctx.accountManager.getAccount(atHandle)
      ret.did = atUser?.did
      if (ret.did) {
        ret.didFoundBy = 'hostname'
        ret.handle = atHandle // prefer the handle we made
      }
    }

    if (!ret.did) {
      // Test with the alternate hostname, or without if its the same as the given hostname
      const atHandle =
        host === ctx.cfg.service.hostnameRoot
          ? actor
          : `${actor}.${ctx.cfg.service.hostnameRoot}`
      const atUser = await ctx.accountManager.getAccount(atHandle)
      ret.did = atUser?.did
      if (ret.did) {
        ret.didFoundBy = 'althostname'
        ret.handle = atHandle // prefer the handle we made
      }
    }
    return ret
  }

  router.get(`${pubRoutePrefix}/:actor/inbox`, async function (req, res) {
    //inbox.push(JSON.stringify(req.body))
    return res.type('application/activity+json').json({
      error: 'Not Found',
    })
  })

  // Messages to multiple recipients go here
  router.get(`${pubRoutePrefix}-inbox`, async function (req, res) {
    //inbox.push(JSON.stringify(req.body))
    return res.type('application/activity+json').json({
      error: 'Not Found',
    })
  })

  // hack
  //router.get(`${routePrefix}/:actor/inspect`, async function (req, res) {
  //  console.log(inbox)
  //  return res.type('text/plain').send(inbox.join('\n\n'))
  //})

  router.get(`${pubRoutePrefix}/:actor/outbox`, async function (req, res) {
    const domPrefix = `${req.protocol}://${req.hostname}`
    const pubUriHandle = `${domPrefix}${pubRoutePrefix}/${req.params.actor}`

    let pub: DIDByActorHost
    try {
      pub = await findDIDByActorHost(req, res, req.params.actor, req.hostname)
    } catch (err) {
      return res.status(500).send('Internal Server Error')
    }
    if (!pub.did) {
      return res.status(404).send('User not found')
    }

    const noteId = 1
    const notePublished = '2025-06-01T12:50:05Z'
    const noteContent = '<p>hello worm 🪱🍄</p>'

    if (req.query.page) {
      return res.type('application/activity+json').json({
        '@context': 'https://www.w3.org/ns/activitystreams',
        id: req.url,
        type: 'OrderedCollectionPage',
        //prev: '',
        partOf: `${pubUriHandle}/outbox`,
        orderedItems: [
          {
            id: `${pubUriHandle}/statuses/${noteId}/activity`,
            type: 'Create',
            actor: pubUriHandle,
            published: notePublished,
            to: ['https://www.w3.org/ns/activitystreams#Public'],
            cc: [`${pubUriHandle}/followers`],
            object: {
              id: `${pubUriHandle}/statuses/${noteId}`,
              type: 'Note',
              summary: null,
              inReplyTo: null,
              published: notePublished,
              //url: '',
              attributedTo: pubUriHandle,
              to: ['https://www.w3.org/ns/activitystreams#Public'],
              cc: [`${pubUriHandle}/followers`],
              sensitive: false,
              content: noteContent,
              contentMap: {
                en: noteContent,
              },
              attachment: [],
              tag: [],
              replies: {
                id: `${pubUriHandle}/statuses/${noteId}/replies`,
                type: 'Collection',
                first: {
                  type: 'CollectionPage',
                  next: `${pubUriHandle}/statuses/${noteId}/replies?page=true`,
                  partOf: `${pubUriHandle}/statuses/${noteId}/replies`,
                  items: [],
                },
              },
              likes: {
                id: `${pubUriHandle}/statuses/${noteId}/likes`,
                type: 'Collection',
                totalItems: 0,
              },
              shares: {
                id: `${pubUriHandle}/statuses/${noteId}/shares`,
                type: 'Collection',
                totalItems: 0,
              },
            },
          },
        ],
      })
    } else {
      return res.type('application/activity+json').json({
        '@context': 'https://www.w3.org/ns/activitystreams',
        id: `${pubUriHandle}/outbox`,
        type: 'OrderedCollection',
        totalItems: 0,
        first: `${pubUriHandle}/outbox?page=true`, // placeholder
        last: `${pubUriHandle}/outbox?min_id=0&page=true`, // placeholder
      })
    }
  })

  router.get(`${pubRoutePrefix}/:actor/followers`, async function (req, res) {
    const domPrefix = `${req.protocol}://${req.hostname}`
    const pubUriHandle = `${domPrefix}${pubRoutePrefix}/${req.params.actor}`

    let pub: DIDByActorHost
    try {
      pub = await findDIDByActorHost(req, res, req.params.actor, req.hostname)
    } catch (err) {
      return res.status(500).send('Internal Server Error')
    }
    if (!pub.did) {
      return res.status(404).send('User not found')
    }

    return res.type('application/activity+json').json({
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: `${pubUriHandle}/followers`,
      type: 'OrderedCollection',
      totalItems: 0,
      first: `${pubUriHandle}/followers?page=1`, // placeholder
    })
  })

  router.get(`${pubRoutePrefix}/:actor/following`, async function (req, res) {
    const domPrefix = `${req.protocol}://${req.hostname}`
    const pubUriHandle = `${domPrefix}${pubRoutePrefix}/${req.params.actor}`

    let pub: DIDByActorHost
    try {
      pub = await findDIDByActorHost(req, res, req.params.actor, req.hostname)
    } catch (err) {
      return res.status(500).send('Internal Server Error')
    }
    if (!pub.did) {
      return res.status(404).send('User not found')
    }

    return res.type('application/activity+json').json({
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: `${pubUriHandle}/following`,
      type: 'OrderedCollection',
      totalItems: 0,
      first: `${pubUriHandle}/following?page=1`, // placeholder
    })
  })

  router.get(`${pubRoutePrefix}/:actor/featured`, async function (req, res) {
    const domPrefix = `${req.protocol}://${req.hostname}`
    const pubUriHandle = `${domPrefix}${pubRoutePrefix}/${req.params.actor}`

    let pub: DIDByActorHost
    try {
      pub = await findDIDByActorHost(req, res, req.params.actor, req.hostname)
    } catch (err) {
      return res.status(500).send('Internal Server Error')
    }
    if (!pub.did) {
      return res.status(404).send('User not found')
    }

    const noteId = 1
    const notePublished = '2025-06-01T12:50:05Z'
    const noteContent = '<p>hello worm 🪱🍄</p>'

    return res.type('application/activity+json').json({
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: `${pubUriHandle}/featured`,
      type: 'OrderedCollection',
      totalItems: 1,
      orderedItems: [
        {
          id: `${pubUriHandle}/statuses/${noteId}/activity`,
          type: 'Create',
          actor: pubUriHandle,
          published: notePublished,
          to: ['https://www.w3.org/ns/activitystreams#Public'],
          cc: [`${pubUriHandle}/followers`],
          object: {
            id: `${pubUriHandle}/statuses/${noteId}`,
            type: 'Note',
            summary: null,
            inReplyTo: null,
            published: notePublished,
            //url: '',
            attributedTo: pubUriHandle,
            to: ['https://www.w3.org/ns/activitystreams#Public'],
            cc: [`${pubUriHandle}/followers`],
            sensitive: false,
            content: noteContent,
            contentMap: {
              en: noteContent,
            },
            attachment: [],
            tag: [],
            replies: {
              id: `${pubUriHandle}/statuses/${noteId}/replies`,
              type: 'Collection',
              first: {
                type: 'CollectionPage',
                next: `${pubUriHandle}/statuses/${noteId}/replies?page=true`,
                partOf: `${pubUriHandle}/statuses/${noteId}/replies`,
                items: [],
              },
            },
            likes: {
              id: `${pubUriHandle}/statuses/${noteId}/likes`,
              type: 'Collection',
              totalItems: 0,
            },
            shares: {
              id: `${pubUriHandle}/statuses/${noteId}/shares`,
              type: 'Collection',
              totalItems: 0,
            },
          },
        },
      ],
    })
  })

  router.get(`${pubRoutePrefix}/:actor`, async function (req, res) {
    const domPrefix = `${req.protocol}://${req.hostname}`
    const pubUriHandle = `${domPrefix}${pubRoutePrefix}/${req.params.actor}`

    let pub: DIDByActorHost
    try {
      pub = await findDIDByActorHost(req, res, req.params.actor, req.hostname)
    } catch (err) {
      return res.status(500).send('Internal Server Error')
    }
    if (!pub.did) {
      return res.status(404).send('User not found')
    }

    let profile: ProfileRecord | undefined
    await ctx.actorStore.read(pub.did, async (actor) => {
      profile = (await actor.record.getProfileRecord()) as ProfileRecord
    })

    const avatar = 'bafkreie4clchqmbflkdr2lvtvvtotczxrgqs3rvwhqgonlwhfqwfpiiatu'
    //${profile?.url.ref['$link']}

    return res.type('application/activity+json').json({
      '@context': [
        'https://www.w3.org/ns/activitystreams',
        'https://w3id.org/security/v1',
      ],
      id: pubUriHandle,
      type: 'Person',
      name: req.params.actor,
      preferredUsername: profile?.displayName,
      summary: `<p>${profile?.description}</p>`,
      url: pubUriHandle,
      inbox: `${pubUriHandle}/inbox`,
      outbox: `${pubUriHandle}/outbox`,
      followers: `${pubUriHandle}/followers`,
      following: `${pubUriHandle}/following`,
      featured: `${pubUriHandle}/featured`,
      publicKey: {
        id: `${pubUriHandle}#main-key`,
        owner: pubUriHandle,
        publicKeyPem:
          '-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----',
      },
      icon: profile?.avatar
        ? {
            type: 'Image',
            mediaType: profile?.avatar.mimeType,
            url: `https://cdn.bsky.app/img/avatar_thumbnail/plain/${pub.did}/${avatar}@jpeg`,
          }
        : undefined,
      image: {
        type: 'Image',
        mediaType: 'image/jpeg',
        url: 'https://cdn.bsky.app/img/banner/plain/did:plc:tu6g7v7tghfxkxfz6em73nob/bafkreie4clchqmbflkdr2lvtvvtotczxrgqs3rvwhqgonlwhfqwfpiiatu@jpeg',
      },
    })
  })

  router.get(`${atRoutePrefix}/*`, async function (req, res) {
    const pubDid = req.params[0] //.replaceAll('/', ':')

    const domPrefix = `${req.protocol}://${req.hostname}`
    const atUriHandle = `${domPrefix}${atRoutePrefix}/${pubDid}`

    console.log(req.params)

    let did: string | unknown
    let pubHandle: string | unknown
    try {
      const atUser = await ctx.accountManager.getAccount(pubDid)
      did = atUser?.did
      pubHandle = atUser?.handle
    } catch (err) {
      return res.status(500).send('Internal Server Error')
    }
    if (typeof did !== 'string') {
      return res.status(404).send('User not found')
    }

    let profile: ProfileRecord | undefined
    await ctx.actorStore.read(did, async (actor) => {
      profile = (await actor.record.getProfileRecord()) as ProfileRecord
    })

    const avatar = 'bafkreie4clchqmbflkdr2lvtvvtotczxrgqs3rvwhqgonlwhfqwfpiiatu'
    //${profile?.url.ref['$link']}

    return res.type('application/activity+json').json({
      '@context': [
        'https://www.w3.org/ns/activitystreams',
        'https://w3id.org/security/v1',
      ],
      id: atUriHandle,
      type: 'Person',
      name: pubHandle,
      preferredUsername: profile?.displayName,
      summary: `<p>${profile?.description}</p>`,
      url: atUriHandle,
      inbox: `${atUriHandle}/inbox`,
      outbox: `${atUriHandle}/outbox`,
      followers: `${atUriHandle}/followers`,
      following: `${atUriHandle}/following`,
      featured: `${atUriHandle}/featured`,
      publicKey: {
        id: `${atUriHandle}#main-key`,
        owner: atUriHandle,
        publicKeyPem:
          '-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----',
      },
      icon: profile?.avatar
        ? {
            type: 'Image',
            mediaType: profile?.avatar.mimeType,
            url: `https://cdn.bsky.app/img/avatar_thumbnail/plain/${did}/${avatar}@jpeg`,
          }
        : undefined,
      image: {
        type: 'Image',
        mediaType: 'image/jpeg',
        url: 'https://cdn.bsky.app/img/banner/plain/did:plc:tu6g7v7tghfxkxfz6em73nob/bafkreie4clchqmbflkdr2lvtvvtotczxrgqs3rvwhqgonlwhfqwfpiiatu@jpeg',
      },
    })
  })

  router.get('/.well-known/webfinger', async function (req, res) {
    if (typeof req.query.resource !== 'string') {
      return res.status(400).send() // Mastodon sends a blank 400
    }
    const pubSubject = req.query.resource
    const pubHandle = pubSubject.substring('acct:'.length)
    if (!pubHandle || pubSubject.substring(0, 'acct:'.length) !== 'acct:') {
      return res.status(400).send('Unsupported Resource') // Mastodon sends a blank 400
    }
    // TODO: do a better validity test than merely splitting at one @
    const [pubActor, pubHost, ...pubHandleExtra] = pubHandle.split('@')
    if (pubHandleExtra.length || !pubActor || !pubHost) {
      return res.status(400).send('Invalid Handle') // Mastodon sends a blank 400
    }

    let at: DIDByActorHost
    try {
      at = await findDIDByActorHost(req, res, pubActor, pubHost)
    } catch (err) {
      return res.status(500).send('Internal Server Error')
    }
    if (!at.did || !at.handle) {
      return res.status(404).send('Not Found') // Mastodon sends a blank 404
    }

    const newSubject = inferPubHandle(req.hostname, pubActor, at.handle)

    /*
    const newSubject = !pubActor.startsWith('did:')
      ? `${pubActor}@${at.handle.substring(pubActor.length + 1)}`
      : at.handle !== ctx.cfg.service.hostname &&
          at.handle.endsWith(ctx.cfg.service.hostname)
        ? `${at.handle.substring(0, at.handle.length - ctx.cfg.service.hostname.length - 1)}@${ctx.cfg.service.hostname}`
        : ctx.cfg.service.hostnameRoot &&
            at.handle !== ctx.cfg.service.hostnameRoot &&
            at.handle.endsWith(ctx.cfg.service.hostnameRoot)
          ? `${at.handle.substring(0, at.handle.length - ctx.cfg.service.hostnameRoot.length - 1)}@${ctx.cfg.service.hostnameRoot}`
          : at.handle !== req.hostname && at.handle.endsWith(req.hostname)
            ? `${at.handle.substring(0, at.handle.length - req.hostname.length - 1)}@${req.hostname}`
            : `${at.handle}@${req.hostname}`
            */

    const domPrefix = `${req.protocol}://${req.hostname}`
    return res.type('application/jrd+json; charset=utf-8').json({
      subject: `acct:${newSubject}`,
      links: [
        !pubActor.startsWith('did:')
          ? {
              rel: 'self',
              type: 'application/activity+json',
              href: `${domPrefix}${pubRoutePrefix}/${pubActor}`,
            }
          : {
              rel: 'self',
              type: 'application/activity+json',
              href: `${domPrefix}${pubRoutePrefix}/${newSubject.split('@')[0]}`,
            },
        {
          rel: 'did',
          type: 'application/activity+json',
          href: `${domPrefix}${atRoutePrefix}/${at.did /*.replaceAll(':', '/')*/}`,
        },
      ],
    })
  })

  return router
}
