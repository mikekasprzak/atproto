import { Server as ActivityPubServer, apiOrgW3 } from '@atproto/pds-activitypub'
import { AppContext } from '../context'
import { Server } from '../lexicon'
import appBsky from './app/bsky'
import comAtproto from './com/atproto'

export default function (server: Server, ctx: AppContext) {
  comAtproto(server, ctx)
  appBsky(server, ctx)
  apiOrgW3(server as ActivityPubServer, ctx)
  return server
}
