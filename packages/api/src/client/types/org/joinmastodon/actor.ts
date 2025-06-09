/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../lexicons'
import { type $Typed, is$typed as _is$typed, type OmitKey } from '../../../util'
import type * as OrgW3ActivitystreamsDefs from '../w3/activitystreams/defs.js'
import type * as OrgW3ActivitystreamsProperties from '../w3/activitystreams/properties.js'
import type * as OrgW3ActivitystreamsActor from '../w3/activitystreams/actor.js'
import type * as OrgW3ActivitypubProperties from '../w3/activitypub/properties.js'
import type * as OrgW3ActivitypubActor from '../w3/activitypub/actor.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.joinmastodon.actor'

/** EXTENDS org.w3.activitypub.actor */
export interface Actor {
  $type?: 'org.joinmastodon.actor#actor'
  '@context'?: OrgW3ActivitystreamsDefs.ContextType
  id: OrgW3ActivitystreamsProperties.Id
  type: OrgW3ActivitystreamsActor.ActorTypes
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
  source?: OrgW3ActivitypubProperties.Source
  inbox: OrgW3ActivitypubActor.Inbox
  outbox: OrgW3ActivitypubActor.Outbox
  following?: OrgW3ActivitypubActor.Following
  followers?: OrgW3ActivitypubActor.Followers
  liked?: OrgW3ActivitypubActor.Liked
  streams?: OrgW3ActivitystreamsDefs.ObjectType
  preferredUsername?: OrgW3ActivitypubActor.PreferredUsername
  endpoints?: OrgW3ActivitypubActor.Endpoints
}

const hashActor = 'actor'

export function isActor<V>(v: V) {
  return is$typed(v, id, hashActor)
}

export function validateActor<V>(v: V) {
  return validate<Actor & V>(v, id, hashActor)
}
