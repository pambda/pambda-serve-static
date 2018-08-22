# pambda-serve-static

Serve static files for AWS Lambda.

## Installation

```
npm i pambda-serve-static
```

## Usage

``` javascript
const { compose, createLambda } = require('pambda');
const { binarySupport } = require('pambda-binary-support');
const { cache } = require('pambda-cache');
const { serveStatic } = require('pambda-serve-static');

exports.handler = createLambda(
  compose(
    cache(),
    binarySupport({
      binaryMediaTypes: [ 'image/*' ],
    }),
    serveStatic('public', {
      basePath: '/',
      index: [ 'index.htm', 'index.html' ],
      maxAge: 60 * 60 * 24,
    })
  )
);
```

When serving binary files like images, you need to combine with [pambda-binary-support](https://github.com/pambda/pambda-binary-support).

## serveStatic(root, options)

- `root`
    - The path on the file system of the root directory where static files are stored.
- `options.basePath`
    - The base path that serves static files.
- `options.index`
    - The file name of the file to return when the directory is requested.
- `options.maxAge`
    - Specify the time in seconds for which the response cache is available.

## License

MIT
