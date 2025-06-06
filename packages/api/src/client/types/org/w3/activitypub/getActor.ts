/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc'
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
const id = 'org.w3.activitypub.getActor'

export interface QueryParams {
  /** The handle or DID of the repo. */
  repo: string
}

export type InputSchema = undefined

export interface OutputSchema {
  '@context'?: string[]
  id: string
  url?: string
  type: 'Person' | (string & {})
  name?: string
  preferredUsername?: string
  /** HTML encoded profile page */
  summary?: string
  inbox?: string
  outbox?: string
  followers?: string
  following?: string
  featured?: string
}

export interface CallOptions {
  signal?: AbortSignal
  headers?: HeadersMap
}

export interface Response {
  success: boolean
  headers: HeadersMap
  data: OutputSchema
}

export function toKnownErr(e: any) {
  return e
}
