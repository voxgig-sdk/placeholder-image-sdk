package = "voxgig-sdk-placeholder-image"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/placeholder-image-sdk.git"
}
description = {
  summary = "PlaceholderImage SDK for Lua",
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
    ["placeholder-image_sdk"] = "placeholder-image_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
