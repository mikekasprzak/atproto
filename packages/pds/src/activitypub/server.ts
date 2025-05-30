import { Router, json } from 'express'
import { AppContext } from '../context'

export const routePrefix = '/apub'
const inbox: string[] = []

export const createRouter = (ctx: AppContext): Router => {
  const router = Router()
  router.use(json())

  ctx

  router.post(`${routePrefix}/:actor/inbox`, async function (req, res) {
    inbox.push(JSON.stringify(req.body))
    return res.json()
  })

  // hack
  router.get(`${routePrefix}/:actor/inspect`, async function (req, res) {
    console.log(inbox)
    return res.type('text/plain').send(inbox.join('\n\n'))
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
    if (typeof req.query.resource !== 'string') {
      return res.status(400).json()
    }

    const subject = req.query.resource
    const [resourceType, handle] = subject.split(':')
    if (resourceType !== 'acct') {
      return res.status(400).json(['unsupported resource type'])
    }
    const [actor, domain] = handle.split('@')

    if (domain !== req.hostname) {
      return res.status(400).json(['invalid hostname'])
    }

    const domPrefix = `${req.protocol}://${req.hostname}`

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
