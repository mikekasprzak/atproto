import { AppContext } from '../context'
import { Server } from '../lexicon'
import appBsky from './app/bsky'
import comAtproto from './com/atproto'
import orgW3 from './org/w3'

export default function (server: Server, ctx: AppContext) {
  comAtproto(server, ctx)
  appBsky(server, ctx)
  orgW3(server, ctx)
  return server
}
