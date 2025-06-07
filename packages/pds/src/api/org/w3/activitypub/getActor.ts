import { InvalidRequestError } from '@atproto/oauth-provider'
//import { AtUri } from '@atproto/syntax'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
//import { ids } from '../../../../lexicon/lexicons'
//import { pipethrough } from '../../../../pipethrough'
import { Record as ProfileRecord } from '../../../../lexicon/types/app/bsky/actor/profile'
//import { Record as PostRecord } from '../lexicon/types/app/bsky/feed/post'
import { genDomainPrefix, inferPubHandle } from '../../../../activitypub/util'

export default function (server: Server, ctx: AppContext) {
  server.org.w3.activitypub.getActor({
    //auth: ctx.authVerifier.accessStandard(),
    handler: async ({ params, /*auth,*/ req }) => {
      const { repo } = params

      //const did = await ctx.accountManager.getDidForActor(repo)
      const atUser = await ctx.accountManager.getAccount(repo)
      if (!atUser) {
        throw new InvalidRequestError(`Could not find repo: ${repo}`)
      }
      else if (!atUser.handle) {
        throw new InvalidRequestError(`Unable to read handle from repo: ${repo}`)
      }
      const did = atUser.did

      let profile: ProfileRecord | undefined
      await ctx.actorStore.read(did, async (actor) => {
        profile = (await actor.record.getProfileRecord()) as ProfileRecord
      })
      if (!profile) {
        throw new InvalidRequestError(`Unable to fetch profile for: ${repo}`)
      }

      const uriPrefix = `${genDomainPrefix(ctx, req)}/xrpc`
      const pubHandle = inferPubHandle(ctx, req.hostname, atUser.handle)
      //`http://${ctx.cfg.service.hostname}/xrpc`

      return {
        encoding: 'application/activity+json',
        body: {
          '@context': ['https://www.w3.org/ns/activitystreams'],
          id: `${uriPrefix}/org.w3.activitypub.getActor?repo=${did}`,
          atId: `at://${did}/org.w3.activitypub.actor`,
          type: 'Person',
          name: pubHandle.split('@')[0],
          preferredUsername: profile.displayName,
          summary: profile.description,
          inbox: `${uriPrefix}/org.w3.activitypub.putInbox?repo=${did}`,
          outbox: `${uriPrefix}/org.w3.activitypub.getOutbox?repo=${did}`,
          followers: `${uriPrefix}/org.w3.activitypub.getFollowers?repo=${did}`,
          following: `${uriPrefix}/org.w3.activitypub.getFollowing?repo=${did}`,
          //featured: `${uriPrefix}/org.joinmastodon.getFeatured?repo=${did}`,
        },
      }
    },
  })
}
