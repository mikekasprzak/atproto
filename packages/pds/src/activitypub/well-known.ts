import { Router } from 'express'
import { AppContext } from '../context'
import { routePrefix } from './server'

export const createRouter = (ctx: AppContext): Router => {
  const router = Router()

  router.get('/.well-known/webfinger', async function (req, res) {
    // TODO: extract resource from query params

    /*
    const handle = req.hostname
    const supportedHandle = ctx.cfg.identity.serviceHandleDomains.some(
      (host) => handle.endsWith(host) || handle === host.slice(1),
    )
    if (!supportedHandle) {
      return res.status(404).send('User not found')
    }
    */

    // acct:user@handle.com



    if (typeof req.query.resource !== "string" || req.query.resource.slice(0, 5) !== 'acct:') {
      return res.type('application/json').status(400).send(['Bad request'])
    }

    const subject = req.query.resource

    const domPrefix = `${req.protocol}://${req.hostname}`


    // TODO: confirm this is a valid account resource
    const handle = subject.slice(5)
    const parts = handle.split('@')
    const actor = parts[0]
    const repo = parts[1]

    // TODO: confirm repo exists

    return res.type('application/json').send({
      subject: subject,
      links: [
        {
          rel: 'self',
          type: 'application/activity+json',
          href: `${domPrefix}${routePrefix}/${actor}`,
        },
      ],
      //query: req.query,
    });

    /*
    const handle = req.hostname
    const supportedHandle = ctx.cfg.identity.serviceHandleDomains.some(
      (host) => handle.endsWith(host) || handle === host.slice(1),
    )
    if (!supportedHandle) {
      return res.status(404).send('User not found')
    }
    let did: string | undefined
    try {
      const user = await ctx.accountManager.getAccount(handle)
      did = user?.did
    } catch (err) {
      return res.status(500).send('Internal Server Error')
    }
    if (!did) {
      return res.status(404).send('User not found')
    }
    res.type('text/plain').send(did)
    */
  })

  return router
}
