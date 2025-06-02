import { Router, json } from 'express'
//import { AuthScope } from '../auth-verifier'
import { AppContext } from '../context'
import { Record as ProfileRecord } from '../lexicon/types/app/bsky/actor/profile'

export const routePrefix = '/activitypub'
//const inbox: string[] = []

export const createRouter = (ctx: AppContext): Router => {
  const router = Router()
  router.use(json())

  // actor should be one of req.hostname-ctx.cfg.service.hostname or req.hostname-ctx.cfg.service.hostnameRoot

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
      // Test with the given hostname, or without if its the same as the actor
      const atHandle = actor === host ? actor : `${actor}.${host}`
      const atUser = await ctx.accountManager.getAccount(atHandle)
      ret.did = atUser?.did
      if (ret.did) {
        ret.didFoundBy = 'given'
        ret.handle = atHandle
      }
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
        ret.handle = atHandle
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
        ret.handle = atHandle
      }
    }
    return ret
  }

  router.get(`${routePrefix}/:actor/inbox`, async function (req, res) {
    //inbox.push(JSON.stringify(req.body))
    return res.type('application/activity+json').json({
      error: 'Not Found',
    })
  })

  // Messages to multiple recipients go here
  router.get(`${routePrefix}-inbox`, async function (req, res) {
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

  router.get(`${routePrefix}/:actor/outbox`, async function (req, res) {
    const domPrefix = `${req.protocol}://${req.hostname}`
    const pubUriHandle = `${domPrefix}${routePrefix}/${req.params.actor}`

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

  router.get(`${routePrefix}/:actor/followers`, async function (req, res) {
    const domPrefix = `${req.protocol}://${req.hostname}`
    const pubUriHandle = `${domPrefix}${routePrefix}/${req.params.actor}`

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

  router.get(`${routePrefix}/:actor/following`, async function (req, res) {
    const domPrefix = `${req.protocol}://${req.hostname}`
    const pubUriHandle = `${domPrefix}${routePrefix}/${req.params.actor}`

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

  router.get(`${routePrefix}/:actor/featured`, async function (req, res) {
    const domPrefix = `${req.protocol}://${req.hostname}`
    const pubUriHandle = `${domPrefix}${routePrefix}/${req.params.actor}`

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

  router.get(`${routePrefix}/:actor`, async function (req, res) {
    const domPrefix = `${req.protocol}://${req.hostname}`
    const pubUriHandle = `${domPrefix}${routePrefix}/${req.params.actor}`

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

  router.get('/.well-known/webfinger', async function (req, res) {
    if (typeof req.query.resource !== 'string') {
      return res.status(400).send() // Mastodon sends a blank 400
    }
    const pubSubject = req.query.resource
    const [pubResourceType, pubHandle, ...pubSubjectExtra] =
      pubSubject.split(':')
    if (pubSubjectExtra.length || !pubHandle || pubResourceType !== 'acct') {
      return res.status(400).send('Invalid Resource') // Mastodon sends a blank 400
    }
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
    if (!at.did) {
      return res.status(404).send('Not Found') // Mastodon sends a blank 404
    }

    // Prefer a subject that is directly derived from the handle chosen by the did
    const newSubject = `acct:${at.handle?.substring(0, pubActor.length)}@${at.handle?.substring(pubActor.length + 1)}`

    const domPrefix = `${req.protocol}://${req.hostname}`
    return res.type('application/jrd+json; charset=utf-8').json({
      subject: newSubject,
      links: [
        {
          rel: 'self',
          type: 'application/activity+json',
          href: `${domPrefix}${routePrefix}/${pubActor}`,
        },
      ],
    })
  })

  return router
}
