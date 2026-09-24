
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PlaceholderImageSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = PlaceholderImageSDK.test()
    equal(testsdk instanceof PlaceholderImageSDK, true,
      'PlaceholderImageSDK.test() must return a client synchronously')
  })

})
