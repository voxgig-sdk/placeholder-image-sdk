# PlaceholderImage SDK utility: make_context
require_relative '../core/context'
module PlaceholderImageUtilities
  MakeContext = ->(ctxmap, basectx) {
    PlaceholderImageContext.new(ctxmap, basectx)
  }
end
