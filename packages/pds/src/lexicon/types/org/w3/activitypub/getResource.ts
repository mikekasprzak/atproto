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
import type * as OrgW3ActivitystreamsObject from '../activitystreams/object.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.w3.activitypub.getResource'

export interface QueryParams {
  /** The handle or DID of the repo. */
  repo: string
  /** The resource to fetch. */
  id: string
  /** The namespace-id of the resource to fetch. */
  nsid: string
}

export type InputSchema = undefined
export type OutputSchema = OrgW3ActivitystreamsObject.Main
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
