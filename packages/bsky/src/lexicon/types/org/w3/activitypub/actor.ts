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

const is$typed = _is$typed,
  validate = _validate
const id = 'org.w3.activitypub.actor'

export interface Main {
  $type?: 'org.w3.activitypub.actor'
  '@context': string[]
  id: string
  /** AtProto identifier (not actually necessary) */
  atId?: string
  type: 'Person' | (string & {})
  name: string
  preferredUsername?: string
  /** HTML encoded profile page */
  summary?: string
  inbox?: string
  outbox?: string
  followers?: string
  following?: string
  featured?: string
  publicKey?: PublicKey
  tag?: string[]
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
