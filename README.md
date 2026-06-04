# PlaceholderImage SDK

Fetch keyword-based placeholder images as binary downloads or plain-text URLs

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Placeholder Image API

The Placeholder Image API is a small image-lookup service exposed by [Sodeom](https://sodeom.com), a privacy-focused search engine. Given a keyword, it returns a downloadable placeholder image (or a plain-text URL pointing to one) suitable for filling in mockups, demos, and content scaffolding.

What you get from the API:

- `GET /placeholder` returns a binary image matching a keyword.
- `GET /placeholder/url` returns the same image as a plain-text URL.
- A `q` query parameter (e.g. `?q=mountain`) drives the image selection, and an optional `page` parameter paginates results.
- A fallback image is served when no match is found, and a help page is rendered when `q` is omitted.

Operational notes: CORS is enabled, requests use HTTP `GET` only, and responses can be slow (average response time around 5 seconds in community measurements). Results are cached server-side under a `placeholders/` directory keyed by SHA1 hash, so repeated queries for the same keyword are served from cache.

## Try it

**TypeScript**
```bash
npm install placeholder-image
```

**Python**
```bash
pip install placeholder-image-sdk
```

**PHP**
```bash
composer require voxgig/placeholder-image-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/placeholder-image-sdk/go
```

**Ruby**
```bash
gem install placeholder-image-sdk
```

**Lua**
```bash
luarocks install placeholder-image-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { PlaceholderImageSDK } from 'placeholder-image'

const client = new PlaceholderImageSDK({})

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
cd go-mcp && go build -o placeholder-image-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "placeholder-image": {
      "command": "/abs/path/to/placeholder-image-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Placeholder** | A keyword-driven placeholder image lookup, exposed via `GET /placeholder` (binary image) and `GET /placeholder/url` (plain-text URL). | `/placeholder` |
| **PlaceholderImage** | The image resource itself, selected by the `q` keyword parameter and optionally paged via `page`. | `/placeholder/url` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from placeholderimage_sdk import PlaceholderImageSDK

client = PlaceholderImageSDK({})


# Load a specific placeholder
placeholder, err = client.Placeholder(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'placeholderimage_sdk.php';

$client = new PlaceholderImageSDK([]);


// Load a specific placeholder
[$placeholder, $err] = $client->Placeholder(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/placeholder-image-sdk/go"

client := sdk.NewPlaceholderImageSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "PlaceholderImage_sdk"

client = PlaceholderImageSDK.new({})


# Load a specific placeholder
placeholder, err = client.Placeholder(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("placeholder-image_sdk")

local client = sdk.new({})


-- Load a specific placeholder
local placeholder, err = client:Placeholder(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = PlaceholderImageSDK.test()
const result = await client.Placeholder().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = PlaceholderImageSDK.test(None, None)
result, err = client.Placeholder(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = PlaceholderImageSDK::test(null, null);
[$result, $err] = $client->Placeholder(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Placeholder(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = PlaceholderImageSDK.test(nil, nil)
result, err = client.Placeholder(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Placeholder(nil):load(
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

## Using the Placeholder Image API

- Upstream: [https://sodeom.com](https://sodeom.com)
- API docs: [https://sodeom.com/apis/placeholder](https://sodeom.com/apis/placeholder)

---

Generated from the Placeholder Image API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
