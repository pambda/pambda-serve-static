# pambda-serve-static

Serve static files for AWS Lambda.

## Installation

```
npm i pambda-serve-static -S
```

## Usage

``` javascript
import { compose, createLambda } from 'pambda';
import { binarySupport } from 'pambda-binary-support';
import { cache } from 'pambda-cache';
import { serveStatic } from 'pambda-serve-static';

export const handler = createLambda(
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

## serveStatic(root, options)

- `root`
- `options.basePath`
- `options.index`
- `options.maxAge`

## License

MIT
