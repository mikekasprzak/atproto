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
const id = 'org.w3.activitystreams.orderedCollection'

/** EXTENDS collection */
export interface Main {
  $type?: 'org.w3.activitystreams.orderedCollection'
  '@context'?: OrgW3ActivitystreamsDefs.ContextType
  id?: OrgW3ActivitystreamsProperties.Id
  type?: 'OrderedCollection'
  attachment?: OrgW3ActivitystreamsProperties.Attachment
  attributedTo?: OrgW3ActivitystreamsProperties.AttributedTo
  audience?: OrgW3ActivitystreamsProperties.Audience
  content?: OrgW3ActivitystreamsProperties.Content
  context?: OrgW3ActivitystreamsProperties.Context
  name?: OrgW3ActivitystreamsProperties.Name
  endTime?: OrgW3ActivitystreamsProperties.EndTime
  generator?: OrgW3ActivitystreamsProperties.Generator
  icon?: OrgW3ActivitystreamsProperties.Icon
  image?: OrgW3ActivitystreamsProperties.Image
  inReplyTo?: OrgW3ActivitystreamsProperties.InReplyTo
  location?: OrgW3ActivitystreamsProperties.Location
  preview?: OrgW3ActivitystreamsProperties.Preview
  published?: OrgW3ActivitystreamsProperties.Published
  replies?: OrgW3ActivitystreamsProperties.Replies
  startTime?: OrgW3ActivitystreamsProperties.StartTime
  summary?: OrgW3ActivitystreamsProperties.Summary
  tag?: OrgW3ActivitystreamsProperties.Tag
  updated?: OrgW3ActivitystreamsProperties.Updated
  url?: OrgW3ActivitystreamsProperties.Url
  to?: OrgW3ActivitystreamsProperties.To
  bto?: OrgW3ActivitystreamsProperties.Bto
  cc?: OrgW3ActivitystreamsProperties.Cc
  bcc?: OrgW3ActivitystreamsProperties.Bcc
  mediaType?: OrgW3ActivitystreamsProperties.MediaType
  duration?: OrgW3ActivitystreamsProperties.Duration
  totalItems?: OrgW3ActivitystreamsProperties.TotalItems
  current?: OrgW3ActivitystreamsProperties.Current
  first?: OrgW3ActivitystreamsProperties.First
  last?: OrgW3ActivitystreamsProperties.Last
  items?: OrgW3ActivitystreamsProperties.Items
}

const hashMain = 'main'

export function isMain<V>(v: V) {
  return is$typed(v, id, hashMain)
}

export function validateMain<V>(v: V) {
  return validate<Main & V>(v, id, hashMain)
}
