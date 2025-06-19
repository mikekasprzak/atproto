import { AppContext } from '@atproto/pds/src/context'
import { Server } from '../../../lexicon'
import activitypub from './activitypub'

export default function (server: Server, ctx: AppContext) {
  activitypub(server, ctx)
}
