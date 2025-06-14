import { RepoRecord } from '@atproto/lexicon'
import { InvalidRequestError } from '@atproto/oauth-provider'
//import { AtUri } from '@atproto/syntax'
import {
  atUriToTID,
  genDomainPrefix,
  inferPubHandle,
  /*makeActivity,
  makeImageURL,*/
  makeLDContext,
  /*makeNote,
  makeObject,*/
} from '../../../../activitypub/util'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import { ids } from '../../../../lexicon/lexicons'
//import { pipethrough } from '../../../../pipethrough'
import { Record as ProfileRecord } from '../../../../lexicon/types/app/bsky/actor/profile'
import { Record as FeedPostRecord } from '../../../../lexicon/types/app/bsky/feed/post'

/*
export default function (server: Server, ctx: AppContext) {
  server.org.w3.activitypub.getResource({
    //auth: ctx.authVerifier.accessStandard(),
    handler: async ({ params, req }) => {
      const { repo, page } = params

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

      const uriPrefix = `${genDomainPrefix(ctx, req)}/xrpc`
      const pubHandle = inferPubHandle(ctx, req.hostname, atUser.handle)

      let apResponse = {}



      // Get posts belonging to the user
      let postRecord: {
        uri: string
        cid: string
        value: RepoRecord
      }[] = []
      await ctx.actorStore.read(did, async (actor) => {
        postRecord = await actor.record.listRecordsForCollection({
          collection: ids.AppBskyFeedPost,
          limit: 10,
          reverse: false,
        })
      })



      return {
        encoding: 'application/activity+json', // 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"',
        body: {
          $type:
            apResponse === 'OrderedCollection'
              ? 'org.w3.activitystreams.orderedCollection'
              : 'org.w3.activitystreams.orderedCollectionPage',
          '@context': makeLDContext(apResponse),
          ...apResponse,
        },
      }
    }
  })
}
*/
