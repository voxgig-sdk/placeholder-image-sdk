# PlaceholderImage SDK utility: prepare_body
require_relative 'media'
module PlaceholderImageUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return PlaceholderImageUtilities.raw_body(ctx.reqdata) if PlaceholderImageUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
