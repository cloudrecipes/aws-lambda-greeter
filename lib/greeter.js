exports.hello = who => `Hello ${who}!`

exports.delayedHello = (who, delayMs, cb) => {
  setTimeout(() => cb(null, exports.hello(who)), delayMs)
}

exports.promisedHello = (who, delayMs) =>
  new Promise((resolve, reject) => {
    exports.delayedHello(who, delayMs, (err, greeting) => (err ? reject(err) : resolve(greeting)))
  })
