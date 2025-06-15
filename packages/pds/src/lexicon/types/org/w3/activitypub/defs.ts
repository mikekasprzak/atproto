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
const id = 'org.w3.activitypub.defs'

export interface UrlObjectType {
  $type?: 'org.w3.activitypub.defs#urlObjectType'
  type?: string
  href?: string
  mediaType?: string
}

const hashUrlObjectType = 'urlObjectType'

export function isUrlObjectType<V>(v: V) {
  return is$typed(v, id, hashUrlObjectType)
}

export function validateUrlObjectType<V>(v: V) {
  return validate<UrlObjectType & V>(v, id, hashUrlObjectType)
}
