# UnixConverter SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module UnixConverterFeatures
  def self.make_feature(name)
    case name
    when "base"
      UnixConverterBaseFeature.new
    when "ratelimit"
      UnixConverterRatelimitFeature.new
    when "retry"
      UnixConverterRetryFeature.new
    when "test"
      UnixConverterTestFeature.new
    when "timeout"
      UnixConverterTimeoutFeature.new
    else
      UnixConverterBaseFeature.new
    end
  end
end
