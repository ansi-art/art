@ansi-art/art
=============

The rebuild of ascii-art as a from-source executable (browser + server) in ESM which builds in CommonJS and UMD, for backward compatibility. In addition it includes WebComponent definitions for `ansi-image`, `ansi-text`, `ansi-table`, and `ansi-layout`

It remains build compatible, for those who need that.

Requirements
------------

TBD

Usage
-----

TBD

Roadmap
-------

- [X] - rebuilt fluent API
- [X] - font support
- [ ] - style support
- [ ] - image support
- [ ] - table support
- [ ] - composite support

</span>

Testing
-------

Run the es module tests to test the root modules
```bash
npm run import-test
```
to run the same test inside the browser:

```bash
npm run browser-test
```
to run the same test headless in chrome:
```bash
npm run headless-browser-test
```

to run the same test inside docker:
```bash
npm run container-test
```

Run the commonjs tests against the `/dist` commonjs source (generated with the `build-commonjs` target).
```bash
npm run require-test
```

Development
-----------
All work is done in the .mjs files and will be transpiled on commit to commonjs and tested.

If the above tests pass, then attempt a commit which will generate .d.ts files alongside the `src` files and commonjs classes in `dist`

