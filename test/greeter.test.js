const test = require('ava')
const td = require('testdouble')
const {greeter} = require('../lib')

test.afterEach(t => td.reset()) // eslint-disable-line no-unused-vars

test('greeter should greet', t => {
  t.is(greeter.hello('tester'), 'Hello tester!')
})

test.cb('delayed greet', t => {
  // plan how many assertion there are in the test
  t.plan(2)

  greeter.delayedHello('tester2', 30, (err, greeting) => {
    t.ifError(err)
    t.is(greeting, 'Hello tester2!')
    t.end()
  })
})

test('promised greeter', async t => {
  const greeting = await greeter.promisedHello('tester3', 30)
  t.is(greeting, 'Hello tester3!')
})

test.serial('promised greeter error case', async t => {
  const delayedHello = td.function('delayedHello')

  td.when(delayedHello('tester error', 30)).thenCallback(new Error('Test'))
  td.replace(greeter, 'delayedHello', delayedHello)

  const err = await t.throws(greeter.promisedHello('tester error', 30))
  t.is(err.message, 'Test')
})
