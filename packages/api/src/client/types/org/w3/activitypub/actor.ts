/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../../lexicons'
import {
  type $Typed,
  is$typed as _is$typed,
  type OmitKey,
} from '../../../../util'
import type * as OrgW3ActivitystreamsProperties from '../activitystreams/properties.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.w3.activitypub.actor'

export interface Main {
  $type?: 'org.w3.activitypub.actor'
  /** ActivtyStreams terms dictionary. This isn't to spec. This type needs to be 'string | array | object' */
  '@context'?: (
    | 'https://www.w3.org/ns/activitystreams'
    | 'https://w3id.org/security/v1'
    | (string & {})
  )[]
  id: string
  /** AtProto identifier URI (not actually necessary) */
  atUri?: string
  type:
    | 'Application'
    | 'Group'
    | 'Organization'
    | 'Person'
    | 'Service'
    | (string & {})
  inbox?: string
  outbox?: string
  followers?: string
  following?: string
  featured?: string
  featuredTags?: string
  preferredUsername: string
  name?: OrgW3ActivitystreamsProperties.Name
  /** HTML encoded profile page */
  summary?: string
  url?: string
  published?: string
  manuallyApprovesFollowers?: boolean
  discoverable?: boolean
  indexable?: boolean
  memorial?: boolean
  context: OrgW3ActivitystreamsProperties.Context
  publicKey?: PublicKey
  tag?: Tag[]
  attachments?: string[]
  endpoints?: Endpoints
  icon?: MediaUrl
  image?: MediaUrl
}

const hashMain = 'main'

export function isMain<V>(v: V) {
  return is$typed(v, id, hashMain)
}

export function validateMain<V>(v: V) {
  return validate<Main & V>(v, id, hashMain)
}

export interface PublicKey {
  $type?: 'org.w3.activitypub.actor#publicKey'
  id: string
  owner: string
  publicKeyPem: string
}

const hashPublicKey = 'publicKey'

export function isPublicKey<V>(v: V) {
  return is$typed(v, id, hashPublicKey)
}

export function validatePublicKey<V>(v: V) {
  return validate<PublicKey & V>(v, id, hashPublicKey)
}

export type Tag = string
export type Attachment = string

export interface Endpoints {
  $type?: 'org.w3.activitypub.actor#endpoints'
  sharedInbox?: string
}

const hashEndpoints = 'endpoints'

export function isEndpoints<V>(v: V) {
  return is$typed(v, id, hashEndpoints)
}

export function validateEndpoints<V>(v: V) {
  return validate<Endpoints & V>(v, id, hashEndpoints)
}

/** I'm not sure this is to spec. I believe the type needs to be 'string | object', where 'string' is the url */
export interface MediaUrl {
  $type?: 'org.w3.activitypub.actor#mediaUrl'
  type: 'Image' | (string & {})
  mediaType:
    | 'image/gif'
    | 'image/jpeg'
    | 'image/png'
    | 'image/svg+xml'
    | 'image/webp'
    | (string & {})
  url: string
}

const hashMediaUrl = 'mediaUrl'

export function isMediaUrl<V>(v: V) {
  return is$typed(v, id, hashMediaUrl)
}

export function validateMediaUrl<V>(v: V) {
  return validate<MediaUrl & V>(v, id, hashMediaUrl)
}
