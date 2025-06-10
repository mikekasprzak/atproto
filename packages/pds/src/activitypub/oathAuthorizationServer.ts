import { Router, json } from 'express'
import { AppContext } from '../context'

// https://docs.joinmastodon.org/methods/oauth/#authorization-server-metadata

export const createRouter = (ctx: AppContext): Router => {
  const router = Router()
  router.use(json())

  router.get('/.well-known/oauth-authorization-server', async function (req, res) {
    return res.type('application/json').json({ "message": "Hello, world!" })
  })

  return router
}
