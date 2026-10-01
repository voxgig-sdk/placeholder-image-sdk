

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PlaceholderImageSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('PlaceholderEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PLACEHOLDER_IMAGE_TEST_LIVE=TRUE.
  afterEach(liveDelay('PLACEHOLDER_IMAGE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PlaceholderImageSDK.test()
    const ent = testsdk.Placeholder()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PLACEHOLDER_IMAGE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'placeholder.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"placeholder","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /placeholder","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"mountain","k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/placeholder","q":{"exist":["page","q"]},"r":{},"s":[{"lit":"placeholder"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"placeholder","name__orig":"placeholder","Name":"Placeholder","name_":"placeholder","name-":"placeholder","NAME":"PLACEHOLDER","index$":0}, {"active":true,"entity":"placeholder","key$":"BasicPlaceholderFlow","kind":"basic","name":"BasicPlaceholderFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"placeholder_ref01","srcdatavar":"placeholder_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-placeholder_ref01"}}],"index$":0}]}, 'Placeholder', {"GET /placeholder":{"protocol":"http","parameters":[{"name":"q","in":"query","description":"Image keyword (for example: mountain)","required":true,"schema":{"type":"string"},"example":"mountain","index$":0},{"name":"page","in":"query","description":"Pagination page (default 1, minimum 1)","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let placeholder_ref01_data = Object.values(setup.data.existing.placeholder)[0] as any

    // LOAD
    const placeholder_ref01_ent = client.Placeholder()
    const placeholder_ref01_match_dt0: any = {}
    const placeholder_ref01_data_dt0 = (await placeholder_ref01_ent.load(placeholder_ref01_match_dt0)).data()
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

  const env = envOverride({
    'PLACEHOLDER_IMAGE_TEST_PLACEHOLDER_ENTID': idmap,
    'PLACEHOLDER_IMAGE_TEST_LIVE': 'FALSE',
    'PLACEHOLDER_IMAGE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PLACEHOLDER_IMAGE_TEST_PLACEHOLDER_ENTID']

  const live = 'TRUE' === env.PLACEHOLDER_IMAGE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PLACEHOLDER_IMAGE_TEST_PLACEHOLDER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new PlaceholderImageSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
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
    transport,
    now: Date.now(),
  }

  return setup
}
  
