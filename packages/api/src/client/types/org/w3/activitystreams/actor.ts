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
const id = 'org.w3.activitystreams.actor'

/** IMPLEMENTS object */
export interface Main {
  $type?: 'org.w3.activitystreams.actor'
  '@context'?: OrgW3ActivitystreamsDefs.ContextType
  id?: OrgW3ActivitystreamsProperties.Id
  type: ActorTypes
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
}

const hashMain = 'main'

export function isMain<V>(v: V) {
  return is$typed(v, id, hashMain)
}

export function validateMain<V>(v: V) {
  return validate<Main & V>(v, id, hashMain)
}

export type ActorTypes =
  | 'Application'
  | 'Group'
  | 'Organization'
  | 'Person'
  | 'Service'
  | (string & {})

/** IMPLEMENTS object */
export interface Application {
  $type?: 'org.w3.activitystreams.actor#application'
  '@context'?: OrgW3ActivitystreamsDefs.ContextType
  id?: OrgW3ActivitystreamsProperties.Id
  type: 'Application'
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
}

const hashApplication = 'application'

export function isApplication<V>(v: V) {
  return is$typed(v, id, hashApplication)
}

export function validateApplication<V>(v: V) {
  return validate<Application & V>(v, id, hashApplication)
}

/** IMPLEMENTS object */
export interface Group {
  $type?: 'org.w3.activitystreams.actor#group'
  '@context'?: OrgW3ActivitystreamsDefs.ContextType
  id?: OrgW3ActivitystreamsProperties.Id
  type: 'Group'
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
}

const hashGroup = 'group'

export function isGroup<V>(v: V) {
  return is$typed(v, id, hashGroup)
}

export function validateGroup<V>(v: V) {
  return validate<Group & V>(v, id, hashGroup)
}

/** IMPLEMENTS object */
export interface Organization {
  $type?: 'org.w3.activitystreams.actor#organization'
  '@context'?: OrgW3ActivitystreamsDefs.ContextType
  id?: OrgW3ActivitystreamsProperties.Id
  type: 'Organization'
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
}

const hashOrganization = 'organization'

export function isOrganization<V>(v: V) {
  return is$typed(v, id, hashOrganization)
}

export function validateOrganization<V>(v: V) {
  return validate<Organization & V>(v, id, hashOrganization)
}

/** IMPLEMENTS object */
export interface Person {
  $type?: 'org.w3.activitystreams.actor#person'
  '@context'?: OrgW3ActivitystreamsDefs.ContextType
  id?: OrgW3ActivitystreamsProperties.Id
  type: 'Person'
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
}

const hashPerson = 'person'

export function isPerson<V>(v: V) {
  return is$typed(v, id, hashPerson)
}

export function validatePerson<V>(v: V) {
  return validate<Person & V>(v, id, hashPerson)
}

/** IMPLEMENTS object */
export interface Service {
  $type?: 'org.w3.activitystreams.actor#service'
  '@context'?: OrgW3ActivitystreamsDefs.ContextType
  id?: OrgW3ActivitystreamsProperties.Id
  type: 'Service'
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
}

const hashService = 'service'

export function isService<V>(v: V) {
  return is$typed(v, id, hashService)
}

export function validateService<V>(v: V) {
  return validate<Service & V>(v, id, hashService)
}
