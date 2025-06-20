import { AppContext } from '@atproto/pds/src/context'
import { Server } from '../../../../lexicon'
import getActor from './getActor'
import getOutbox from './getOutbox'
import putInbox from './putInbox'

export default function (server: Server, ctx: AppContext) {
  getActor(server, ctx)
  getOutbox(server, ctx)
  putInbox(server, ctx)
}
