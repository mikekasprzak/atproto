import { InvalidDidError } from '../../src/did-error.js'
import { Did } from '../../src/did.js'
import {
  asDidAPub,
  assertDidAPub,
  //didAPubToUrl,
  isDidAPub,
} from '../../src/methods/apub.js'

const VALID: [Did<'apub'>, string][] = [
  ['did:apub:user:example.com', 'user@example.com'],
  ['did:apub:dot.user:example.com', 'dot.user@example.com'],
]

const INVALID: [value: unknown, message: string][] = [
  ['did:apub:', 'DID method-specific id must not be empty'],
  ['did:apub:foo@example.com', 'Disallowed character in DID at position 12'],
  ['did:apub::example.com', 'did:apub MSID must not start with a colon'],
  ['did:apub:example.com:', 'DID cannot end with ":"'],
  [3, 'DID must be a string'],
  [{ toString: () => 'did:apub:foo.com' }, 'DID must be a string'],
  [[''], 'DID must be a string'],
  ['random-string', 'Invalid did:apub prefix'],
  ['did apub', 'Invalid did:apub prefix'],
  ['lorem ipsum dolor sit', 'Invalid did:apub prefix'],
]

describe('isDidWeb', () => {
  it('returns true for various valid dids', () => {
    for (const [did] of VALID) {
      expect(isDidAPub(did)).toBe(true)
    }
  })

  it('returns false for invalid dids', () => {
    for (const did of INVALID) {
      expect(isDidAPub(did)).toBe(false)
    }
  })
})

describe('assertDidWeb', () => {
  it('does not throw on valid dids', () => {
    for (const [did] of VALID) {
      expect(() => assertDidAPub(did)).not.toThrow()
    }
  })

  it('throws if called with non string argument', () => {
    for (const [val, message] of INVALID) {
      expect(() => assertDidAPub(val)).toThrowError(
        new InvalidDidError(
          typeof val === 'string' ? val : typeof val,
          message,
        ),
      )
    }
  })
})

/*
describe('didAPubToUrl', () => {
  it('converts valid did:apub to URL', () => {
    for (const [did, url] of VALID) {
      expect(didAPubToUrl(did)).toStrictEqual(new URL(url))
    }
  })
})
*/

describe('asDidWeb', () => {
  it('returns the input for valid dids', () => {
    for (const [did] of VALID) {
      expect(asDidAPub(did)).toBe(did)
    }
  })

  it('throws if called with invalid dids', () => {
    for (const [val, message] of INVALID) {
      expect(() => asDidAPub(val)).toThrowError(
        new InvalidDidError(
          typeof val === 'string' ? val : typeof val,
          message,
        ),
      )
    }
  })
})
