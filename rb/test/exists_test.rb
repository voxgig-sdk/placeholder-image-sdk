# PlaceholderImage SDK exists test

require "minitest/autorun"
require_relative "../PlaceholderImage_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = PlaceholderImageSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
