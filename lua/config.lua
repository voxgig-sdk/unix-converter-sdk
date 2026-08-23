-- UnixConverter SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "UnixConverter",
      slug = "unix-converter",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://unixonvert.api/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["conversion"] = {},
      },
    },
    entity = {
      ["conversion"] = {
        ["fields"] = {
          {
            ["name"] = "input",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "output",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "success",
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["name"] = "conversion",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "2021-01-01T00:00:00Z",
                      ["kind"] = "query",
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "YYYY-MM-DD HH:mm:ss",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 1609459200,
                      ["kind"] = "query",
                      ["name"] = "timestamp",
                      ["orig"] = "timestamp",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "America/New_York",
                      ["kind"] = "query",
                      ["name"] = "timezone",
                      ["orig"] = "timezone",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/convert",
                ["parts"] = {
                  "convert",
                },
                ["select"] = {
                  ["exist"] = {
                    "date",
                    "format",
                    "timestamp",
                    "timezone",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
