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
import type * as Application from '../../../Application.js'
import type * as Group from '../../../Group.js'
import type * as Organization from '../../../Organization.js'
import type * as Person from '../../../Person.js'
import type * as Service from '../../../Service.js'
import type * as Accept from '../../../Accept.js'
import type * as Add from '../../../Add.js'
import type * as Announce from '../../../Announce.js'
import type * as Arrive from '../../../Arrive.js'
import type * as Block from '../../../Block.js'
import type * as Create from '../../../Create.js'
import type * as Delete from '../../../Delete.js'
import type * as Dislike from '../../../Dislike.js'
import type * as Flag from '../../../Flag.js'
import type * as Follow from '../../../Follow.js'
import type * as Ignore from '../../../Ignore.js'
import type * as Invite from '../../../Invite.js'
import type * as Join from '../../../Join.js'
import type * as Leave from '../../../Leave.js'
import type * as Like from '../../../Like.js'
import type * as Listen from '../../../Listen.js'
import type * as Move from '../../../Move.js'
import type * as Offer from '../../../Offer.js'
import type * as Question from '../../../Question.js'
import type * as Reject from '../../../Reject.js'
import type * as Read from '../../../Read.js'
import type * as Remove from '../../../Remove.js'
import type * as TentativeReject from '../../../TentativeReject.js'
import type * as TentativeAccept from '../../../TentativeAccept.js'
import type * as Travel from '../../../Travel.js'
import type * as Undo from '../../../Undo.js'
import type * as Update from '../../../Update.js'
import type * as View from '../../../View.js'
import type * as Article from '../../../Article.js'
import type * as Audio from '../../../Audio.js'
import type * as Document from '../../../Document.js'
import type * as Event from '../../../Event.js'
import type * as Image from '../../../Image.js'
import type * as Note from '../../../Note.js'
import type * as Page from '../../../Page.js'
import type * as Place from '../../../Place.js'
import type * as Profile from '../../../Profile.js'
import type * as Relationship from '../../../Relationship.js'
import type * as Tombstone from '../../../Tombstone.js'
import type * as Video from '../../../Video.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.w3.activitypub.defs'

export interface Unions {
  $type?: 'org.w3.activitypub.defs#unions'
  actorType?:
    | $Typed<Application.Main>
    | $Typed<Group.Main>
    | $Typed<Organization.Main>
    | $Typed<Person.Main>
    | $Typed<Service.Main>
    | { $type: string }
  activityType?:
    | $Typed<Accept.Main>
    | $Typed<Add.Main>
    | $Typed<Announce.Main>
    | $Typed<Arrive.Main>
    | $Typed<Block.Main>
    | $Typed<Create.Main>
    | $Typed<Delete.Main>
    | $Typed<Dislike.Main>
    | $Typed<Flag.Main>
    | $Typed<Follow.Main>
    | $Typed<Ignore.Main>
    | $Typed<Invite.Main>
    | $Typed<Join.Main>
    | $Typed<Leave.Main>
    | $Typed<Like.Main>
    | $Typed<Listen.Main>
    | $Typed<Move.Main>
    | $Typed<Offer.Main>
    | $Typed<Question.Main>
    | $Typed<Reject.Main>
    | $Typed<Read.Main>
    | $Typed<Remove.Main>
    | $Typed<TentativeReject.Main>
    | $Typed<TentativeAccept.Main>
    | $Typed<Travel.Main>
    | $Typed<Undo.Main>
    | $Typed<Update.Main>
    | $Typed<View.Main>
    | { $type: string }
  objectType?:
    | $Typed<Article.Main>
    | $Typed<Audio.Main>
    | $Typed<Document.Main>
    | $Typed<Event.Main>
    | $Typed<Image.Main>
    | $Typed<Note.Main>
    | $Typed<Page.Main>
    | $Typed<Place.Main>
    | $Typed<Profile.Main>
    | $Typed<Relationship.Main>
    | $Typed<Tombstone.Main>
    | $Typed<Video.Main>
    | $Typed<Block.Main>
    | $Typed<Flag.Main>
    | $Typed<Move.Main>
    | $Typed<Question.Main>
    | { $type: string }
}

const hashUnions = 'unions'

export function isUnions<V>(v: V) {
  return is$typed(v, id, hashUnions)
}

export function validateUnions<V>(v: V) {
  return validate<Unions & V>(v, id, hashUnions)
}

export interface SourceType {
  $type?: 'org.w3.activitypub.defs#sourceType'
  content?: string
  mediaType?: string
}

const hashSourceType = 'sourceType'

export function isSourceType<V>(v: V) {
  return is$typed(v, id, hashSourceType)
}

export function validateSourceType<V>(v: V) {
  return validate<SourceType & V>(v, id, hashSourceType)
}
