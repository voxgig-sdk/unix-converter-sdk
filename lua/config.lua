-- UnixConverter SDK configuration

local function make_config()
  return {
    main = {
      name = "UnixConverter",
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
            ["active"] = true,
            ["name"] = "input",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "output",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "success",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 2,
          },
        },
        ["name"] = "conversion",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = "2021-01-01T00:00:00Z",
                      ["kind"] = "query",
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "YYYY-MM-DD HH:mm:ss",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = 1609459200,
                      ["kind"] = "query",
                      ["name"] = "timestamp",
                      ["orig"] = "timestamp",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "America/New_York",
                      ["kind"] = "query",
                      ["name"] = "timezone",
                      ["orig"] = "timezone",
                      ["reqd"] = false,
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
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
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
