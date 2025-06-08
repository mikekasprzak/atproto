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

/** @id; Domain: Object | Link; Range: anyURI; Functional */
export type Id = string
/** @type; Domain: Object | Link; Range: anyURI */
export type Type = string
export type Actor = OrgW3ActivitystreamsDefs.Object[]
export type Attachment = OrgW3ActivitystreamsDefs.Object[]
export type AttributedTo = OrgW3ActivitystreamsDefs.Object[]
export type Audience = OrgW3ActivitystreamsDefs.Object[]
export type Bcc = OrgW3ActivitystreamsDefs.Object[]
export type Bto = OrgW3ActivitystreamsDefs.Object[]
export type Cc = OrgW3ActivitystreamsDefs.Object[]
export type Context = OrgW3ActivitystreamsDefs.Object[]
/** https://www.w3.org/ns/activitystreams#current; Domain: Collection; Range: CollectionPage | Link; Functional */
export type Current = string
/** https://www.w3.org/ns/activitystreams#first; Domain: Collection; Range: CollectionPage | Link; Functional */
export type First = string
export type Generator = OrgW3ActivitystreamsDefs.Object[]
export type Icon = OrgW3ActivitystreamsDefs.Object[]
export type Image = OrgW3ActivitystreamsDefs.Object[]
export type InReplyTo = OrgW3ActivitystreamsDefs.Object[]
export type Instrument = OrgW3ActivitystreamsDefs.Object[]
/** https://www.w3.org/ns/activitystreams#last; Domain: Collection; Range: CollectionPage | Link; Functional */
export type Last = string
export type Location = OrgW3ActivitystreamsDefs.Object[]
export type Items = OrgW3ActivitystreamsDefs.Object[]
export type OneOf = OrgW3ActivitystreamsDefs.Object[]
export type AnyOf = OrgW3ActivitystreamsDefs.Object[]
/** https://www.w3.org/ns/activitystreams#closed; Domain: Question; Range: Object | Link | xsd:dateTime | xsd:boolean */
export type Closed = { [_ in string]: unknown }
/** https://www.w3.org/ns/activitystreams#origin; Domain: Activity; Range: Object | Link */
export type Origin = { [_ in string]: unknown }
/** https://www.w3.org/ns/activitystreams#next; Domain: CollectionPage; Range: CollectionPage | Link; Functional */
export type Next = string
/** https://www.w3.org/ns/activitystreams#object; Domain: Activity | Relationship; Range: Object | Link */
export type Object = { [_ in string]: unknown }
/** https://www.w3.org/ns/activitystreams#prev; Domain: CollectionPage; Range: CollectionPage | Link; Functional */
export type Prev = string
/** https://www.w3.org/ns/activitystreams#preview; Domain: Object | Link; Range: Object | Link */
export type Preview = OrgW3ActivitystreamsDefs.Object
/** https://www.w3.org/ns/activitystreams#result; Domain: Activity; Range: Object | Link */
export type Result = { [_ in string]: unknown }
/** https://www.w3.org/ns/activitystreams#replies; Domain: Object; Range: Collection; Functional */
export type Replies = { [_ in string]: unknown }
export type Tag = OrgW3ActivitystreamsDefs.Object[]
/** https://www.w3.org/ns/activitystreams#target; Domain: Activity; Range: Object | Link */
export type Target = OrgW3ActivitystreamsDefs.Object
export type To = OrgW3ActivitystreamsDefs.Object[]
/** https://www.w3.org/ns/activitystreams#url; Domain: Object; Range: Link | xsd:anyURI */
export type Url = string
/** https://www.w3.org/ns/activitystreams#accuracy; Domain: Place; Range: xsd:float [>= 0.0f, <= 100.0f]; Note: Float not supported in Lexicon */
export type Accuracy = string
/** https://www.w3.org/ns/activitystreams#altitude; Domain: Object; Range: xsd:float; Functional; Note: Float not supported in Lexicon */
export type Altitude = string
/** https://www.w3.org/ns/activitystreams#content; Domain: Object; Range: xsd:string | rdf:langString */
export type Content = string
/** https://www.w3.org/ns/activitystreams#name; Domain: Object | Link; Range: xsd:string | rdf:langString */
export type Name = OrgW3ActivitystreamsDefs.String
/** https://www.w3.org/ns/activitystreams#duration; Domain: Object; Range: xsd:duration; Functional */
export type Duration = string
/** https://www.w3.org/ns/activitystreams#height; Domain: Link; Range: xsd:nonNegativeInteger; Functional */
export type Height = OrgW3ActivitystreamsDefs.NonNegativeInteger
/** https://www.w3.org/ns/activitystreams#href; Domain: Link; Range: xsd:anyURI; Functional */
export type Href = OrgW3ActivitystreamsDefs.AnyURI
/** https://www.w3.org/ns/activitystreams#hreflang; Domain: Link; Range: [BCP47] Language-Tag; Functional; Note: According to [RFC5646], the maximum legal size of a 'Language-Tag' is the 'langtag' of size (3+1+3+2*(1+3))+1+(4)+1+(3)+(variantCount*(1+8))+(1+extensionCount*(3+1+8))+1+(1+privateUseCount*(1+8)), which is a lot */
export type Hreflang = string
/** https://www.w3.org/ns/activitystreams#partOf; Domain: CollectionPage; Range: Link | Collection; Functional */
export type PartOf = string
/** https://www.w3.org/ns/activitystreams#latitude; Domain: Object; Range: xsd:float; Functional; Note: Float not supported in Lexicon */
export type Latitude = string
/** https://www.w3.org/ns/activitystreams#longitude; Domain: Object; Range: xsd:float; Functional; Note: Float not supported in Lexicon */
export type Longitude = string
/** https://www.w3.org/ns/activitystreams#mediaType; Domain: Object | Link; Range: MIME Media Type; Functional */
export type MediaType = string
/** https://www.w3.org/ns/activitystreams#endTime; Domain: Object; Range: xsd:datetime; Functional */
export type EndTime = string
/** https://www.w3.org/ns/activitystreams#published; Domain: Object; Range: xsd:datetime; Functional */
export type Published = string
/** https://www.w3.org/ns/activitystreams#startTime; Domain: Object; Range: xsd:datetime; Functional */
export type StartTime = string
/** https://www.w3.org/ns/activitystreams#radius; Domain: Place; Range: xsd:float [>= 0.0f]; Functional; Note: Float not supported in Lexicon */
export type Radius = string
/** https://www.w3.org/ns/activitystreams#rel; Domain: Link; Range: [RFC5988] or [HTML5] Link Relation */
export type Rel = OrgW3ActivitystreamsDefs.AnyURI
/** https://www.w3.org/ns/activitystreams#startIndex; Domain: OrderedCollectionPage; Range: xsd:nonNegativeInteger; Functional */
export type StartIndex = number
/** https://www.w3.org/ns/activitystreams#summary; Domain: Object; Range: xsd:string | rdf:langString */
export type Summary = string
/** https://www.w3.org/ns/activitystreams#totalitems; Domain: Collection; Range: xsd:nonNegativeInteger; Functional */
export type TotalItems = number
/** https://www.w3.org/ns/activitystreams#units; Domain: Place; Range: 'cm' | 'feet' | 'inches' | 'km' | 'm' | 'miles' | xsd:anyURI: Functional */
export type Units = string
/** https://www.w3.org/ns/activitystreams#updated; Domain: Object; Range: xsd:datetime; Functional */
export type Updated = string
/** https://www.w3.org/ns/activitystreams#width; Domain: Link; Range: xsd:nonNegativeInteger; Functional */
export type Width = OrgW3ActivitystreamsDefs.NonNegativeInteger
/** https://www.w3.org/ns/activitystreams#subject; Domain: Relationship; Range: Object | Link; Functional */
export type Subject = OrgW3ActivitystreamsDefs.Object
/** https://www.w3.org/ns/activitystreams#relationship; Domain: Relationship; Range: Object */
export type Relationship = OrgW3ActivitystreamsDefs.Object
/** https://www.w3.org/ns/activitystreams#describes; Domain: Profile; Range: Object; Functional */
export type Describes = OrgW3ActivitystreamsDefs.Object
/** https://www.w3.org/ns/activitystreams#formerType; Domain: Tombstone; Range: Object; Functional: false; Note: MK - I believe explicit 'Functional: false' means it a url, while syntactically correct, points to a dead resource */
export type FormerType = OrgW3ActivitystreamsDefs.Object
/** https://www.w3.org/ns/activitystreams#deleted; Domain: Tombstone; Range: xsd:datetime; Functional */
export type Deleted = string
