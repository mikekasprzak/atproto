# Federation

## Supported federation protocols and standards

- [ActivityPub](https://www.w3.org/TR/activitypub/) (Server-to-Server)
- [WebFinger](https://webfinger.net/)
- ...

## Supported FEPs

- [FEP-ef61: Portable Objects](https://codeberg.org/fediverse/fep/src/branch/main/fep/ef61/fep-ef61.md)
  - DONE: `DID:KEY` identifiers, Actor URIs
  - WIP: `apgateway` request tunnelling, `apgateway` image URI tunneling
  - ref: `"canonical"`


## Non-standard extensions

- [AT Protocol DID's as Multidid keys](#extension-at-protocol-dids-as-multidid-keys)
- [AT Protocol WebFinger aliases](#extension-at-protocol-webfinger-aliases)


## ActivityPub

<!-- Describe activities and extensions. -->


### Extension: AT Protocol DID's as Multidid keys

AT Protocol DID's and FEP ef61 DID's are not directly compatible. That said, the novel `Multidid` spec
provides a way to encode an arbitrary DID for use in a `did:key`.

- [Multidid](https://github.com/ChainAgnostic/multidid)

Our implementation uses the `@didtools/multidid` package to convert native AT Protocol DID's into `Multidid`,
as Base58 encoded strings (similar to the Multikey recommendation in FEP-ef61).

- [@didtools/multidid](https://did.js.org/docs/api/modules/didtools_multidid/)

TODO: Should we insert an `at:` or other binary prefix to identify the key as an AT Protocol DID?


## WebFinger

<!-- Describe -->


### Extension: AT Protocol WebFinger aliases

As a "toy" extension, I've included AT Protocol aliases in WebFinger responses. These aliases include the
actor's AT Protocol handle, DID, and a fully qualified AT Protocol URI for fetching the actor.

Also included is a link referencing the AT Protocol actor URI classified as ref: `"alternative"`.


## Additional documentation

Generally speaking, our implementation mirrors the structure of Bluesky's AT Protocol. For more details:

- [AT Protocol](https://atproto.com/specs/atp)
