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
const id = 'org.w3.activitypub.object'

export interface Main {
  $type?: 'org.w3.activitypub.object'
  '@context'?: string[]
  id?: string
  /** AtProto identifier (not actually necessary) */
  atId?: string
  type?: 'Note' | (string & {})
  /** HTML encoded profile page */
  summary?: string
  content?: string
  source?: SourceType
}

const hashMain = 'main'

export function isMain<V>(v: V) {
  return is$typed(v, id, hashMain)
}

export function validateMain<V>(v: V) {
  return validate<Main & V>(v, id, hashMain)
}

export interface SourceType {
  $type?: 'org.w3.activitypub.object#sourceType'
  content?: string
  mediaType?: string
}

const hashSourceType = 'sourceType'

export function isSourceType<V>(v: V) {
  return is$typed(v, id, hashSourceType)
}

export function validateSourceType<V>(v: V) {
  return validate<SourceType & V>(v, id, hashSourceType)
}
