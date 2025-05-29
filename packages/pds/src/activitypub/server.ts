import { Router } from 'express'
import { AppContext } from '../context'

export const routePrefix = '/activitypub';
var inbox: unknown[] = []


/*
  {
      "@context": [
        "https://www.w3.org/ns/activitystreams",
        "https://w3id.org/security/v1"
      ],
    }
      */

export const createRouter = (ctx: AppContext): Router => {
  const router = Router()

  router.post(`${routePrefix}/:actor/inbox`, async function (req, res) {
    inbox.push(res.json(req.body))
    return res.type('application/json').send("ThANKS BRUh");
  })

  // hack?
  router.get(`${routePrefix}/:actor/inspect`, async function (req, res) {
    return res.type('application/json').send(inbox.join('\n\n'));
  })



  router.get(`${routePrefix}/:actor/outbox`, async function (req, res) {
    return res.type('application/json').send(`outbox ${req.params.actor}`);
  })

  router.get(`${routePrefix}/:actor/followers`, async function (req, res) {
    return res.type('application/json').send(`followers ${req.params.actor}`);
  })

  router.get(`${routePrefix}/:actor/following`, async function (req, res) {
    return res.type('application/json').send(`following ${req.params.actor}`);
  })



  router.get(`${routePrefix}/:actor`, async function (req, res) {
    const domPrefix = `${req.protocol}://${req.hostname}`

    return res.type('application/json').send({
      "@context": [
        "https://www.w3.org/ns/activitystreams",
        "https://w3id.org/security/v1"
      ],
      "id": `${domPrefix}${routePrefix}/${req.params.actor}`,
      "type": "Person",
      "name": req.params.actor,
      "preferredUsername": req.params.actor,
      "inbox": `${domPrefix}${routePrefix}/${req.params.actor}/inbox`,
      "outbox": `${domPrefix}${routePrefix}/${req.params.actor}/outbox`,
      "followers": `${domPrefix}${routePrefix}/${req.params.actor}/followers`,
      "following": `${domPrefix}${routePrefix}/${req.params.actor}/following`,
      "publicKey": {
        "id": `${domPrefix}${routePrefix}/${req.params.actor}#main-key`,
        "owner": `${domPrefix}${routePrefix}/${req.params.actor}`,
        "publicKeyPem": "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
      }
    });
  })

  return router
}
