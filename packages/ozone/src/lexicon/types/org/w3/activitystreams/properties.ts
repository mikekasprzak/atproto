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
/** https://www.w3.org/ns/activitystreams#actor; Domain: Activity; Range: Object | Link; SubpropertyOf: attributedTo */
export type Actor = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#attachment; Domain: Object; Range: Object | Link */
export type Attachment = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#attributedTo; Domain: Object | Link; Range: Object | Link */
export type AttributedTo = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#audience; Domain: Object; Range: Object | Link */
export type Audience = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#bcc; Domain: Object; Range: Object | Link */
export type Bcc = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#bto; Domain: Object; Range: Object | Link */
export type Bto = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#cc; Domain: Object; Range: Object | Link */
export type Cc = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#context; Domain: Object; Range: Object | Link */
export type Context = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#current; Domain: Collection; Range: CollectionPage | Link; Functional */
export type Current = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#first; Domain: Collection; Range: CollectionPage | Link; Functional */
export type First = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#generator; Domain: Object; Range: Object | Link */
export type Generator = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#icon; Domain: Object; Range: Image | Link */
export type Icon = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#image; Domain: Object; Range: Image | Link */
export type Image = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#inReplyTo; Domain: Object; Range: Object | Link */
export type InReplyTo = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#instrument; Domain: Activity; Range: Object | Link */
export type Instrument = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#last; Domain: Collection; Range: CollectionPage | Link; Functional */
export type Last = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#location; Domain: Object; Range: Object | Link */
export type Location = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#items; Domain: Collection; Range: Object | Link | Ordered List of [Object | Link] */
export type Items = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#oneOf; Domain: Question; Range: Object | Link */
export type OneOf = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#anyOf; Domain: Question; Range: Object | Link */
export type AnyOf = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#closed; Domain: Question; Range: Object | Link | xsd:dateTime | xsd:boolean */
export type Closed =
  | $Typed<OrgW3ActivitystreamsDefs.Object>
  | $Typed<OrgW3ActivitystreamsDefs.DateTime>
  | $Typed<OrgW3ActivitystreamsDefs.Boolean>
/** https://www.w3.org/ns/activitystreams#origin; Domain: Activity; Range: Object | Link */
export type Origin = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#next; Domain: CollectionPage; Range: CollectionPage | Link; Functional */
export type Next = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#object; Domain: Activity | Relationship; Range: Object | Link */
export type Object = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#prev; Domain: CollectionPage; Range: CollectionPage | Link; Functional */
export type Prev = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#preview; Domain: Object | Link; Range: Object | Link */
export type Preview = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#result; Domain: Activity; Range: Object | Link */
export type Result = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#replies; Domain: Object; Range: Collection; Functional */
export type Replies = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#tag; Domain: Object; Range: Object | Link */
export type Tag = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#target; Domain: Activity; Range: Object | Link */
export type Target = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#to; Domain: Object; Range: Object | Link */
export type To = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#url; Domain: Object; Range: Link | xsd:anyURI */
export type Url = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#accuracy; Domain: Place; Range: xsd:float [>= 0.0f, <= 100.0f]; Note: Float not supported in Lexicon */
export type Accuracy = OrgW3ActivitystreamsDefs.Float
/** https://www.w3.org/ns/activitystreams#altitude; Domain: Object; Range: xsd:float; Functional; Note: Float not supported in Lexicon */
export type Altitude = OrgW3ActivitystreamsDefs.Float
/** https://www.w3.org/ns/activitystreams#content; Domain: Object; Range: xsd:string | rdf:langString */
export type Content = OrgW3ActivitystreamsDefs.String
/** https://www.w3.org/ns/activitystreams#name; Domain: Object | Link; Range: xsd:string | rdf:langString */
export type Name = OrgW3ActivitystreamsDefs.String
/** https://www.w3.org/ns/activitystreams#duration; Domain: Object; Range: xsd:duration; Functional */
export type Duration = OrgW3ActivitystreamsDefs.Duration
/** https://www.w3.org/ns/activitystreams#height; Domain: Link; Range: xsd:nonNegativeInteger; Functional */
export type Height = OrgW3ActivitystreamsDefs.NonNegativeInteger
/** https://www.w3.org/ns/activitystreams#href; Domain: Link; Range: xsd:anyURI; Functional */
export type Href = OrgW3ActivitystreamsDefs.AnyURI
/** https://www.w3.org/ns/activitystreams#hreflang; Domain: Link; Range: [BCP47] Language-Tag; Functional */
export type Hreflang = OrgW3ActivitystreamsDefs.Language
/** https://www.w3.org/ns/activitystreams#partOf; Domain: CollectionPage; Range: Link | Collection; Functional */
export type PartOf = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#latitude; Domain: Object; Range: xsd:float; Functional; Note: Float not supported in Lexicon */
export type Latitude = OrgW3ActivitystreamsDefs.Float
/** https://www.w3.org/ns/activitystreams#longitude; Domain: Object; Range: xsd:float; Functional; Note: Float not supported in Lexicon */
export type Longitude = OrgW3ActivitystreamsDefs.Float
/** https://www.w3.org/ns/activitystreams#mediaType; Domain: Object | Link; Range: MIME Media Type; Functional */
export type MediaType = OrgW3ActivitystreamsDefs.String
/** https://www.w3.org/ns/activitystreams#endTime; Domain: Object; Range: xsd:datetime; Functional */
export type EndTime = OrgW3ActivitystreamsDefs.DateTime
/** https://www.w3.org/ns/activitystreams#published; Domain: Object; Range: xsd:datetime; Functional */
export type Published = OrgW3ActivitystreamsDefs.DateTime
/** https://www.w3.org/ns/activitystreams#startTime; Domain: Object; Range: xsd:datetime; Functional */
export type StartTime = OrgW3ActivitystreamsDefs.DateTime
/** https://www.w3.org/ns/activitystreams#radius; Domain: Place; Range: xsd:float [>= 0.0f]; Functional; Note: Float not supported in Lexicon */
export type Radius = OrgW3ActivitystreamsDefs.NonNegativeFloat
/** https://www.w3.org/ns/activitystreams#rel; Domain: Link; Range: [RFC5988] or [HTML5] Link Relation */
export type Rel = OrgW3ActivitystreamsDefs.AnyURI
/** https://www.w3.org/ns/activitystreams#startIndex; Domain: OrderedCollectionPage; Range: xsd:nonNegativeInteger; Functional */
export type StartIndex = OrgW3ActivitystreamsDefs.NonNegativeInteger
/** https://www.w3.org/ns/activitystreams#summary; Domain: Object; Range: xsd:string | rdf:langString */
export type Summary = OrgW3ActivitystreamsDefs.String
/** https://www.w3.org/ns/activitystreams#totalitems; Domain: Collection; Range: xsd:nonNegativeInteger; Functional */
export type TotalItems = OrgW3ActivitystreamsDefs.NonNegativeInteger
/** https://www.w3.org/ns/activitystreams#units; Domain: Place; Range: 'cm' | 'feet' | 'inches' | 'km' | 'm' | 'miles' | xsd:anyURI: Functional */
export type Units = string
/** https://www.w3.org/ns/activitystreams#updated; Domain: Object; Range: xsd:datetime; Functional */
export type Updated = OrgW3ActivitystreamsDefs.DateTime
/** https://www.w3.org/ns/activitystreams#width; Domain: Link; Range: xsd:nonNegativeInteger; Functional */
export type Width = OrgW3ActivitystreamsDefs.NonNegativeInteger
/** https://www.w3.org/ns/activitystreams#subject; Domain: Relationship; Range: Object | Link; Functional */
export type Subject = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#relationship; Domain: Relationship; Range: Object */
export type Relationship = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#describes; Domain: Profile; Range: Object; Functional */
export type Describes = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#formerType; Domain: Tombstone; Range: Object; Functional: false; Note: MK - I believe explicit 'Functional: false' means it a url, while syntactically correct, points to a dead resource */
export type FormerType = OrgW3ActivitystreamsDefs.AnyURIArrayObject
/** https://www.w3.org/ns/activitystreams#deleted; Domain: Tombstone; Range: xsd:datetime; Functional */
export type Deleted = OrgW3ActivitystreamsDefs.DateTime
