import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import getActor from './getActor'

export default function (server: Server, ctx: AppContext) {
  getActor(server, ctx)
}
