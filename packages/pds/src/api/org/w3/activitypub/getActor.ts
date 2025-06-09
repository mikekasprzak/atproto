import { InvalidRequestError } from '@atproto/oauth-provider'
//import { AtUri } from '@atproto/syntax'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
//import { ids } from '../../../../lexicon/lexicons'
//import { pipethrough } from '../../../../pipethrough'
import { Record as ProfileRecord } from '../../../../lexicon/types/app/bsky/actor/profile'
//import { Record as PostRecord } from '../lexicon/types/app/bsky/feed/post'
import { genDomainPrefix, inferPubHandle } from '../../../../activitypub/util'
import { AnyURIArrayObject, AnyURI } from '../../../../lexicon/types/org/w3/activitystreams/defs'
import { Main as ActivityStreamLink } from '../../../../lexicon/types/org/w3/activitystreams/link'

function makeContext(options: {}) {
  return 'https://www.w3.org/ns/activitystreams' as AnyURIArrayObject
}

function makeAPType(value) {
  return value as AnyURIArrayObject
}

export default function (server: Server, ctx: AppContext) {
  server.org.w3.activitypub.getActor({
    //auth: ctx.authVerifier.accessStandard(),
    handler: async ({ params, /*auth,*/ req }) => {
      const { repo } = params

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
        throw new InvalidRequestError(`Unable to fetch profile from repo: ${repo}`)
      }

      const dog: unknown = "dawg"
      console.log(typeof dog)

      const uriPrefix = `${genDomainPrefix(ctx, req)}/xrpc`
      const pubHandle = inferPubHandle(ctx, req.hostname, atUser.handle)

      // NOTES: The @context defines JSON-LD terms. It can be specified by URL (string), or inlined directly in the document (object).
      //   It's common to see Mastodon responses as a string, in an array of strings and objects
      //   ref: https://www.w3.org/TR/json-ld/#the-context


      const apResponse = {
        '@context': makeAPType('https://www.w3.org/ns/activitystreams'),
        type: 'Person',
        id: `${uriPrefix}/org.w3.activitypub.getActor?repo=${did}`,
        atUri: `at://${did}/org.w3.activitypub.actor`,
        inbox: `${uriPrefix}/org.w3.activitypub.putInbox?repo=${did}`,
        outbox: `${uriPrefix}/org.w3.activitypub.getOutbox?repo=${did}`,
        followers: `${uriPrefix}/org.w3.activitypub.getFollowers?repo=${did}`,
        following: `${uriPrefix}/org.w3.activitypub.getFollowing?repo=${did}`,
        //featured: `${uriPrefix}/org.joinmastodon.getFeatured?repo=${did}`,
        preferredUsername: pubHandle.split('@')[0],
        name: profile.displayName,
        summary: profile.description,
        //context: ["dogs" as AnyURI],
        //context: ["http://google.ca"] as AnyURIArrayObject,
        context: makeAPType([
          'hey',
          {
          id: "hoops"
        }]),
        hog: "pigoot"
      }

      return {
        encoding: 'application/activity+json', // 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"',
        body: apResponse,
      }
    },
  })
}
