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
import type * as OrgW3ActivitystreamsDefs from '../activitystreams/defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.w3.activitypub.properties'

/** https://www.w3.org/TR/activitypub/#source-property; Domain: Object; Range: Object */
export type Source = OrgW3ActivitystreamsDefs.ObjectType
