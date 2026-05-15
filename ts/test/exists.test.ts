
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PlaceholderImageSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await PlaceholderImageSDK.test()
    equal(null !== testsdk, true)
  })

})
