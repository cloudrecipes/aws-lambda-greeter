const {greeter} = require('./lib')

exports.main = (data, services) => Promise.resolve(greeter.hello(data.name))
