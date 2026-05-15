# PlaceholderImage SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module PlaceholderImageFeatures
  def self.make_feature(name)
    case name
    when "base"
      PlaceholderImageBaseFeature.new
    when "test"
      PlaceholderImageTestFeature.new
    else
      PlaceholderImageBaseFeature.new
    end
  end
end
