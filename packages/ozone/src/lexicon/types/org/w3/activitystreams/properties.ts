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
import type * as OrgW3ActivitystreamsDefs from './defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.w3.activitystreams.properties'

export interface Main {
  $type?: 'org.w3.activitystreams.properties'
  /** @id; Domain: Object | Link; Range: anyURI; Functional */
  id?: string
  /** @type; Domain: Object | Link; Range: anyURI */
  type?: string
  /** https://www.w3.org/ns/activitystreams#actor; Domain: Activity; Range: Object | Link; SubpropertyOf: attributedTo */
  actor?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#attachment; Domain: Object; Range: Object | Link */
  attachment?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#attributedTo; Domain: Object | Link; Range: Object | Link */
  attributedTo?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#audience; Domain: Object; Range: Object | Link */
  audience?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#bcc; Domain: Object; Range: Object | Link */
  bcc?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#bto; Domain: Object; Range: Object | Link */
  bto?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#cc; Domain: Object; Range: Object | Link */
  cc?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#context; Domain: Object; Range: Object | Link */
  context?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#current; Domain: Collection; Range: CollectionPage | Link; Functional */
  current?: string
  /** https://www.w3.org/ns/activitystreams#first; Domain: Collection; Range: CollectionPage | Link; Functional */
  first?: string
  /** https://www.w3.org/ns/activitystreams#generator; Domain: Object; Range: Object | Link */
  generator?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#icon; Domain: Object; Range: Image | Link */
  icon?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#image; Domain: Object; Range: Image | Link */
  image?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#inReplyTo; Domain: Object; Range: Object | Link */
  inReplyTo?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#instrument; Domain: Activity; Range: Object | Link */
  instrument?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#last; Domain: Collection; Range: CollectionPage | Link; Functional */
  last?: string
  /** https://www.w3.org/ns/activitystreams#location; Domain: Object; Range: Object | Link */
  location?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#items; Domain: Collection; Range: Object | Link | Ordered List of [Object | Link] */
  items?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#oneOf; Domain: Question; Range: Object | Link */
  oneOf?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#anyOf; Domain: Question; Range: Object | Link */
  anyOf?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#closed; Domain: Question; Range: Object | Link | xsd:dateTime | xsd:boolean */
  closed?: { [_ in string]: unknown }
  /** https://www.w3.org/ns/activitystreams#origin; Domain: Activity; Range: Object | Link */
  origin?: { [_ in string]: unknown }
  /** https://www.w3.org/ns/activitystreams#next; Domain: CollectionPage; Range: CollectionPage | Link; Functional */
  next?: string
  /** https://www.w3.org/ns/activitystreams#object; Domain: Activity | Relationship; Range: Object | Link */
  object?: { [_ in string]: unknown }
  /** https://www.w3.org/ns/activitystreams#prev; Domain: CollectionPage; Range: CollectionPage | Link; Functional */
  prev?: string
  /** https://www.w3.org/ns/activitystreams#result; Domain: Activity; Range: Object | Link */
  result?: { [_ in string]: unknown }
  /** https://www.w3.org/ns/activitystreams#replies; Domain: Object; Range: Collection; Functional */
  replies?: { [_ in string]: unknown }
  /** https://www.w3.org/ns/activitystreams#tag; Domain: Object; Range: Object | Link */
  tag?: OrgW3ActivitystreamsDefs.Object[]
  target?: OrgW3ActivitystreamsDefs.Object
  /** https://www.w3.org/ns/activitystreams#to; Domain: Object; Range: Object | Link */
  to?: OrgW3ActivitystreamsDefs.Object[]
  /** https://www.w3.org/ns/activitystreams#url; Domain: Object; Range: Link | xsd:anyURI */
  url?: string
  /** https://www.w3.org/ns/activitystreams#accuracy; Domain: Place; Range: xsd:float [>= 0.0f, <= 100.0f]; Note: Float not supported in Lexicon */
  accuracy?: string
  /** https://www.w3.org/ns/activitystreams#altitude; Domain: Object; Range: xsd:float; Functional; Note: Float not supported in Lexicon */
  altitude?: string
  /** https://www.w3.org/ns/activitystreams#content; Domain: Object; Range: xsd:string | rdf:langString */
  content?: string
  /** https://www.w3.org/ns/activitystreams#duration; Domain: Object; Range: xsd:duration; Functional */
  duration?: string
  /** https://www.w3.org/ns/activitystreams#partOf; Domain: CollectionPage; Range: Link | Collection; Functional */
  partOf?: string
  /** https://www.w3.org/ns/activitystreams#latitude; Domain: Object; Range: xsd:float; Functional; Note: Float not supported in Lexicon */
  latitude?: string
  /** https://www.w3.org/ns/activitystreams#longitude; Domain: Object; Range: xsd:float; Functional; Note: Float not supported in Lexicon */
  longitude?: string
  /** https://www.w3.org/ns/activitystreams#endTime; Domain: Object; Range: xsd:datetime; Functional */
  endTime?: string
  /** https://www.w3.org/ns/activitystreams#published; Domain: Object; Range: xsd:datetime; Functional */
  published?: string
  /** https://www.w3.org/ns/activitystreams#startTime; Domain: Object; Range: xsd:datetime; Functional */
  startTime?: string
  /** https://www.w3.org/ns/activitystreams#radius; Domain: Place; Range: xsd:float [>= 0.0f]; Functional; Note: Float not supported in Lexicon */
  radius?: string
  rel?: OrgW3ActivitystreamsDefs.AnyURI
  /** https://www.w3.org/ns/activitystreams#startIndex; Domain: OrderedCollectionPage; Range: xsd:nonNegativeInteger; Functional */
  startIndex?: number
  /** https://www.w3.org/ns/activitystreams#summary; Domain: Object; Range: xsd:string | rdf:langString */
  summary?: string
  /** https://www.w3.org/ns/activitystreams#totalitems; Domain: Collection; Range: xsd:nonNegativeInteger; Functional */
  totalItems?: number
  /** https://www.w3.org/ns/activitystreams#units; Domain: Place; Range: 'cm' | 'feet' | 'inches' | 'km' | 'm' | 'miles' | xsd:anyURI: Functional */
  units?: string
  /** https://www.w3.org/ns/activitystreams#updated; Domain: Object; Range: xsd:datetime; Functional */
  updated?: string
  subject?: OrgW3ActivitystreamsDefs.Object
  relationship?: OrgW3ActivitystreamsDefs.Object
  describes?: OrgW3ActivitystreamsDefs.Object
  formerType?: OrgW3ActivitystreamsDefs.Object
  /** https://www.w3.org/ns/activitystreams#deleted; Domain: Tombstone; Range: xsd:datetime; Functional */
  deleted?: string
}

const hashMain = 'main'

export function isMain<V>(v: V) {
  return is$typed(v, id, hashMain)
}

export function validateMain<V>(v: V) {
  return validate<Main & V>(v, id, hashMain)
}

export interface Name {
  $type?: 'org.w3.activitystreams.properties#name'
  main?: OrgW3ActivitystreamsDefs.String
}

const hashName = 'name'

export function isName<V>(v: V) {
  return is$typed(v, id, hashName)
}

export function validateName<V>(v: V) {
  return validate<Name & V>(v, id, hashName)
}

export interface Height {
  $type?: 'org.w3.activitystreams.properties#height'
  main?: OrgW3ActivitystreamsDefs.NonNegativeInteger
}

const hashHeight = 'height'

export function isHeight<V>(v: V) {
  return is$typed(v, id, hashHeight)
}

export function validateHeight<V>(v: V) {
  return validate<Height & V>(v, id, hashHeight)
}

export interface Width {
  $type?: 'org.w3.activitystreams.properties#width'
  main?: OrgW3ActivitystreamsDefs.NonNegativeInteger
}

const hashWidth = 'width'

export function isWidth<V>(v: V) {
  return is$typed(v, id, hashWidth)
}

export function validateWidth<V>(v: V) {
  return validate<Width & V>(v, id, hashWidth)
}

export interface Href {
  $type?: 'org.w3.activitystreams.properties#href'
  main?: OrgW3ActivitystreamsDefs.AnyURI
}

const hashHref = 'href'

export function isHref<V>(v: V) {
  return is$typed(v, id, hashHref)
}

export function validateHref<V>(v: V) {
  return validate<Href & V>(v, id, hashHref)
}

export interface Hreflang {
  $type?: 'org.w3.activitystreams.properties#hreflang'
  /** https://www.w3.org/ns/activitystreams#hreflang; Domain: Link; Range: [BCP47] Language-Tag; Functional; Note: According to [RFC5646], the maximum legal size of a 'Language-Tag' is the 'langtag' of size (3+1+3+2*(1+3))+1+(4)+1+(3)+(variantCount*(1+8))+(1+extensionCount*(3+1+8))+1+(1+privateUseCount*(1+8)), which is a lot */
  main?: string
}

const hashHreflang = 'hreflang'

export function isHreflang<V>(v: V) {
  return is$typed(v, id, hashHreflang)
}

export function validateHreflang<V>(v: V) {
  return validate<Hreflang & V>(v, id, hashHreflang)
}

export interface Ref {
  $type?: 'org.w3.activitystreams.properties#ref'
  main?: OrgW3ActivitystreamsDefs.AnyURI
}

const hashRef = 'ref'

export function isRef<V>(v: V) {
  return is$typed(v, id, hashRef)
}

export function validateRef<V>(v: V) {
  return validate<Ref & V>(v, id, hashRef)
}

export interface MediaType {
  $type?: 'org.w3.activitystreams.properties#mediaType'
  /** https://www.w3.org/ns/activitystreams#mediaType; Domain: Object | Link; Range: MIME Media Type; Functional */
  main?: string
}

const hashMediaType = 'mediaType'

export function isMediaType<V>(v: V) {
  return is$typed(v, id, hashMediaType)
}

export function validateMediaType<V>(v: V) {
  return validate<MediaType & V>(v, id, hashMediaType)
}

export interface Preview {
  $type?: 'org.w3.activitystreams.properties#preview'
  main?: OrgW3ActivitystreamsDefs.Object
}

const hashPreview = 'preview'

export function isPreview<V>(v: V) {
  return is$typed(v, id, hashPreview)
}

export function validatePreview<V>(v: V) {
  return validate<Preview & V>(v, id, hashPreview)
}
