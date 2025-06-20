//import { RepoRecord } from '@atproto/lexicon'
import { InvalidRequestError } from '@atproto/oauth-provider'
import { AppContext } from '@atproto/pds/src/context'
import { Server } from '../../../../lexicon'
import { Record as ProfileRecord } from '../../../../lexicon/types/app/bsky/actor/profile'
//import { Main as apObject } from '../../../../lexicon/types/org/w3/activitypub/object'
import {
  //atUriToTID,
  //genDomainPrefix,
  //inferPubHandle,
  /*makeActivity,
  makeImageURL,*/
  makeLDContext,
  makeObject,
  /*makeNote,*/
} from '../../../../util'

export default function (server: Server, ctx: AppContext) {
  server.org.w3.activitypub.putInbox({
    handler: async ({ params, input, req }) => {
      const { repo } = params

      //console.log('CALL input', input)
      //console.log('CALL params', params)
      req

      // if no repo specified, its the shared inbox

      let did: string | undefined

      if (repo) {
        const atUser = await ctx.accountManager.getAccount(repo)
        if (!atUser) {
          throw new InvalidRequestError(`Could not find repo: ${repo}`)
        } else if (!atUser.handle) {
          throw new InvalidRequestError(
            `Unable to read handle from repo: ${repo}`,
          )
        }
        did = atUser.did

        let profile: ProfileRecord | undefined
        await ctx.actorStore.read(did, async (actor) => {
          profile = (await actor.record.getProfileRecord()) as ProfileRecord
        })
        if (!profile) {
          throw new InvalidRequestError(
            `Unable to fetch profile from repo: ${repo}`,
          )
        }
      }

      //const uriPrefix = `${genDomainPrefix(ctx, req)}/xrpc`
      //const pubHandle = inferPubHandle(ctx, req.hostname, atUser.handle)

      //console.log('CALL did', did)

      const apResponse = {
        type: 'Reject',
        object: makeObject(input.body),
      }

      return {
        encoding: 'application/json', // 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"',
        body: {
          '@context': makeLDContext(apResponse),
          ...apResponse,
        },
      }
    },
  })
}
