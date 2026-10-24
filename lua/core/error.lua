-- PlaceholderImage SDK error

local json = require("dkjson")

local PlaceholderImageError = {}
PlaceholderImageError.__index = PlaceholderImageError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function PlaceholderImageError.new(code, msg, ctx)
  local self = setmetatable({}, PlaceholderImageError)
  self.is_sdk_error = true
  self.sdk = "PlaceholderImage"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  self.status = -1
  CONTEXT[self] = ctx
  return self
end


function PlaceholderImageError:context()
  return CONTEXT[self]
end


function PlaceholderImageError:error()
  return self.msg
end


function PlaceholderImageError:not_found()
  return 404 == self.status
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function PlaceholderImageError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function PlaceholderImageError:to_json()
  return json.encode(self:to_table())
end


function PlaceholderImageError:__tostring()
  return self.msg
end


function PlaceholderImageError.__tojson(self)
  return self:to_json()
end


return PlaceholderImageError
