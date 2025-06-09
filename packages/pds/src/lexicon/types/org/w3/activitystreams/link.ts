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
import type * as OrgW3ActivitystreamsDefs from './defs.js'
import type * as OrgW3ActivitystreamsProperties from './properties.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.w3.activitystreams.link'

/** IMPLEMENTS link */
export interface Main {
  $type?: 'org.w3.activitystreams.link'
  '@context'?: OrgW3ActivitystreamsDefs.ContextType
  id?: OrgW3ActivitystreamsProperties.Id
  type?: OrgW3ActivitystreamsProperties.TypeLink
  href?: OrgW3ActivitystreamsProperties.Href
  rel?: OrgW3ActivitystreamsProperties.Rel
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

/** IMPLEMENTS link */
export interface Mention {
  $type?: 'org.w3.activitystreams.link#mention'
  '@context'?: OrgW3ActivitystreamsDefs.ContextType
  id?: OrgW3ActivitystreamsProperties.Id
  type: 'Mention'
  href?: OrgW3ActivitystreamsProperties.Href
  rel?: OrgW3ActivitystreamsProperties.Rel
  mediaType?: OrgW3ActivitystreamsProperties.MediaType
  name?: OrgW3ActivitystreamsProperties.Name
  hreflang?: OrgW3ActivitystreamsProperties.Hreflang
  height?: OrgW3ActivitystreamsProperties.Height
  width?: OrgW3ActivitystreamsProperties.Width
  preview?: OrgW3ActivitystreamsProperties.Preview
}

const hashMention = 'mention'

export function isMention<V>(v: V) {
  return is$typed(v, id, hashMention)
}

export function validateMention<V>(v: V) {
  return validate<Mention & V>(v, id, hashMention)
}
