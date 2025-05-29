import { Router, json } from 'express'
import { AppContext } from '../context'

export const routePrefix = '/activitypub'
const inbox: string[] = []

/*
  {
      "@context": [
        "https://www.w3.org/ns/activitystreams",
        "https://w3id.org/security/v1"
      ],
    }
      */

// .map((m) => JSON.stringify(m))

export const createRouter = (ctx: AppContext): Router => {
  const router = Router()
  ctx

  router.use(json())

  router.post(`${routePrefix}/:actor/inbox`, async function (req, res) {
    inbox.push(JSON.stringify(req.body))
    return res.json(['ThANKS BRUh'])
  })

  // hack
  router.get(`${routePrefix}/:actor/inspect`, async function (req, res) {
    console.log(inbox)
    return res.type('application/json').send(inbox.join('\n\n'))
  })

  router.get(`${routePrefix}/:actor/outbox`, async function (req, res) {
    return res.json([`outbox ${req.params.actor}`])
  })

  router.get(`${routePrefix}/:actor/followers`, async function (req, res) {
    return res.json([`followers ${req.params.actor}`])
  })

  router.get(`${routePrefix}/:actor/following`, async function (req, res) {
    return res.json([`following ${req.params.actor}`])
  })

  router.get(`${routePrefix}/:actor`, async function (req, res) {
    const domPrefix = `${req.protocol}://${req.hostname}`

    return res.json({
      '@context': [
        'https://www.w3.org/ns/activitystreams',
        'https://w3id.org/security/v1',
      ],
      id: `${domPrefix}${routePrefix}/${req.params.actor}`,
      type: 'Person',
      name: req.params.actor,
      preferredUsername: req.params.actor,
      inbox: `${domPrefix}${routePrefix}/${req.params.actor}/inbox`,
      outbox: `${domPrefix}${routePrefix}/${req.params.actor}/outbox`,
      followers: `${domPrefix}${routePrefix}/${req.params.actor}/followers`,
      following: `${domPrefix}${routePrefix}/${req.params.actor}/following`,
      publicKey: {
        id: `${domPrefix}${routePrefix}/${req.params.actor}#main-key`,
        owner: `${domPrefix}${routePrefix}/${req.params.actor}`,
        publicKeyPem:
          '-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----',
      },
    })
  })

  router.get('/.well-known/webfinger', async function (req, res) {
    if (
      typeof req.query.resource !== 'string' ||
      req.query.resource.slice(0, 5) !== 'acct:'
    ) {
      return res.status(400).json(['Bad request'])
    }

    const subject = req.query.resource

    const domPrefix = `${req.protocol}://${req.hostname}`

    // TODO: confirm this is a valid account resource
    const handle = subject.slice(5)
    const parts = handle.split('@')
    const actor = parts[0]
    //const repo = parts[1]

    // TODO: confirm repo exists

    return res.json({
      subject: subject,
      links: [
        {
          rel: 'self',
          type: 'application/activity+json',
          href: `${domPrefix}${routePrefix}/${actor}`,
        },
      ],
    })
  })

  return router
}
