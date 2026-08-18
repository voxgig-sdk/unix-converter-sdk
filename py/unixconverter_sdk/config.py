# UnixConverter SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "type": "`$OBJECT`",
          },
          {
            "name": "output",
            "type": "`$OBJECT`",
          },
          {
            "name": "success",
            "type": "`$BOOLEAN`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "example": "YYYY-MM-DD HH:mm:ss",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 1609459200,
                      "kind": "query",
                      "name": "timestamp",
                      "orig": "timestamp",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "America/New_York",
                      "kind": "query",
                      "name": "timezone",
                      "orig": "timezone",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
