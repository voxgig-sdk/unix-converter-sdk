

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { UnixConverterSDK, BaseFeature, stdutil } from '../../..'

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


describe('ConversionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when UNIX_CONVERTER_TEST_LIVE=TRUE.
  afterEach(liveDelay('UNIX_CONVERTER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UnixConverterSDK.test()
    const ent = testsdk.Conversion()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.UNIX_CONVERTER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'conversion.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"input","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"output","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"name":"success","req":false,"type":"`$BOOLEAN`","index$":2}],"name":"conversion","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"2021-01-01T00:00:00Z","kind":"query","name":"date","orig":"date","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"YYYY-MM-DD HH:mm:ss","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":1609459200,"kind":"query","name":"timestamp","orig":"timestamp","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"example":"America/New_York","kind":"query","name":"timezone","orig":"timezone","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /convert","json":"{\"operationId\":\"convertTimestamp\",\"parameters\":[{\"description\":\"Unix timestamp to convert to human-readable format (in seconds or milliseconds)\",\"in\":\"query\",\"name\":\"timestamp\",\"required\":false,\"schema\":{\"example\":1609459200,\"format\":\"int64\",\"type\":\"integer\"}},{\"description\":\"Human-readable date string to convert to Unix timestamp (ISO 8601 format recommended)\",\"in\":\"query\",\"name\":\"date\",\"required\":false,\"schema\":{\"example\":\"2021-01-01T00:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Timezone for the conversion (e.g., 'UTC', 'America/New_York', 'Europe/London')\",\"in\":\"query\",\"name\":\"timezone\",\"required\":false,\"schema\":{\"default\":\"UTC\",\"example\":\"America/New_York\",\"type\":\"string\"}},{\"description\":\"Output date format string (e.g., 'YYYY-MM-DD', 'DD/MM/YYYY HH:mm:ss')\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"example\":\"YYYY-MM-DD HH:mm:ss\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"dateToTimestamp\":{\"summary\":\"Convert date to Unix timestamp\",\"value\":{\"input\":{\"date\":\"2021-01-01T00:00:00Z\",\"timezone\":\"UTC\"},\"output\":{\"formatted_date\":\"2021-01-01 00:00:00\",\"iso_8601\":\"2021-01-01T00:00:00Z\",\"timestamp\":1609459200,\"timezone\":\"UTC\"},\"success\":true}},\"timestampToDate\":{\"summary\":\"Convert Unix timestamp to date\",\"value\":{\"input\":{\"timestamp\":1609459200,\"timezone\":\"UTC\"},\"output\":{\"formatted_date\":\"2021-01-01 00:00:00\",\"iso_8601\":\"2021-01-01T00:00:00Z\",\"timestamp\":1609459200,\"timezone\":\"UTC\"},\"success\":true}}},\"schema\":{\"properties\":{\"input\":{\"properties\":{\"date\":{\"example\":\"2021-01-01T00:00:00Z\",\"type\":\"string\"},\"timestamp\":{\"example\":1609459200,\"format\":\"int64\",\"type\":\"integer\"},\"timezone\":{\"example\":\"UTC\",\"type\":\"string\"}},\"type\":\"object\"},\"output\":{\"properties\":{\"formatted_date\":{\"description\":\"Human-readable formatted date\",\"example\":\"2021-01-01 00:00:00\",\"type\":\"string\"},\"iso_8601\":{\"description\":\"ISO 8601 formatted date\",\"example\":\"2021-01-01T00:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"timestamp\":{\"description\":\"Unix timestamp in seconds\",\"example\":1609459200,\"format\":\"int64\",\"type\":\"integer\"},\"timezone\":{\"example\":\"UTC\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful conversion\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Invalid timestamp or date format provided\",\"type\":\"string\"},\"message\":{\"example\":\"Please provide either a valid Unix timestamp or a date string\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Internal server error\",\"type\":\"string\"},\"message\":{\"example\":\"An error occurred while processing the conversion\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/convert","segments":[{"lit":"convert"}],"select":{"exist":["date","format","timestamp","timezone"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"conversion","name__orig":"conversion","Name":"Conversion","name_":"conversion","name-":"conversion","NAME":"CONVERSION","index$":0}, {"active":true,"entity":"conversion","key$":"BasicConversionFlow","kind":"basic","name":"BasicConversionFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"conversion_ref01","srcdatavar":"conversion_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-conversion_ref01"}}],"index$":0}]}, 'Conversion')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let conversion_ref01_data = Object.values(setup.data.existing.conversion)[0] as any

    // LOAD
    const conversion_ref01_ent = client.Conversion()
    const conversion_ref01_match_dt0: any = {}
    const conversion_ref01_data_dt0 = (await conversion_ref01_ent.load(conversion_ref01_match_dt0)).data()
    assert(null != conversion_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/conversion/ConversionTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = UnixConverterSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['conversion01','conversion02','conversion03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'UNIX_CONVERTER_TEST_CONVERSION_ENTID': idmap,
    'UNIX_CONVERTER_TEST_LIVE': 'FALSE',
    'UNIX_CONVERTER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['UNIX_CONVERTER_TEST_CONVERSION_ENTID']

  const live = 'TRUE' === env.UNIX_CONVERTER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['UNIX_CONVERTER_TEST_CONVERSION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new UnixConverterSDK(merge([
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
    explain: 'TRUE' === env.UNIX_CONVERTER_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
