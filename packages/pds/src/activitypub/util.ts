import { AppContext } from '../context'
import {
  ContextType,
  ObjectType,
} from '../lexicon/types/org/w3/activitystreams/defs'
import { Multidid } from '@didtools/multidid'

export const genDomainPrefix = (ctx, req) =>
  `${req.protocol}://${req.hostname}${ctx.cfg.service.devMode && ctx.cfg.service.port ? ':' + ctx.cfg.service.port : ''}`

export const inferPubHandle = (
  ctx: AppContext,
  hostname: string,
  handle: string,
  actor?: string,
) =>
  actor && !actor.startsWith('did:')
    ? `${actor}@${handle.substring(actor.length + 1)}`
    : handle !== ctx.cfg.service.hostname &&
        handle.endsWith(ctx.cfg.service.hostname)
      ? `${handle.substring(0, handle.length - ctx.cfg.service.hostname.length - 1)}@${ctx.cfg.service.hostname}`
      : ctx.cfg.service.hostnameAlt &&
          handle !== ctx.cfg.service.hostnameAlt &&
          handle.endsWith(ctx.cfg.service.hostnameAlt)
        ? `${handle.substring(0, handle.length - ctx.cfg.service.hostnameAlt.length - 1)}@${ctx.cfg.service.hostnameAlt}`
        : handle !== hostname && handle.endsWith(hostname)
          ? `${handle.substring(0, handle.length - hostname.length - 1)}@${hostname}`
          : `${handle}@${hostname}`

const defaultImagePrefix = 'https://cdn.bsky.app/img'
type BskyImageTypes = 'banner' | 'avatar'
const bskyImageTypePrefixs: Record<BskyImageTypes, string> = {
  avatar: 'avatar_thumbail/plain',
  banner: 'banner/plain',
}
// TODO: This should make URLs that fetch from the PDS.
//       Those URLs should look like images to any CDN's wrapping the PDS (i.e. blob-ab16d8u7etc.jpeg).
//       WebP is not our responsibility.
export const makeImageURL = function (
  type: BskyImageTypes,
  did: string,
  blobId: string,
  mimeType: string,
) {
  return `${defaultImagePrefix}/${bskyImageTypePrefixs[type]}/${did}/${blobId}@${mimeType.split['/'][1]}`
}

/** Used to generate the JSON-LD `@context` section of an ActivityPub object or link */
export function makeLDContext(obj: any) {
  const asNamespace = 'https://www.w3.org/ns/activitystreams'
  const secNamespace = 'https://w3id.org/security/v1'
  const atNamespace = 'https://atproto.com/specs/#' // Dummy
  const mastodonNamespace = 'http://joinmastodon.org/ns#'
  const fepEF61Namespace = "https://w3id.org/fep/ef61"
  //const schemaNamespace = "http://schema.org#" // Incorrect version (used by Mastodon)
  //const schemaNamespace = "https://schema.org/" // Correction version

  const namespaces: (string | unknown)[] = [asNamespace]
  const dictionary: {
    //as?: string,
    Hashtag?: string
    manuallyApprovesFollowers?: string
    movedTo?: string
    sensitive?: string

    //sec?: string,
    publicKey?: string
    publicKeyPem?: string
    owner?: string
    signature?: string
    signatureValue?: string

    toot?: string
    Emoji?: string
    attributionDomain?: string
    blurhash?: string
    discoverable?: string
    featured?: string
    featuredTags?: string
    focalPoint?: string
    indexable?: string
    memorial?: string
    suspended?: string
    votersCount?: string

    schema?: string
    PropertyValue?: string
    value?: string

    atproto?: string
    atUri?: string
  } = {}

  if ('manuallyApprovesFollowers' in obj) {
    dictionary.manuallyApprovesFollowers = 'as:manuallyApprovesFollowers'
  }
  if ('sensitive' in obj) {
    dictionary.sensitive = 'as:sensitive'
  }

  let secUsed = false
  if ('publicKey' in obj) {
    secUsed = true
    dictionary.publicKey = 'sec:publicKey'
    dictionary.owner = 'sec:owner'
    dictionary.publicKeyPem = 'sec:publicKeyPem'
  }

  let fepEF61Used = obj.id.startsWith('ap://') || ('gateways' in obj) || ('proof' in obj)

  if ('discoverable' in obj) {
    dictionary.toot = mastodonNamespace
    dictionary.discoverable = 'toot:discoverable'
  }
  if ('featured' in obj) {
    dictionary.toot = mastodonNamespace
    dictionary.featured = 'toot:featured'
  }
  if ('featuredTags' in obj) {
    dictionary.toot = mastodonNamespace
    dictionary.featuredTags = 'toot:featuredTags'
  }
  if ('indexable' in obj) {
    dictionary.toot = mastodonNamespace
    dictionary.indexable = 'toot:indexable'
  }
  if ('memorial' in obj) {
    dictionary.toot = mastodonNamespace
    dictionary.memorial = 'toot:memorial'
  }
  if ('discoverable' in obj) {
    dictionary.toot = mastodonNamespace
    dictionary.memorial = 'toot:discoverable'
  }
  if ('suspended' in obj) {
    dictionary.toot = mastodonNamespace
    dictionary.suspended = 'toot:suspended'
  }

  if ('atUri' in obj) {
    dictionary.atproto = atNamespace
    dictionary.atUri = 'atproto:atUri'
  }

  if (secUsed) {
    namespaces.push(secNamespace)
  }
  if (fepEF61Used) {
    namespaces.push(fepEF61Namespace)
  }

  if (Object.entries(dictionary).length) {
    namespaces.push(dictionary)
  }

  return (namespaces.length > 1 ? namespaces : asNamespace) as ContextType
}

export function makeObject(value) {
  return value as ObjectType
}

export const atUriToParts = function (uri: string) {
  if (!uri.startsWith('at://')) {
    return undefined
  }
  const withoutAt = uri.substring('at://'.length)
  const [did, type, revision] = withoutAt.split('/')
  return { did, type, tid: revision }
}

export const atUriToTID = function (uri: string) {
  return atUriToParts(uri)?.tid
}

export const makeActivity = function (
  type: string, // Pick<ActivityPubActivity, 'type'>['type'],
  options: {
    uriHandle: string
    postId: string
    published: string
    id?: string
    cid?: string
  },
  object: object,
) {
  const statusUri = `${options.uriHandle}/status/${options.postId}`
  const baseId = options.id ?? statusUri

  return {
    type: type,
    id: `${baseId}/activity`,
    url: `${statusUri}/activity`,
    cid: options.cid,
    actor: options.uriHandle,
    published: options.published,
    to: ['https://www.w3.org/ns/activitystreams#Public'],
    cc: [`${options.uriHandle}/followers`], // public
    object,
  }
}

export const makeNote = function (
  options: {
    uriHandle: string
    postId: string
    published: string
    id?: string
    cid?: string
  },
  content: string,
) {
  const totalLikes = 0
  const totalShares = 0

  const statusUri = `${options.uriHandle}/status/${options.postId}`
  const baseId = options.id ?? statusUri

  return {
    type: 'Note',
    id: baseId,
    url: statusUri,
    cid: options.cid,
    summary: null,
    inReplyTo: null,
    published: options.published,
    attributedTo: options.uriHandle,
    to: ['https://www.w3.org/ns/activitystreams#Public'],
    cc: [`${options.uriHandle}/followers`], // public
    sensitive: false,
    content: content,
    contentMap: {
      en: content,
    },
    attachment: [],
    tag: [],
    replies: {
      id: `${baseId}/replies`,
      url: `${statusUri}/replies`,
      type: 'Collection',
      first: {
        type: 'CollectionPage',
        next: `${options.uriHandle}/status/${options.postId}/replies?page=true`,
        partOf: `${options.uriHandle}/status/${options.postId}/replies`,
        items: [],
      },
    },
    likes: {
      id: `${baseId}/likes`,
      url: `${statusUri}/likes`,
      type: 'Collection',
      totalItems: totalLikes,
    },
    shares: {
      id: `${baseId}/shares`,
      url: `${statusUri}/shares`,
      type: 'Collection',
      totalItems: totalShares,
    },
  }
}


  // FEP EF61 only supports did:key's (i.e. MUST). They recommend ids use Ed25519 encoded public keys in the Multikey format (i.e. SHOULD).
  // I've decided to use the native atproto type (did:plc, did:web) re-encoded as a did:key in MultiDID format instead. Our endpoints will
  // convert ap://did:key's back into atproto at://did's.

  export const atDidToApDid = (did: string) => {
    //return `did:key:${base58btc.encode(new TextEncoder().encode(Multidid.fromString(atDid).toString()))}`
    return `did:key:z${Multidid.fromString(did).toMultibase('base58btc').toString()}`
  }

  export const apDidToAtDid = (did: string) => {
    return Multidid.fromString(did.substring('did:key:z'.length)).toMultibase('base58btc').toString()
  }
