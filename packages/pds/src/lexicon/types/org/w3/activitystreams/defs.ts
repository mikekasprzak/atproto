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

/** JSON-LD terms */
export type ContextType = IdOrArrayOfAndObject
/** Standard type that accepts an ActivityStreams Object/Link by id, object, or as an array */
export type ObjectType = IdOrArrayOfAndObject
/** xsd:string | rdf:langString */
export type String = string
/** xsd:anyURI */
export type AnyURI = string
/** xsd:anyURI */
export type Id = string
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

export interface IdObject {
  $type?: 'org.w3.activitystreams.defs#idObject'
  id: Id
}

const hashIdObject = 'idObject'

export function isIdObject<V>(v: V) {
  return is$typed(v, id, hashIdObject)
}

export function validateIdObject<V>(v: V) {
  return validate<IdObject & V>(v, id, hashIdObject)
}

export interface IdTypeObject {
  $type?: 'org.w3.activitystreams.defs#idTypeObject'
  id: Id
  type: String
}

const hashIdTypeObject = 'idTypeObject'

export function isIdTypeObject<V>(v: V) {
  return is$typed(v, id, hashIdTypeObject)
}

export function validateIdTypeObject<V>(v: V) {
  return validate<IdTypeObject & V>(v, id, hashIdTypeObject)
}

export type Array = { [_ in string]: unknown }[]
export type ArrayOfObject = Object[]
export type ArrayOfString = String[]
export type ArrayOfAnyURI = AnyURI[]
export type ArrayOfId = Id[]
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
export type ArrayOfIdObject = (
  | $Typed<Id>
  | $Typed<Object>
  | { $type: string }
)[]
export type ArrayOfStringArrayObject = (
  | $Typed<String>
  | $Typed<ArrayOfStringArrayObject>
  | $Typed<Object>
  | { $type: string }
)[]
export type ArrayOfAnyURIArrayObject = (
  | $Typed<String>
  | $Typed<ArrayOfAnyURIArrayObject>
  | $Typed<Object>
  | { $type: string }
)[]
export type ArrayOfIdArrayObject = (
  | $Typed<String>
  | $Typed<ArrayOfIdArrayObject>
  | $Typed<Object>
  | { $type: string }
)[]
export type StringArrayObject =
  | $Typed<String>
  | $Typed<ArrayOfStringArrayObject>
  | $Typed<Object>
export type AnyURIArrayObject =
  | $Typed<AnyURI>
  | $Typed<ArrayOfAnyURIArrayObject>
  | $Typed<Object>
export type IdArrayObject =
  | $Typed<AnyURI>
  | $Typed<ArrayOfIdArrayObject>
  | $Typed<Object>
export type StringOrArrayOf = $Typed<String> | $Typed<ArrayOfString>
export type AnyURIOrArrayOf = $Typed<AnyURI> | $Typed<ArrayOfAnyURI>
export type IdOrArrayOf = $Typed<Id> | $Typed<ArrayOfId>
export type StringOrArrayOfAndObject =
  | $Typed<String>
  | $Typed<ArrayOfStringObject>
  | $Typed<Object>
export type AnyURIOrArrayOfAndObject =
  | $Typed<Id>
  | $Typed<ArrayOfAnyURIObject>
  | $Typed<Object>
export type IdOrArrayOfAndObject =
  | $Typed<Id>
  | $Typed<ArrayOfIdObject>
  | $Typed<Object>
