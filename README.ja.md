# pambda-serve-static

AWS Lambda 用 serve-static.

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

画像のようなバイナリーファイルを提供する時は、[pambda-binary-support](https://github.com/pambda/pambda-binary-support) と組み合わせる必要がある。

## serveStatic(root, options)

- `root`
    - 静的ファイルが格納されているルートディレクトリのファイルシステム上のパス。
- `options.basePath`
    - 静的ファイルを提供する基点となるパス。
- `options.index`
    - ディレクトリをリクエストされた時に返すファイルのファイル名。
- `options.maxAge`
    - レスポンスのキャッシュが有効な時間を秒単位で指定する。

## License

MIT
