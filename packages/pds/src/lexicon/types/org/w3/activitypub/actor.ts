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
import type * as String from '../../../string.js'
import type * as Array from '../../../array.js'
import type * as Object from '../../../object.js'
import type * as OrgW3ActivitypubDefs from './defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.w3.activitypub.actor'

export interface Main {
  $type?: 'org.w3.activitypub.actor'
  '@context'?:
    | $Typed<String.Main>
    | $Typed<Array.Main>
    | $Typed<Object.Main>
    | { $type: string }
  _dummy?: string[]
  id?: string
  /** AtProto identifier (not actually necessary) */
  atId?: string
  type?: OrgW3ActivitypubDefs.ActorType
  name?: string
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
  attachments?: string
  endpoints?: string[]
  icon?: string
  image?: string
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
  id?: string
  owner?: string
  publicKeyPem?: string
}

const hashPublicKey = 'publicKey'

export function isPublicKey<V>(v: V) {
  return is$typed(v, id, hashPublicKey)
}

export function validatePublicKey<V>(v: V) {
  return validate<PublicKey & V>(v, id, hashPublicKey)
}
