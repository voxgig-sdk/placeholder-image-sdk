

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('PlaceholderImageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PLACEHOLDER_IMAGE_TEST_LIVE=TRUE.
  afterEach(liveDelay('PLACEHOLDER_IMAGE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PlaceholderImageSDK.test()
    const ent = testsdk.PlaceholderImage()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PLACEHOLDER_IMAGE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'placeholder_image.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"placeholder_image","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":"mountain","kind":"query","name":"q","orig":"q","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /placeholder/url","json":"{\"operationId\":\"getPlaceholderImageUrl\",\"parameters\":[{\"description\":\"Image keyword (for example: mountain)\",\"example\":\"mountain\",\"in\":\"query\",\"name\":\"q\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Pagination page (default 1, minimum 1)\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/plain\":{\"example\":\"https://example.com/images/mountain.jpg\",\"schema\":{\"format\":\"uri\",\"type\":\"string\"}}},\"description\":\"Plain text image URL\"},\"404\":{\"description\":\"No image found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/placeholder/url","segments":[{"lit":"placeholder"},{"lit":"url"}],"select":{"exist":["page","q"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"placeholder_image","name__orig":"placeholder_image","Name":"PlaceholderImage","name_":"placeholder_image","name-":"placeholder-image","NAME":"PLACEHOLDER_IMAGE","index$":1}, {"active":true,"entity":"placeholder_image","key$":"BasicPlaceholderImageFlow","kind":"basic","name":"BasicPlaceholderImageFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"placeholder_image_ref01","srcdatavar":"placeholder_image_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-placeholder_image_ref01"}}],"index$":0}]}, 'PlaceholderImage')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let placeholder_image_ref01_data = Object.values(setup.data.existing.placeholder_image)[0] as any

    // LOAD
    const placeholder_image_ref01_ent = client.PlaceholderImage()
    const placeholder_image_ref01_match_dt0: any = {}
    const placeholder_image_ref01_data_dt0 = (await placeholder_image_ref01_ent.load(placeholder_image_ref01_match_dt0)).data()
    assert(null != placeholder_image_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/placeholder_image/PlaceholderImageTestData.json')

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
    ['placeholder_image01','placeholder_image02','placeholder_image03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PLACEHOLDER_IMAGE_TEST_PLACEHOLDER_IMAGE_ENTID': idmap,
    'PLACEHOLDER_IMAGE_TEST_LIVE': 'FALSE',
    'PLACEHOLDER_IMAGE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PLACEHOLDER_IMAGE_TEST_PLACEHOLDER_IMAGE_ENTID']

  const live = 'TRUE' === env.PLACEHOLDER_IMAGE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PLACEHOLDER_IMAGE_TEST_PLACEHOLDER_IMAGE_ENTID']
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
  
