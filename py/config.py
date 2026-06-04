# UnixConverter SDK configuration


def make_config():
    return {
        "main": {
            "name": "UnixConverter",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://unixonvert.api/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "conversion": {},
            },
        },
        "entity": {
      "conversion": {
        "fields": [
          {
            "name": "input",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "output",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "success",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 2,
          },
        ],
        "name": "conversion",
        "op": {
          "load": {
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
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "YYYY-MM-DD HH:mm:ss",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": 1609459200,
                      "kind": "query",
                      "name": "timestamp",
                      "orig": "timestamp",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "example": "America/New_York",
                      "kind": "query",
                      "name": "timezone",
                      "orig": "timezone",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/convert",
                "parts": [
                  "convert",
                ],
                "select": {
                  "exist": [
                    "date",
                    "format",
                    "timestamp",
                    "timezone",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
