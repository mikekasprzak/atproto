import { InvalidRequestError } from '@atproto/oauth-provider'
import { AppContext } from '@atproto/pds/src/context'
import { Server } from '../../../../lexicon'
import { Record as ProfileRecord } from '../../../../lexicon/types/app/bsky/actor/profile'
import {
  atDidToApDid,
  genDomainPrefix,
  inferPubHandle,
  makeImageURL,
  makeLDContext,
  makeObject,
} from '../../../../util'

export default function (server: Server, ctx: AppContext) {
  server.org.w3.activitypub.getActor({
    //auth: ctx.authVerifier.accessStandard(),
    handler: async ({ params, /*auth,*/ req }) => {
      const { repo } = params

      const atUser = await ctx.accountManager.getAccount(repo)
      if (!atUser) {
        throw new InvalidRequestError(`Could not find repo: ${repo}`)
      } else if (!atUser.handle) {
        throw new InvalidRequestError(
          `Unable to read handle from repo: ${repo}`,
        )
      }
      const did = atUser.did

      let profile: ProfileRecord | undefined
      await ctx.actorStore.read(did, async (actor) => {
        profile = (await actor.record.getProfileRecord()) as ProfileRecord
      })
      if (!profile) {
        throw new InvalidRequestError(
          `Unable to fetch profile from repo: ${repo}`,
        )
      }

      const domainPrefix = genDomainPrefix(ctx, req)
      const xrpcPrefix = `${domainPrefix}/xrpc/org.w3.activitypub.`
      const xrpcSuffix = `?repo=${did}`
      const apPrefix = `ap://${atDidToApDid(did)}/`
      const apSuffix = ''
      const uriPrefix = req.query.fep ? apPrefix : xrpcPrefix
      const uriSuffix = req.query.fep ? apSuffix : xrpcSuffix
      const pubHandle = inferPubHandle(ctx, req.hostname, atUser.handle)

      const apResponse = {
        type: 'Person',
        id: `${uriPrefix}getActor${uriSuffix}`,
        //atUri: `at://${did}/org.w3.activitypub.actor`,
        inbox: `${uriPrefix}putInbox${uriSuffix}`,
        outbox: `${uriPrefix}getOutbox${uriSuffix}`,
        //followers: `${uriPrefix}/org.w3.activitypub.getFollowers?repo=${did}`,
        //following: `${uriPrefix}/org.w3.activitypub.getFollowing?repo=${did}`,
        preferredUsername: pubHandle.split('@')[0],
        name: profile.displayName,
        summary: profile.description,
        icon: profile.avatar
          ? makeObject({
              type: 'Image',
              mediaType: profile.avatar.mimeType,
              url: makeImageURL(
                'avatar',
                did,
                profile.avatar.ref.toString(),
                profile.avatar.mimeType,
              ),
            })
          : undefined,
        image: profile.banner
          ? makeObject({
              type: 'Image',
              mediaType: profile.banner.mimeType,
              url: makeImageURL(
                'banner',
                did,
                profile.banner.ref.toString(),
                profile.banner.mimeType,
              ),
            })
          : undefined,
      }

      if (req.query.fep) {
        ;(apResponse as any).gateways = [domainPrefix]
      }

      return {
        encoding: 'application/activity+json', // 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"',
        body: {
          '@context': makeLDContext(apResponse),
          ...apResponse,
        },
      }
    },
  })
}
