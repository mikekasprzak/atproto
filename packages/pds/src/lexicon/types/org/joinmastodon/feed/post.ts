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
import type * as AppBskyFeedPost from '../../../app/bsky/feed/post.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.joinmastodon.feed.post'

export interface Record {
  $type: 'org.joinmastodon.feed.post'
  text: AppBskyFeedPost.MainRecordText
  facets?: AppBskyFeedPost.MainRecordFacets
  reply?: AppBskyFeedPost.MainRecordReplyRef
  embed?: AppBskyFeedPost.MainRecordEmbed
  langs?: AppBskyFeedPost.MainRecordLangs
  labels?: AppBskyFeedPost.MainRecordLabels
  tags?: AppBskyFeedPost.MainRecordTags
  createdAt: AppBskyFeedPost.MainRecordCreatedAt
  [k: string]: unknown
}

const hashRecord = 'main'

export function isRecord<V>(v: V) {
  return is$typed(v, id, hashRecord)
}

export function validateRecord<V>(v: V) {
  return validate<Record & V>(v, id, hashRecord, true)
}
