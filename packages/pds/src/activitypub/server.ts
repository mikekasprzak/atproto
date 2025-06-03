import { RequestHandler, Router, json } from 'express'
//import { AuthScope } from '../auth-verifier'
import { AppContext } from '../context'
import { Record as ProfileRecord } from '../lexicon/types/app/bsky/actor/profile'

export const pubRoutePrefix = '/activitypub'
export const atRoutePrefix = '/atpub'

export const createRouter = (ctx: AppContext): Router => {
  const router = Router()
  router.use(json())

  const genDomainPrefix = (req) =>
    `${req.protocol}://${req.hostname}${ctx.cfg.service.devMode && ctx.cfg.service.port ? ':' + ctx.cfg.service.port : ''}`

  const inferPubHandle = (hostname: string, handle: string, actor?: string) =>
    actor && !actor.startsWith('did:')
      ? `${actor}@${handle.substring(actor.length + 1)}`
      : handle !== ctx.cfg.service.hostname &&
          handle.endsWith(ctx.cfg.service.hostname)
        ? `${handle.substring(0, handle.length - ctx.cfg.service.hostname.length - 1)}@${ctx.cfg.service.hostname}`
        : ctx.cfg.service.hostnameRoot &&
            handle !== ctx.cfg.service.hostnameRoot &&
            handle.endsWith(ctx.cfg.service.hostnameRoot)
          ? `${handle.substring(0, handle.length - ctx.cfg.service.hostnameRoot.length - 1)}@${ctx.cfg.service.hostnameRoot}`
          : handle !== hostname && handle.endsWith(hostname)
            ? `${handle.substring(0, handle.length - hostname.length - 1)}@${hostname}`
            : `${handle}@${hostname}`

  type DIDByActorHost = {
    did?: string
    handle?: string
    didFoundBy?: 'given' | 'hostname' | 'althostname'
  }

  const findDIDByActorHost = async function (
    req: Parameters<RequestHandler>[0],
    res: Parameters<RequestHandler>[1],
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

  type AtPubInfo = {
    did: string
    domainPrefix: string
    pubUri: string
    pubUriHandle: string
    pubHandle: string
    atHandle: string
  }

  const getAPubInfo = async function (req, res): Promise<AtPubInfo | null> {
    let did: string | unknown
    let atHandle: string | unknown

    try {
      if (req.params.did) {
        const atUser = await ctx.accountManager.getAccount(req.params.did)
        did = atUser?.did
        atHandle = atUser?.handle
      } else if (req.params.actor) {
        const pub = await findDIDByActorHost(
          req,
          res,
          req.params.actor,
          req.hostname,
        )
        did = pub?.did
        atHandle = pub?.handle
      }
    } catch (err) {
      return res.status(500).send('Internal Server Error')
    }
    if (typeof did !== 'string' || typeof atHandle !== 'string') {
      return null
    }

    const domainPrefix = genDomainPrefix(req)

    return {
      did,
      domainPrefix,
      pubUri: req.params.did
        ? `${domainPrefix}${atRoutePrefix}`
        : `${domainPrefix}${pubRoutePrefix}`,
      pubUriHandle: req.params.did
        ? `${domainPrefix}${atRoutePrefix}/${did}`
        : `${domainPrefix}${pubRoutePrefix}/${req.params.actor}`,
      pubHandle: req.params.did
        ? inferPubHandle(req.hostname, atHandle)
        : `${req.params.actor}@${req.hostname}`,
      atHandle,
    } as AtPubInfo
  }

  const makeActivity = function (
    type: 'Create',
    uriHandle: string,
    id: number,
    published: string,
    object: object,
  ) {
    return {
      id: `${uriHandle}/statuses/${id}/activity`,
      type,
      actor: uriHandle,
      published: published,
      to: ['https://www.w3.org/ns/activitystreams#Public'],
      cc: [`${uriHandle}/followers`], // public
      object,
    }
  }

  const makeNote = function (
    uriHandle: string,
    id: number,
    published: string,
    content: string,
  ) {
    const totalLikes = 0
    const totalShares = 0

    return {
      id: `${uriHandle}/statuses/${id}`,
      type: 'Note',
      summary: null,
      inReplyTo: null,
      published: published,
      //url: '',
      attributedTo: uriHandle,
      to: ['https://www.w3.org/ns/activitystreams#Public'],
      cc: [`${uriHandle}/followers`], // public
      sensitive: false,
      content: content,
      contentMap: {
        en: content,
      },
      attachment: [],
      tag: [],
      replies: {
        id: `${uriHandle}/statuses/${id}/replies`,
        type: 'Collection',
        first: {
          type: 'CollectionPage',
          next: `${uriHandle}/statuses/${id}/replies?page=true`,
          partOf: `${uriHandle}/statuses/${id}/replies`,
          items: [],
        },
      },
      likes: {
        id: `${uriHandle}/statuses/${id}/likes`,
        type: 'Collection',
        totalItems: totalLikes,
      },
      shares: {
        id: `${uriHandle}/statuses/${id}/shares`,
        type: 'Collection',
        totalItems: totalShares,
      },
    }
  }

  router.post(
    [`${atRoutePrefix}/:did/inbox`, `${pubRoutePrefix}/:actor/inbox`],
    async function (req, res) {
      //inbox.push(JSON.stringify(req.body))
      return res.type('application/activity+json').status(501).json({
        error: 'Not Currently Implemented',
      })
    },
  )

  // Messages to multiple recipients go here
  router.post(
    [`${atRoutePrefix}-inbox`, `${pubRoutePrefix}-inbox`],
    async function (req, res) {
      //inbox.push(JSON.stringify(req.body))
      return res.type('application/activity+json').status(501).json({
        error: 'Not Currently Implemented',
      })
    },
  )

  router.get(
    [`${atRoutePrefix}/:did/outbox`, `${pubRoutePrefix}/:actor/outbox`],
    async function (req, res) {
      let info: AtPubInfo | null
      try {
        info = await getAPubInfo(req, res)
      } catch (err) {
        return res.status(500).send('Internal Server Error')
      }
      if (!info) {
        return res.status(404).send('User not found')
      }

      const childId = 1
      const publishedAt = '2025-06-01T12:50:05Z'
      const content = '<p>hello worm 🪱🍄</p>'
      const items = [
        makeActivity(
          'Create',
          info.pubUriHandle,
          childId,
          publishedAt,
          makeNote(info.pubUriHandle, childId, publishedAt, content),
        ),
      ]

      if (req.query.page) {
        return res.type('application/activity+json').json({
          '@context': 'https://www.w3.org/ns/activitystreams',
          id: req.url,
          type: 'OrderedCollectionPage',
          //prev: '',
          partOf: `${info.pubUriHandle}/outbox`,
          orderedItems: items,
        })
      } else {
        return res.type('application/activity+json').json({
          '@context': 'https://www.w3.org/ns/activitystreams',
          id: `${info.pubUriHandle}/outbox`,
          type: 'OrderedCollection',
          totalItems: items.length,
          first: `${info.pubUriHandle}/outbox?page=true`, // placeholder
          last: `${info.pubUriHandle}/outbox?min_id=0&page=true`, // placeholder
        })
      }
    },
  )

  router.get(
    [
      `${atRoutePrefix}/:did/statuses/:id`,
      `${pubRoutePrefix}/:actor/statuses/:id`,
    ],
    async function (req, res) {
      let info: AtPubInfo | null
      try {
        info = await getAPubInfo(req, res)
      } catch (err) {
        return res.status(500).send('Internal Server Error')
      }
      if (!info) {
        return res.status(404).send('User not found')
      }

      const childId = parseInt(req.params.id)
      const publishedAt = '2025-06-01T12:50:05Z'
      const content = '<p>hello worm 🪱🍄</p>'

      return res.type('application/activity+json').json({
        '@context': 'https://www.w3.org/ns/activitystreams',
        ...makeNote(info.pubUriHandle, childId, publishedAt, content),
      })
    },
  )

  router.get(
    [
      `${atRoutePrefix}/:did/statuses/:id/activity`,
      `${pubRoutePrefix}/:actor/statuses/:id/activity`,
    ],
    async function (req, res) {
      let info: AtPubInfo | null
      try {
        info = await getAPubInfo(req, res)
      } catch (err) {
        return res.status(500).send('Internal Server Error')
      }
      if (!info) {
        return res.status(404).send('User not found')
      }

      const childId = parseInt(req.params.id)
      const publishedAt = '2025-06-01T12:50:05Z'
      const content = '<p>hello worm 🪱🍄</p>'

      return res.type('application/activity+json').json({
        '@context': 'https://www.w3.org/ns/activitystreams',
        ...makeActivity(
          'Create',
          info.pubUriHandle,
          childId,
          publishedAt,
          makeNote(info.pubUriHandle, childId, publishedAt, content),
        ),
      })
    },
  )

  router.get(
    [`${atRoutePrefix}/:did/followers`, `${pubRoutePrefix}/:actor/followers`],
    async function (req, res) {
      let info: AtPubInfo | null
      try {
        info = await getAPubInfo(req, res)
      } catch (err) {
        return res.status(500).send('Internal Server Error')
      }
      if (!info) {
        return res.status(404).send('User not found')
      }

      const items = []

      return res.type('application/activity+json').json({
        '@context': 'https://www.w3.org/ns/activitystreams',
        id: `${info.pubUriHandle}/followers`,
        type: 'OrderedCollection',
        totalItems: items.length,
        first: `${info.pubUriHandle}/followers?page=1`, // placeholder
      })
    },
  )

  router.get(
    [`${atRoutePrefix}/:did/following`, `${pubRoutePrefix}/:actor/following`],
    async function (req, res) {
      let info: AtPubInfo | null
      try {
        info = await getAPubInfo(req, res)
      } catch (err) {
        return res.status(500).send('Internal Server Error')
      }
      if (!info) {
        return res.status(404).send('User not found')
      }

      const items = []

      return res.type('application/activity+json').json({
        '@context': 'https://www.w3.org/ns/activitystreams',
        id: `${info.pubUriHandle}/following`,
        type: 'OrderedCollection',
        totalItems: items.length,
        first: `${info.pubUriHandle}/following?page=1`, // placeholder
      })
    },
  )

  router.get(
    [`${atRoutePrefix}/:did/featured`, `${pubRoutePrefix}/:actor/featured`],
    async function (req, res) {
      let info: AtPubInfo | null
      try {
        info = await getAPubInfo(req, res)
      } catch (err) {
        return res.status(500).send('Internal Server Error')
      }
      if (!info) {
        return res.status(404).send('User not found')
      }

      const childId = 1
      const published = '2025-06-01T12:50:05Z'
      const content = '<p>hello worm 🪱🍄</p>'

      const items = [makeNote(info.pubUriHandle, childId, published, content)]

      return res.type('application/activity+json').json({
        '@context': 'https://www.w3.org/ns/activitystreams',
        id: `${info.pubUriHandle}/featured`,
        type: 'OrderedCollection',
        totalItems: items.length,
        orderedItems: items,
      })
    },
  )

  router.get(
    [`${atRoutePrefix}/:did`, `${pubRoutePrefix}/:actor`],
    async function (req, res) {
      let info: AtPubInfo | null
      try {
        info = await getAPubInfo(req, res)
      } catch (err) {
        return res.status(500).send('Internal Server Error')
      }
      if (!info) {
        return res.status(404).send('User not found')
      }

      let profile: ProfileRecord | undefined
      await ctx.actorStore.read(info.did, async (actor) => {
        profile = (await actor.record.getProfileRecord()) as ProfileRecord
      })

      return res.type('application/activity+json').json({
        '@context': [
          'https://www.w3.org/ns/activitystreams',
          'https://w3id.org/security/v1',
          {
            manuallyApprovesFollowers: 'as:manuallyApprovesFollowers',
            schema: 'http://schema.org#',
            PropertyValue: 'schema:PropertyValue',
            value: 'schema:value',
            toot: 'http://joinmastodon.org/ns#',
            featured: {
              '@id': 'toot:featured',
              '@type': '@id',
            },
            featuredTags: {
              '@id': 'toot:featuredTags',
              '@type': '@id',
            },
            alsoKnownAs: {
              '@id': 'as:alsoKnownAs',
              '@type': '@id',
            },
            movedTo: {
              '@id': 'as:movedTo',
              '@type': '@id',
            },
            discoverable: 'toot:discoverable',
            suspended: 'toot:suspended',
            memorial: 'toot:memorial',
            indexable: 'toot:indexable',
          },
        ],
        id: info.pubUriHandle,
        type: 'Person',
        name: info.pubHandle.split('@')[0],
        preferredUsername: profile?.displayName,
        summary: `<p>${profile?.description}<br/>DEBUG: ${info.pubHandle} ${info.did}</p>`,
        url: info.pubUriHandle,
        inbox: `${info.pubUriHandle}/inbox`,
        outbox: `${info.pubUriHandle}/outbox`,
        followers: `${info.pubUriHandle}/followers`,
        following: `${info.pubUriHandle}/following`,
        featured: `${info.pubUriHandle}/featured`,
        publicKey: {
          id: `${info.pubUriHandle}#main-key`,
          owner: info.pubUriHandle,
          publicKeyPem:
            '-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----',
        },
        tag: [],
        attachment: [],
        endpoints: {
          sharedInbox: `${info.pubUri}-inbox`,
        },
        icon: profile?.avatar
          ? {
              type: 'Image',
              mediaType: profile.avatar.mimeType,
              url: `https://cdn.bsky.app/img/avatar_thumbnail/plain/${info.did}/${profile.avatar.ref}@${profile.avatar.mimeType.split('/')[1]}`,
            }
          : undefined,
        image: profile?.banner
          ? {
              type: 'Image',
              mediaType: profile.banner.mimeType,
              url: `https://cdn.bsky.app/img/banner/plain/${info.did}/${profile.banner.ref}@${profile.banner.mimeType.split('/')[1]}`,
            }
          : undefined,
      })
    },
  )

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

    const newSubject = inferPubHandle(req.hostname, at.handle, pubActor)
    const domPrefix = genDomainPrefix(req)
    return res.type('application/jrd+json; charset=utf-8').json({
      subject: `acct:${newSubject}`,
      links: [
        /*!pubActor.startsWith('did:')
          ? {
              rel: 'self',
              type: 'application/activity+json',
              href: `${domPrefix}${pubRoutePrefix}/${pubActor}`,
            }
          : {
              rel: 'self',
              type: 'application/activity+json',
              href: `${domPrefix}${pubRoutePrefix}/${newSubject.split('@')[0]}`,
            },*/
        {
          rel: 'self',
          type: 'application/activity+json',
          href: `${domPrefix}${atRoutePrefix}/${at.did /*.replaceAll(':', '/')*/}`,
        },
      ],
    })
  })

  return router
}
