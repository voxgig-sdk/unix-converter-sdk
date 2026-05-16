
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UnixConverterSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await UnixConverterSDK.test()
    equal(null !== testsdk, true)
  })

})
