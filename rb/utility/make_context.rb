# UnixConverter SDK utility: make_context
require_relative '../core/context'
module UnixConverterUtilities
  MakeContext = ->(ctxmap, basectx) {
    UnixConverterContext.new(ctxmap, basectx)
  }
end
