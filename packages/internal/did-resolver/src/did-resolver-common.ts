import { DidResolverBase } from './did-resolver-base.js'
import { DidAPubMethod, DidAPubMethodOptions } from './methods/apub.js'
import { DidPlcMethod, DidPlcMethodOptions } from './methods/plc.js'
import { DidWebMethod, DidWebMethodOptions } from './methods/web.js'
import { Simplify } from './util.js'

export type DidResolverCommonOptions = Simplify<
  DidPlcMethodOptions & DidWebMethodOptions & DidAPubMethodOptions
>

export class DidResolverCommon
  extends DidResolverBase<'plc' | 'web' | 'apub'>
  implements DidResolverBase<'plc' | 'web' | 'apub'>
{
  constructor(options?: DidResolverCommonOptions) {
    super({
      plc: new DidPlcMethod(options),
      web: new DidWebMethod(options),
      apub: new DidAPubMethod(options),
    })
  }
}
