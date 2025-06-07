
export const genDomainPrefix = (ctx, req) =>
    `${req.protocol}://${req.hostname}${ctx.cfg.service.devMode && ctx.cfg.service.port ? ':' + ctx.cfg.service.port : ''}`

export const inferPubHandle = (ctx, hostname: string, handle: string, actor?: string) =>
    actor && !actor.startsWith('did:')
      ? `${actor}@${handle.substring(actor.length + 1)}`
      : handle !== ctx.cfg.service.hostname &&
          handle.endsWith(ctx.cfg.service.hostname)
        ? `${handle.substring(0, handle.length - ctx.cfg.service.hostname.length - 1)}@${ctx.cfg.service.hostname}`
        : ctx.cfg.service.hostnameRoot &&
            handle !== ctx.cfg.service.hostnameRoot &&
            handle.endsWith(ctx.cfg.service.hostnameRoot)
          ? `${handle.substring(0, handle.length - ctx.cfg.service.hostnameRoot.length - 1)}@${ctx.cfg.service.hostnameRoot}`
          : handle !== hostname && handle.endsWith(hostname)
            ? `${handle.substring(0, handle.length - hostname.length - 1)}@${hostname}`
            : `${handle}@${hostname}`
