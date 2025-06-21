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
import type * as OrgW3ActivitypubObject from './object.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.w3.activitypub.putInbox'

export interface QueryParams {
  /** The optional repository the message is for, otherwise this is the shared inbox */
  repo?: string
}

export type InputSchema = OrgW3ActivitypubObject.Main
export type OutputSchema = OrgW3ActivitypubObject.Main

export interface HandlerInput {
  encoding:
    | 'application/activity+json'
    | 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"'
  body: InputSchema
}

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
