import { AppContext } from '../../../context'
import { Server } from '../../../lexicon'
import activitypub from './activitypub'
//import activitystreams from './activitystreams'

export default function (server: Server, ctx: AppContext) {
  activitypub(server, ctx)
  //activitystreams(server, ctx)
}
