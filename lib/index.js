const mime = require('mime-types');
const {
  extname,
  join,
  resolve,
  relative,
} = require('path');
const {
  readFile,
} = require('fs');

const serveStatic = (root, options = {}) => {
  const {
    basePath = '/',
    maxAge = 0,
  } = options;

  let { index = [ 'index.html' ] } = options;

  if (typeof index === 'string') {
    index = [ index ];
  }

  const cacheControl = `public, max-age=${maxAge}`;

  return next => (event, context, callback) => {
    const path = resolve('/', event.path);

    if (!path.startsWith(basePath)) {
      return next(event, context, callback);
    }

    const { httpMethod } = event;

    if (httpMethod !== 'GET' && httpMethod !== 'HEAD') {
      return next(event, context, callback);
    }

    const relpath = relative(basePath, path);
    const file = join(root, relpath);

    serveFile(file, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return next(event, context, callback);
        } else if (err.code === 'EISDIR') {
          return index.length > 0
            ? serveIndex(0, callback)
            : next(event, context, callback);
        }
      }

      callback(err, data);
    });

    function serveFile(file, callback) {
      readFile(file, (err, data) => {
        if (err) {
          return callback(err);
        }

        const ext = extname(path);
        const contentType = mime.contentType(ext) || 'application/octet-stream';

        callback(null, {
          statusCode: 200,
          headers: {
            'Cache-Control': cacheControl,
            'Content-Type': contentType,
          },
          body: data,
        });
      });
    }

    function serveIndex(indexIndex, callback) {
      const indexFile = join(file, index[indexIndex]);

      serveFile(indexFile, (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            return ++indexIndex < index.length
              ? serveIndex(indexIndex, callback)
              : next(event, context, callback);
          }

          return callback(err, null);
        }

        data.headers['Content-Type'] = 'text/html; charset=utf-8';

        callback(null, data);
      });
    }
  };
};

exports.serveStatic = serveStatic;
