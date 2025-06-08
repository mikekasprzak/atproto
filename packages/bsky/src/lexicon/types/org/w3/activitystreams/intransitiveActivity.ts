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
import type * as OrgW3ActivitystreamsProperties from './properties.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.w3.activitystreams.intransitiveActivity'

/** IMPLEMENTS activity (DOES NOT EXTEND object) */
export interface Main {
  $type?: 'org.w3.activitystreams.intransitiveActivity'
  /** JSON-LD terms */
  '@context'?: { [_ in string]: unknown }
  actor?: OrgW3ActivitystreamsProperties.Actor
  object?: OrgW3ActivitystreamsProperties.Object
  target?: OrgW3ActivitystreamsProperties.Target
  result?: OrgW3ActivitystreamsProperties.Result
  origin?: OrgW3ActivitystreamsProperties.Origin
  instrument?: OrgW3ActivitystreamsProperties.Instrument
}

const hashMain = 'main'

export function isMain<V>(v: V) {
  return is$typed(v, id, hashMain)
}

export function validateMain<V>(v: V) {
  return validate<Main & V>(v, id, hashMain)
}
