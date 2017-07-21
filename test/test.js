const test = require('tape');
const { serveStatic } = require('..');

test('test', t => {
  t.plan(3);

  const pambda = serveStatic(__dirname + '/public', {
    basePath: '/',
    index: [ 'index.htm', 'index.html' ],
    maxAge: 60 * 60 * 24,
  });

  const lambda = pambda((event, context, callback) => {
    callback(null, new Error('`next` must not be called'));
  });

  lambda({ httpMethod: 'GET', path: '/' }, {}, (err, result) => {
    t.error(err);

    t.equal(typeof(result), 'object');
    t.equal(result.statusCode, 200);
  });
});
