# UnixConverter SDK exists test

require "minitest/autorun"
require_relative "../UnixConverter_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = UnixConverterSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
