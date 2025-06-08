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

export type AnyURIArrayObject =
  | $Typed<AnyURI>
  | $Typed<ArrayOfAnyURIObject>
  | $Typed<Object>
/** xsd:string | rdf:langString */
export type String = string
/** xsd:anyURI */
export type AnyURI = string
/** [BCP47] Language Tag */
export type Language = string
/** xsd:boolean */
export type Boolean = boolean
/** xsd:integer */
export type Integer = number
/** xsd:nonNegativeInteger */
export type NonNegativeInteger = number
/** xsd:float; Note: Lexicon doesn't support float */
export type Float = string
/** xsd:float [>= 0.0f]; Note: Lexicon doesn't support float */
export type NonNegativeFloat = string
/** xsd:dateTime */
export type DateTime = string
/** xsd:duration; TODO: this */
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
