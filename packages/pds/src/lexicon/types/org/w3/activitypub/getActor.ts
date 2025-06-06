/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express'
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../../lexicons'
import {
  type $Typed,
  is$typed as _is$typed,
  type OmitKey,
} from '../../../../util'
import { HandlerAuth, HandlerPipeThrough } from '@atproto/xrpc-server'
import type * as String from '../../../string.js'
import type * as Array from '../../../array.js'
import type * as Object from '../../../object.js'
import type * as OrgW3ActivitypubDefs from './defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.w3.activitypub.getActor'

export interface QueryParams {
  /** The handle or DID of the repo. */
  repo: string
}

export type InputSchema = undefined

export interface OutputSchema {
  '@context':
    | $Typed<String.Main>
    | $Typed<Array.Main>
    | $Typed<Object.Main>
    | { $type: string }
  _dummy?: string[]
  id: string
  atId?: string
  url?: string
  type: OrgW3ActivitypubDefs.ActorTypeTypesType
  name: string
  preferredUsername?: string
  /** HTML encoded profile page */
  summary?: string
  inbox: string
  outbox?: string
  followers?: string
  following?: string
  featured?: string
}

export type HandlerInput = undefined

export interface HandlerSuccess {
  encoding: 'application/activity+json'
  body: OutputSchema
  headers?: { [key: string]: string }
}

export interface HandlerError {
  status: number
  message?: string
}

export type HandlerOutput = HandlerError | HandlerSuccess | HandlerPipeThrough
export type HandlerReqCtx<HA extends HandlerAuth = never> = {
  auth: HA
  params: QueryParams
  input: HandlerInput
  req: express.Request
  res: express.Response
  resetRouteRateLimits: () => Promise<void>
}
export type Handler<HA extends HandlerAuth = never> = (
  ctx: HandlerReqCtx<HA>,
) => Promise<HandlerOutput> | HandlerOutput
