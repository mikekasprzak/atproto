import { Router, json } from 'express'
import { AppContext } from '../context'

export const createRouter = (ctx: AppContext): Router => {
  const router = Router()
  router.use(json())

  router.get('/api/v1/oauth/*', async function (req, res) {
    return res.type('application/json').json({ "message": "Hello API v1 world!" })
  })

  return router
}
