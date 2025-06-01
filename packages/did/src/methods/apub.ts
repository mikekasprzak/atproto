import { InvalidDidError } from '../did-error.js'
import { Did, assertDidMsid } from '../did.js'

export const DID_APUB_PREFIX = `did:apub:` satisfies Did<'apub'>

/**
 * This function checks if the input is a valid ActivtyPub DID, as per DID spec.
 */
export function isDidAPub(input: unknown): input is Did<'apub'> {
  // Optimization: make cheap checks first
  if (typeof input !== 'string') return false
  if (!input.startsWith(DID_APUB_PREFIX)) return false
  if (input.charAt(DID_APUB_PREFIX.length) === ':') return false

  try {
    didAPubToUrl(input as Did<'apub'>)
    return true
  } catch {
    return false
  }
}

export function asDidAPub(input: unknown): Did<'apub'> {
  assertDidAPub(input)
  return input
}

export function assertDidAPub(input: unknown): asserts input is Did<'apub'> {
  if (typeof input !== 'string') {
    throw new InvalidDidError(typeof input, `DID must be a string`)
  }

  if (!input.startsWith(DID_APUB_PREFIX)) {
    throw new InvalidDidError(input, `Invalid did:apub prefix`)
  }

  if (input.charAt(DID_APUB_PREFIX.length) === ':') {
    throw new InvalidDidError(
      input,
      'did:apub MSID must not start with a colon',
    )
  }

  void didAPubToUrl(input as Did<'apub'>)
}

export function didAPubToUrl(did: Did<'apub'>) {
  // Make sure every char is valid (per DID spec)
  assertDidMsid(did, DID_APUB_PREFIX.length)

  const actorIdx = DID_APUB_PREFIX.length
  const hostIdx = did.indexOf(':', actorIdx)

  const actor =
    hostIdx === -1 ? did.slice(actorIdx) : did.slice(actorIdx, hostIdx)
  const host = hostIdx === -1 ? '' : did.slice(hostIdx)

  const pubAccount = `${actor}@${host}`

  // TODO: only a single : should be allowed

  try {
    // TODO: a better job of validating actor names
    if (!actor.length) {
      throw 'Invalid Actor'
    }

    /*const url =*/ new URL(
      `https://${actor.replaceAll('%3A', ':')}${host.replaceAll(':', '/')}`,
    ) as URL & { protocol: 'http:' | 'https:' }
    /*if (url.hostname === 'localhost') {
      url.protocol = 'http:'
    }*/
    return pubAccount
  } catch (cause) {
    throw new InvalidDidError(did, 'Invalid ActivityPub DID', cause)
  }
}
