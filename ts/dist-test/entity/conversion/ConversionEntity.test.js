"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ConversionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when UNIX_CONVERTER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('UNIX_CONVERTER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.UnixConverterSDK.test();
        const ent = testsdk.Conversion();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.UNIX_CONVERTER_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'conversion.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "input", "req": false, "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "output", "req": false, "type": "`$OBJECT`", "index$": 1 }, { "active": true, "name": "success", "req": false, "type": "`$BOOLEAN`", "index$": 2 }], "name": "conversion", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "2021-01-01T00:00:00Z", "kind": "query", "name": "date", "orig": "date", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "YYYY-MM-DD HH:mm:ss", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": 1609459200, "kind": "query", "name": "timestamp", "orig": "timestamp", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "example": "America/New_York", "kind": "query", "name": "timezone", "orig": "timezone", "reqd": false, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /convert", "json": "{\"operationId\":\"convertTimestamp\",\"parameters\":[{\"description\":\"Unix timestamp to convert to human-readable format (in seconds or milliseconds)\",\"in\":\"query\",\"name\":\"timestamp\",\"required\":false,\"schema\":{\"example\":1609459200,\"format\":\"int64\",\"type\":\"integer\"}},{\"description\":\"Human-readable date string to convert to Unix timestamp (ISO 8601 format recommended)\",\"in\":\"query\",\"name\":\"date\",\"required\":false,\"schema\":{\"example\":\"2021-01-01T00:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Timezone for the conversion (e.g., 'UTC', 'America/New_York', 'Europe/London')\",\"in\":\"query\",\"name\":\"timezone\",\"required\":false,\"schema\":{\"default\":\"UTC\",\"example\":\"America/New_York\",\"type\":\"string\"}},{\"description\":\"Output date format string (e.g., 'YYYY-MM-DD', 'DD/MM/YYYY HH:mm:ss')\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"example\":\"YYYY-MM-DD HH:mm:ss\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"dateToTimestamp\":{\"summary\":\"Convert date to Unix timestamp\",\"value\":{\"input\":{\"date\":\"2021-01-01T00:00:00Z\",\"timezone\":\"UTC\"},\"output\":{\"formatted_date\":\"2021-01-01 00:00:00\",\"iso_8601\":\"2021-01-01T00:00:00Z\",\"timestamp\":1609459200,\"timezone\":\"UTC\"},\"success\":true}},\"timestampToDate\":{\"summary\":\"Convert Unix timestamp to date\",\"value\":{\"input\":{\"timestamp\":1609459200,\"timezone\":\"UTC\"},\"output\":{\"formatted_date\":\"2021-01-01 00:00:00\",\"iso_8601\":\"2021-01-01T00:00:00Z\",\"timestamp\":1609459200,\"timezone\":\"UTC\"},\"success\":true}}},\"schema\":{\"properties\":{\"input\":{\"properties\":{\"date\":{\"example\":\"2021-01-01T00:00:00Z\",\"type\":\"string\"},\"timestamp\":{\"example\":1609459200,\"format\":\"int64\",\"type\":\"integer\"},\"timezone\":{\"example\":\"UTC\",\"type\":\"string\"}},\"type\":\"object\"},\"output\":{\"properties\":{\"formatted_date\":{\"description\":\"Human-readable formatted date\",\"example\":\"2021-01-01 00:00:00\",\"type\":\"string\"},\"iso_8601\":{\"description\":\"ISO 8601 formatted date\",\"example\":\"2021-01-01T00:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"timestamp\":{\"description\":\"Unix timestamp in seconds\",\"example\":1609459200,\"format\":\"int64\",\"type\":\"integer\"},\"timezone\":{\"example\":\"UTC\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful conversion\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Invalid timestamp or date format provided\",\"type\":\"string\"},\"message\":{\"example\":\"Please provide either a valid Unix timestamp or a date string\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Internal server error\",\"type\":\"string\"},\"message\":{\"example\":\"An error occurred while processing the conversion\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/convert", "segments": [{ "lit": "convert" }], "select": { "exist": ["date", "format", "timestamp", "timezone"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "conversion", "name__orig": "conversion", "Name": "Conversion", "name_": "conversion", "name-": "conversion", "NAME": "CONVERSION", "index$": 0 }, { "active": true, "entity": "conversion", "key$": "BasicConversionFlow", "kind": "basic", "name": "BasicConversionFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "conversion_ref01", "srcdatavar": "conversion_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-conversion_ref01" } }], "index$": 0 }] }, 'Conversion');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let conversion_ref01_data = Object.values(setup.data.existing.conversion)[0];
        // LOAD
        const conversion_ref01_ent = client.Conversion();
        const conversion_ref01_match_dt0 = {};
        const conversion_ref01_data_dt0 = (await conversion_ref01_ent.load(conversion_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != conversion_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/conversion/ConversionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.UnixConverterSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['conversion01', 'conversion02', 'conversion03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'UNIX_CONVERTER_TEST_CONVERSION_ENTID': idmap,
        'UNIX_CONVERTER_TEST_LIVE': 'FALSE',
        'UNIX_CONVERTER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['UNIX_CONVERTER_TEST_CONVERSION_ENTID'];
    const live = 'TRUE' === env.UNIX_CONVERTER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['UNIX_CONVERTER_TEST_CONVERSION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.UnixConverterSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=ConversionEntity.test.js.map