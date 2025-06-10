import { RepoRecord } from '@atproto/lexicon'
import { InvalidRequestError } from '@atproto/oauth-provider'
//import { AtUri } from '@atproto/syntax'
import {
  atUriToTID,
  genDomainPrefix,
  inferPubHandle,
  /*makeActivity,
  makeImageURL,*/
  makeLDContext,
  /*makeNote,
  makeObject,*/
} from '../../../../activitypub/util'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import { ids } from '../../../../lexicon/lexicons'
//import { pipethrough } from '../../../../pipethrough'
import { Record as ProfileRecord } from '../../../../lexicon/types/app/bsky/actor/profile'
import { Record as FeedPostRecord } from '../../../../lexicon/types/app/bsky/feed/post'

export default function (server: Server, ctx: AppContext) {
  server.org.w3.activitypub.getOutbox({
    //auth: ctx.authVerifier.accessStandard(),
    handler: async ({ params, /*auth,*/ req }) => {
      const { repo, page } = params

      const atUser = await ctx.accountManager.getAccount(repo)
      if (!atUser) {
        throw new InvalidRequestError(`Could not find repo: ${repo}`)
      } else if (!atUser.handle) {
        throw new InvalidRequestError(
          `Unable to read handle from repo: ${repo}`,
        )
      }
      const did = atUser.did

      let profile: ProfileRecord | undefined
      await ctx.actorStore.read(did, async (actor) => {
        profile = (await actor.record.getProfileRecord()) as ProfileRecord
      })
      if (!profile) {
        throw new InvalidRequestError(
          `Unable to fetch profile from repo: ${repo}`,
        )
      }

      const uriPrefix = `${genDomainPrefix(ctx, req)}/xrpc`
      const pubHandle = inferPubHandle(ctx, req.hostname, atUser.handle)

      let apResponse = {}

      // Get posts belonging to the user
      let postRecord: {
        uri: string
        cid: string
        value: RepoRecord
      }[] = []
      await ctx.actorStore.read(did, async (actor) => {
        postRecord = await actor.record.listRecordsForCollection({
          collection: ids.AppBskyFeedPost,
          limit: 10,
          reverse: false,
        })
      })


      if (page) {
        // TODO: sanitize page

        // Convert posts into Activities and Notes
        const items = postRecord.map((key) => {
          const pr = key.value as FeedPostRecord
          //const er = pr ? (pr.embed as EmbedRecord) : undefined
          //const cm = er ? (er.record as CreateOutputSchema) : undefined

          const tid = atUriToTID(key.uri)
          //const statusUri = `${pubHandle}/xrpc/ ${tid}`

          const source = key.value.text as string
          const content = `<p>${source}</p>`

          return {
            type: 'Create',
            id: `${uriPrefix}/${ids.OrgW3ActivitypubGetResource}?repo=${did}&id=${tid}&nsid="${ids.OrgW3ActivitypubActivity}#create"`,
            //atUri: key.uri,
            //atCid: key.cid,
            published: pr.createdAs as string,
            actor: `${uriPrefix}/${ids.OrgW3ActivitypubGetActor}?repo=${did}`,
            to: ['https://www.w3.org/ns/activitystreams#Public'],
            //cc: [`${options.uriHandle}/followers`], // public
            object: {
              type: 'Note',
              id: `${uriPrefix}/${ids.OrgW3ActivitypubGetResource}?repo=${did}&id=${tid}&nsid="${ids.OrgW3ActivitypubObject}#note"`,
              summary: null,
              inReplyTo: null,
              published: pr.createdAs as string,
              attributedTo: `${uriPrefix}/${ids.OrgW3ActivitypubGetActor}?repo=${did}`,
              to: ['https://www.w3.org/ns/activitystreams#Public'],
              //cc: [`${options.uriHandle}/followers`], // public
              sensitive: false,
              content: content,
              /*contentMap: {
                en: content,
              },*/

            },
          }

          /*
          return makeActivity(
            'Create',
            {
              uriHandle: pubHandle,
              postId: tid ?? 'NOT_FOUND',
              //postId: cm && cm.commit ? cm.commit.rev : 'NOT_FOUND',
              published: pr.createdAs as string,
              id: key.uri,
              cid: key.cid,
            },
            makeNote(
              {
                uriHandle: pubHandle,
                postId: tid ?? 'NOT_FOUND',
                //postId: cm && cm.commit ? cm.commit.rev : 'NOT_FOUND',
                published: key.value.createdAs as string,
                id: key.uri,
                cid: key.cid,
              },
              `<p>${key.value.text as string}</p>`,
            ),
          )
          */
        })

        apResponse = {
          type: 'OrderedCollectionPage',
          id: `${uriPrefix}/${ids.OrgW3ActivitypubGetOutbox}?repo=${did}&page=true`,
          //atUri: `at://${did}/${ids.OrgW3ActivitypubGetOutbox}`,
          partOf: `${uriPrefix}/${ids.OrgW3ActivitypubGetOutbox}?repo=${did}`,
          orderedItems: items,
          //next: '',
          //prev: '',
        }
      }
      else
      {
        apResponse = {
          type: 'OrderedCollection',
          id: `${uriPrefix}/${ids.OrgW3ActivitypubGetOutbox}?repo=${did}`,
          //atUri: `at://${did}/${ids.OrgW3ActivitypubGetOutbox}`,
          totalItems: postRecord.length,
          first: `${uriPrefix}/${ids.OrgW3ActivitypubGetOutbox}?repo=${did}&page=true`,
          last: `${uriPrefix}/${ids.OrgW3ActivitypubGetOutbox}?repo=${did}&page=true&min_id=0`,
        }
      }

      return {
        encoding: 'application/activity+json', // 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"',
        body: {
          $type:
            apResponse === 'OrderedCollection'
              ? 'org.w3.activitystreams.orderedCollection'
              : 'org.w3.activitystreams.orderedCollectionPage',
          '@context': makeLDContext(apResponse),
          ...apResponse,
        },
      }
    },
  })
}
