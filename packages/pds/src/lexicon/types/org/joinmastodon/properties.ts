/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../lexicons'
import { type $Typed, is$typed as _is$typed, type OmitKey } from '../../../util'
import type * as OrgW3ActivitystreamsDefs from '../w3/activitystreams/defs.js'
import type * as OrgW3ActivitystreamsProperties from '../w3/activitystreams/properties.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.joinmastodon.properties'

/** http://joinmastodon.org/ns#attributionDomains; Domain: Actor; Range: ? */
export type AttributionDomains = OrgW3ActivitystreamsDefs.ObjectType
/** http://joinmastodon.org/ns#blurhash; Domain: Image; Range: string */
export type Blurhash = string
/** http://joinmastodon.org/ns#discoverable; Domain: Object; Range: boolean */
export type Discoverable = boolean
/** http://joinmastodon.org/ns#featured; Domain: Actor; Range: Collection [Object] */
export type Featured = OrgW3ActivitystreamsDefs.ObjectType
/** http://joinmastodon.org/ns#featuredTags; Domain: Actor; Range: Collection [HashTag] */
export type FeaturedTags = OrgW3ActivitystreamsDefs.ObjectType
/** http://joinmastodon.org/ns#focalPoint; Domain: Image; Range: [float]; Note: Lexicon does not support floats */
export type FocalPoint = { [_ in string]: unknown }
/** http://joinmastodon.org/ns#indexable; Domain: Object; Range: boolean */
export type Indexable = boolean
/** http://joinmastodon.org/ns#memorial; Domain: Object; Range: boolean */
export type Memorial = boolean
/** http://joinmastodon.org/ns#suspended; Domain: Object; Range: boolean */
export type Suspended = boolean
/** https://docs.joinmastodon.org/spec/activitypub/#PropertyValue; Domain: Object; Range: string */
export type Value = string

/** https://docs.joinmastodon.org/spec/activitypub/#publicKey; https://w3id.org/security#publicKey; Domain: Actor */
export interface PublicKey {
  $type?: 'org.joinmastodon.properties#publicKey'
  id?: OrgW3ActivitystreamsProperties.Id
  owner?: Owner
  publicKeyPem?: PublicKeyPem
}

const hashPublicKey = 'publicKey'

export function isPublicKey<V>(v: V) {
  return is$typed(v, id, hashPublicKey)
}

export function validatePublicKey<V>(v: V) {
  return validate<PublicKey & V>(v, id, hashPublicKey)
}

/** https://docs.joinmastodon.org/spec/activitypub/#publicKey; https://w3id.org/security#owner; Domain: PublicKey; Range: Actor */
export type Owner = OrgW3ActivitystreamsDefs.ObjectType
/** https://docs.joinmastodon.org/spec/activitypub/#publicKey; https://w3id.org/security#publicKeyPem; Domain: PublicKey; Range: string */
export type PublicKeyPem = string
