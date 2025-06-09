import { InvalidRequestError } from '@atproto/oauth-provider'
//import { AtUri } from '@atproto/syntax'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
//import { ids } from '../../../../lexicon/lexicons'
//import { pipethrough } from '../../../../pipethrough'
import { Record as ProfileRecord } from '../../../../lexicon/types/app/bsky/actor/profile'
import { genDomainPrefix, inferPubHandle } from '../../../../activitypub/util'
import { ContextType, ObjectType } from '../../../../lexicon/types/org/w3/activitystreams/defs'

/** Used to generate the JSON-LD `@context` section of an ActivityPub object or link */
function makeLDContext(obj: any) {
  const asNamespace = 'https://www.w3.org/ns/activitystreams'
  const secNamespace = "https://w3id.org/security/v1"
  const atNamespace = "https://atproto.com/specs/#"   // Dummy
  const mastodonNamespace = "http://joinmastodon.org/ns#"
  //const schemaNamespace = "http://schema.org#" // Incorrect version (used by Mastodon)
  //const schemaNamespace = "https://schema.org/" // Correction version

  let namespaces: (string | unknown)[] = [asNamespace]
  let dictionary: {
    //as?: string,
    Hashtag?: string,
    manuallyApprovesFollowers?: string,
    movedTo?: string,
    sensitive?: string,

    //sec?: string,
    publicKey?: string,
    publicKeyPem?: string,
    owner?: string,
    signature?: string,
    signatureValue?: string,

    toot?: string,
    Emoji?: string,
    attributionDomain?: string,
    blurhash?: string,
    discoverable?: string,
    featured?: string,
    featuredTags?: string,
    focalPoint?: string,
    indexable?: string,
    memorial?: string,
    suspended?: string,
    votersCount?: string,

    schema?: string,
    PropertyValue?: string,
    value?: string,

    atproto?: string,
    atUri?: string
  } = {}

  if ("manuallyApprovesFollowers" in obj) {
    dictionary.manuallyApprovesFollowers = "as:manuallyApprovesFollowers"
  }
  if ("sensitive" in obj) {
    dictionary.sensitive = "as:sensitive"
  }

  let secUsed = false
  if ("publicKey" in obj) {
    secUsed = true
    dictionary.publicKey = "sec:publicKey"
    dictionary.owner = "sec:owner"
    dictionary.publicKeyPem = "sec:publicKeyPem"
  }

  if ("discoverable" in obj) {
    dictionary.toot = mastodonNamespace
    dictionary.discoverable = "toot:discoverable"
  }
  if ("featured" in obj) {
    dictionary.toot = mastodonNamespace
    dictionary.featured = "toot:featured"
  }
  if ("featuredTags" in obj) {
    dictionary.toot = mastodonNamespace
    dictionary.featuredTags = "toot:featuredTags"
  }
  if ("indexable" in obj) {
    dictionary.toot = mastodonNamespace
    dictionary.indexable = "toot:indexable"
  }
  if ("memorial" in obj) {
    dictionary.toot = mastodonNamespace
    dictionary.memorial = "toot:memorial"
  }
  if ("discoverable" in obj) {
    dictionary.toot = mastodonNamespace
    dictionary.memorial = "toot:discoverable"
  }
  if ("suspended" in obj) {
    dictionary.toot = mastodonNamespace
    dictionary.suspended = "toot:suspended"
  }

  if ("atUri" in obj) {
    dictionary.atproto = atNamespace
    dictionary.atUri = "atproto:atUri"
  }


  if (secUsed) {
    namespaces.push(secNamespace)
  }

  if (Object.entries(dictionary).length) {
    namespaces.push(dictionary)
  }

  return ((namespaces.length > 1) ? namespaces : asNamespace) as ContextType
}

function makeAPType(value) {
  return value as ObjectType
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

      const uriPrefix = `${genDomainPrefix(ctx, req)}/xrpc`
      const pubHandle = inferPubHandle(ctx, req.hostname, atUser.handle)

      const apResponse = {
        type: 'Person',
        id: `${uriPrefix}/org.w3.activitypub.getActor?repo=${did}`,
        atUri: `at://${did}/org.w3.activitypub.actor`,
        inbox: `${uriPrefix}/org.w3.activitypub.putInbox?repo=${did}`,
        outbox: `${uriPrefix}/org.w3.activitypub.getOutbox?repo=${did}`,
        //followers: `${uriPrefix}/org.w3.activitypub.getFollowers?repo=${did}`,
        //following: `${uriPrefix}/org.w3.activitypub.getFollowing?repo=${did}`,
        preferredUsername: pubHandle.split('@')[0],
        name: profile.displayName,
        summary: profile.description,
      }

      return {
        encoding: 'application/activity+json', // 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"',
        body: {
          '@context': makeLDContext(apResponse),
          ...apResponse
        }
      }
    },
  })
}
