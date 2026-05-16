package = "voxgig-sdk-unix-converter"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/unix-converter-sdk.git"
}
description = {
  summary = "UnixConverter SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["unix-converter_sdk"] = "unix-converter_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
