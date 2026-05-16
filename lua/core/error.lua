-- UnixConverter SDK error

local UnixConverterError = {}
UnixConverterError.__index = UnixConverterError


function UnixConverterError.new(code, msg, ctx)
  local self = setmetatable({}, UnixConverterError)
  self.is_sdk_error = true
  self.sdk = "UnixConverter"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function UnixConverterError:error()
  return self.msg
end


function UnixConverterError:__tostring()
  return self.msg
end


return UnixConverterError
