-- PlaceholderImage SDK error

local PlaceholderImageError = {}
PlaceholderImageError.__index = PlaceholderImageError


function PlaceholderImageError.new(code, msg, ctx)
  local self = setmetatable({}, PlaceholderImageError)
  self.is_sdk_error = true
  self.sdk = "PlaceholderImage"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function PlaceholderImageError:error()
  return self.msg
end


function PlaceholderImageError:__tostring()
  return self.msg
end


return PlaceholderImageError
