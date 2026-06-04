# UnixConverter SDK

Convert between Unix timestamps and human-readable dates

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Unix Converter API

Unix Converter API is a small utility service for translating between Unix epoch timestamps and human-readable date/time representations. It is catalogued on [Free Public APIs](https://freepublicapis.com/unix-converter-api).

What you get from the API:

- Conversion between Unix time values and formatted date strings
- Helpers for timestamp conversion, timezone adjustments, and date formatting

Operational notes: the catalogue page reports CORS enabled and a sub-second average response time. No authentication scheme, licence, or rate-limit policy is documented on the catalogue page, so callers should treat behaviour as best-effort.

## Try it

**TypeScript**
```bash
npm install unix-converter
```

**Python**
```bash
pip install unix-converter-sdk
```

**PHP**
```bash
composer require voxgig/unix-converter-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/unix-converter-sdk/go
```

**Ruby**
```bash
gem install unix-converter-sdk
```

**Lua**
```bash
luarocks install unix-converter-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { UnixConverterSDK } from 'unix-converter'

const client = new UnixConverterSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o unix-converter-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "unix-converter": {
      "command": "/abs/path/to/unix-converter-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Conversion** | Operations that convert a value between a Unix epoch timestamp and a formatted date/time string. | `/convert` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from unixconverter_sdk import UnixConverterSDK

client = UnixConverterSDK({})


# Load a specific conversion
conversion, err = client.Conversion(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'unixconverter_sdk.php';

$client = new UnixConverterSDK([]);


// Load a specific conversion
[$conversion, $err] = $client->Conversion(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/unix-converter-sdk/go"

client := sdk.NewUnixConverterSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "UnixConverter_sdk"

client = UnixConverterSDK.new({})


# Load a specific conversion
conversion, err = client.Conversion(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("unix-converter_sdk")

local client = sdk.new({})


-- Load a specific conversion
local conversion, err = client:Conversion(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = UnixConverterSDK.test()
const result = await client.Conversion().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = UnixConverterSDK.test(None, None)
result, err = client.Conversion(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = UnixConverterSDK::test(null, null);
[$result, $err] = $client->Conversion(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Conversion(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = UnixConverterSDK.test(nil, nil)
result, err = client.Conversion(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Conversion(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Unix Converter API

- API docs: [https://freepublicapis.com/unix-converter-api](https://freepublicapis.com/unix-converter-api)

---

Generated from the Unix Converter API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
