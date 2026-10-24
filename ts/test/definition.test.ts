import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "placeholder",
    "accessor": "Placeholder",
    "op": "load",
    "method": "GET",
    "path": "/placeholder",
    "args": [],
    "select": {
      "q": "mountain",
      "page": 1
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "image/*",
      "text/html"
    ],
    "query": [
      "q",
      "page"
    ],
    "queryArgs": [
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "q",
        "wire": "q"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "placeholder_image",
    "accessor": "PlaceholderImage",
    "op": "load",
    "method": "GET",
    "path": "/placeholder/url",
    "args": [],
    "select": {
      "q": "mountain",
      "page": 1
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "text/plain"
    ],
    "query": [
      "q",
      "page"
    ],
    "queryArgs": [
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "q",
        "wire": "q"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
