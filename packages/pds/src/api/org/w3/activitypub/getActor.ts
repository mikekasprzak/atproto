import { InvalidRequestError } from '@atproto/oauth-provider'
//import { AtUri } from '@atproto/syntax'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
//import { ids } from '../../../../lexicon/lexicons'
//import { pipethrough } from '../../../../pipethrough'

export default function (server: Server, ctx: AppContext) {
  const { bskyAppView } = ctx
  if (!bskyAppView) return

  server.org.w3.activitypub.getActor({
    //auth: ctx.authVerifier.accessStandard(),
    handler: async ({ params /*, auth /*req*/ }) => {
      const { repo } = params

      const did = await ctx.accountManager.getDidForActor(repo)
      if (!did) {
        throw new InvalidRequestError(`Could not find repo: ${repo}`)
      }

      //const requester = auth.credentials.did
      /*
      const feedUrl = new AtUri(params.feed)
      const { data } = await bskyAppView.agent.com.atproto.repo.getRecord({
        repo: feedUrl.hostname,
        collection: feedUrl.collection,
        rkey: feedUrl.rkey,
      })
      const feedDid = data.value['did']
      if (typeof feedDid !== 'string') {
        throw new InvalidRequestError(
          'could not resolve feed did',
          'UnknownFeed',
        )
      }*/

      return {
        encoding: 'application/json',
        body: {
          '@context': ['https://www.w3.org/ns/activitystreams'],
          id: `${did}`,
          type: 'Person',
        },
      }
    },
  })
}
