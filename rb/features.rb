# PlaceholderImage SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module PlaceholderImageFeatures
  def self.make_feature(name)
    case name
    when "base"
      PlaceholderImageBaseFeature.new
    when "ratelimit"
      PlaceholderImageRatelimitFeature.new
    when "retry"
      PlaceholderImageRetryFeature.new
    when "test"
      PlaceholderImageTestFeature.new
    when "timeout"
      PlaceholderImageTimeoutFeature.new
    else
      PlaceholderImageBaseFeature.new
    end
  end
end
