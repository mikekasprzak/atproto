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
import type * as OrgW3ActivitystreamsDefs from './defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.w3.activitystreams.link'

export interface Main {
  $type?: 'org.w3.activitystreams.link'
  /** JSON-LD terms */
  '@context'?: { [_ in string]: unknown }
  id?: string
  href?: OrgW3ActivitystreamsProperties.Href
  ref?: OrgW3ActivitystreamsProperties.Ref
  mediaType?: OrgW3ActivitystreamsProperties.MediaType
  name?: OrgW3ActivitystreamsProperties.Name
  hreflang?: OrgW3ActivitystreamsProperties.Hreflang
  height?: OrgW3ActivitystreamsProperties.Height
  width?: OrgW3ActivitystreamsProperties.Width
  preview?: OrgW3ActivitystreamsProperties.Preview
}

const hashMain = 'main'

export function isMain<V>(v: V) {
  return is$typed(v, id, hashMain)
}

export function validateMain<V>(v: V) {
  return validate<Main & V>(v, id, hashMain)
}

export interface Preview2 {
  $type?: 'org.w3.activitystreams.link#preview2'
  main?: OrgW3ActivitystreamsDefs.Object
}

const hashPreview2 = 'preview2'

export function isPreview2<V>(v: V) {
  return is$typed(v, id, hashPreview2)
}

export function validatePreview2<V>(v: V) {
  return validate<Preview2 & V>(v, id, hashPreview2)
}
