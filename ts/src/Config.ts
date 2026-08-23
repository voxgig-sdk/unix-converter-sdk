
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'UnixConverter',
        slug: "unix-converter",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://unixonvert.api/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      conversion: {
      },

    }
  }


  entity = {
    "conversion": {
      "fields": [
        {
          "name": "input",
          "type": "`$OBJECT`"
        },
        {
          "name": "output",
          "type": "`$OBJECT`"
        },
        {
          "name": "success",
          "type": "`$BOOLEAN`"
        }
      ],
      "name": "conversion",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "2021-01-01T00:00:00Z",
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "YYYY-MM-DD HH:mm:ss",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1609459200,
                    "kind": "query",
                    "name": "timestamp",
                    "orig": "timestamp",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "America/New_York",
                    "kind": "query",
                    "name": "timezone",
                    "orig": "timezone",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/convert",
              "parts": [
                "convert"
              ],
              "select": {
                "exist": [
                  "date",
                  "format",
                  "timestamp",
                  "timezone"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

