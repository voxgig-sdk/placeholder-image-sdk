
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { PlaceholderImageSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('PlaceholderEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PLACEHOLDERIMAGE_TEST_LIVE=TRUE.
  afterEach(liveDelay('PLACEHOLDERIMAGE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PlaceholderImageSDK.test()
    const ent = testsdk.Placeholder()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PLACEHOLDER_IMAGE_TEST_LIVE
    for (const op of ['load']) {
      if (maybeSkipControl(t, 'entityOp', 'placeholder.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set PLACEHOLDER_IMAGE_TEST_PLACEHOLDER_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let placeholder_ref01_data = Object.values(setup.data.existing.placeholder)[0] as any

    // LOAD
    const placeholder_ref01_ent = client.Placeholder()
    const placeholder_ref01_match_dt0: any = {}
    const placeholder_ref01_data_dt0 = await placeholder_ref01_ent.load(placeholder_ref01_match_dt0)
    assert(null != placeholder_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/placeholder/PlaceholderTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = PlaceholderImageSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['placeholder01','placeholder02','placeholder03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['PLACEHOLDER_IMAGE_TEST_PLACEHOLDER_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'PLACEHOLDER_IMAGE_TEST_PLACEHOLDER_ENTID': idmap,
    'PLACEHOLDER_IMAGE_TEST_LIVE': 'FALSE',
    'PLACEHOLDER_IMAGE_TEST_EXPLAIN': 'FALSE',
    'PLACEHOLDER_IMAGE_APIKEY': 'NONE',
  })

  idmap = env['PLACEHOLDER_IMAGE_TEST_PLACEHOLDER_ENTID']

  const live = 'TRUE' === env.PLACEHOLDER_IMAGE_TEST_LIVE

  if (live) {
    client = new PlaceholderImageSDK(merge([
      {
        apikey: env.PLACEHOLDER_IMAGE_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.PLACEHOLDER_IMAGE_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
