/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../../../lexicons'
import {
  type $Typed,
  is$typed as _is$typed,
  type OmitKey,
} from '../../../../../util'
import type * as OrgW3ActivitystreamsDefs from '../../../w3/activitystreams/defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.w3id.fep.8b32.properties'

export interface Proof {
  $type?: 'org.w3id.fep.8b32.properties#proof'
  '@context'?: OrgW3ActivitystreamsDefs.ContextType
  type?: 'DataIntegrityProof'
  cryptosuite?: 'eddsa-jcs-2022' | (string & {})
  verificationMethod?: string
  proofPurpose?: 'assertionMethod' | 'authentication' | (string & {})
  proofValue?: string
  created?: string
}

const hashProof = 'proof'

export function isProof<V>(v: V) {
  return is$typed(v, id, hashProof)
}

export function validateProof<V>(v: V) {
  return validate<Proof & V>(v, id, hashProof)
}
