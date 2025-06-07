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

const is$typed = _is$typed,
  validate = _validate
const id = 'org.w3.activitystreams.defs'

export interface Main {
  $type?: 'org.w3.activitystreams.defs'
  type?:
    | $Typed<AnyURI>
    | $Typed<ArrayOfAnyURIObject>
    | $Typed<Object>
    | { $type: string }
}

const hashMain = 'main'

export function isMain<V>(v: V) {
  return is$typed(v, id, hashMain)
}

export function validateMain<V>(v: V) {
  return validate<Main & V>(v, id, hashMain)
}

/** xsd:string | rdf:langString */
export type String = string
/** xsd:anyURI */
export type AnyURI = string
/** xsd:boolean */
export type Boolean = boolean
/** xsd:integer */
export type Integer = number
/** xsd:nonNegativeInteger */
export type NonNegativeInteger = number
/** xsd:integer; Note: Lexicon doesn't support floats */
export type Float = string
/** xsd:float [>= 0.0f]; Note: Lexicon doesn't support floats */
export type NonNegativeFloat = string
/** xsd:dateTime */
export type DateTime = string
/** xsd:duration */
export type Duration = string
export type Object = { [_ in string]: unknown }
export type ArrayOfString = String[]
export type ArrayOfStringObject = (
  | $Typed<String>
  | $Typed<Object>
  | { $type: string }
)[]
export type ArrayOfAnyURIObject = (
  | $Typed<AnyURI>
  | $Typed<Object>
  | { $type: string }
)[]
