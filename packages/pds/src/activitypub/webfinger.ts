import { RequestHandler, Router, json } from 'express'
//import { AuthScope } from '../auth-verifier'
import { AppContext } from '../context'
import { genDomainPrefix, inferPubHandle, atDidToApDid, apDidToAtDid } from './util'
import { Record as ProfileRecord } from '../lexicon/types/app/bsky/actor/profile'

export const pubRoutePrefix = '/activitypub'
export const atRoutePrefix = '/atpub'

export const createRouter = (ctx: AppContext): Router => {
  const router = Router()
  router.use(json())

  type DIDByActorHost = {
    did?: string
    handle?: string
    didFoundBy?: 'given' | 'did' | 'hostname' | 'hostnameAlt'
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
        ret.didFoundBy = actor.startsWith('did:') ? 'did' : 'given'
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

    if (ctx.cfg.service.hostnameAlt && !ret.did) {
      // Test with the alternate hostname, or without if its the same as the given hostname
      const atHandle =
        host === ctx.cfg.service.hostnameAlt
          ? actor
          : `${actor}.${ctx.cfg.service.hostnameAlt}`
      const atUser = await ctx.accountManager.getAccount(atHandle)
      ret.did = atUser?.did
      if (ret.did) {
        ret.didFoundBy = 'hostnameAlt'
        ret.handle = atHandle // prefer the handle we made
      }
    }
    return ret
  }

  router.get('/.well-known/apgateway', async function (req, res) {
    const responseType = 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"'

    return res.type(responseType).json({
      "message": "Hello AP world!"
    })
  })

  router.get('/.well-known/webfinger', async function (req, res) {
    const responseType = 'application/jrd+json; charset=utf-8'

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

    // Get the profile so we can get the avatar
    let profile: ProfileRecord | undefined
    await ctx.actorStore.read(at.did, async (actor) => {
      profile = (await actor.record.getProfileRecord()) as ProfileRecord
    })

    const apDid = atDidToApDid(at.did)

    const newSubject = inferPubHandle(ctx, req.hostname, at.handle, pubActor)
    const domPrefix = genDomainPrefix(ctx, req)
    const xrpcHref = `${domPrefix}/xrpc/org.w3.activitypub.getActor?repo=${at.did}`

    return res.type(responseType).json({
      subject: `acct:${newSubject}`,
      aliases: [
        `at://${at.handle}`,
        `at://${at.did}`,
        `ap://${apDid}`,
        //`${domPrefix}/atpub/@${at.handle}`,
        xrpcHref,
      ],
      links: [
        {
          rel: 'self',
          type: 'application/activity+json',
          href: xrpcHref,
          //href: `${domPrefix}${atRoutePrefix}/${at.did}`,
          //href: `${domPrefix}${pubRoutePrefix}/${pubActor}`,
        },
        profile?.avatar ? {
          rel: 'http://webfinger.net/rel/avatar',
          type: 'image/png',
          href: `https://files.mastodon.social/accounts/avatars/000/023/804/original/media.png`,
        } : undefined,
      ],
    })
  })

  return router
}
