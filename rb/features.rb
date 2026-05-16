# UnixConverter SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module UnixConverterFeatures
  def self.make_feature(name)
    case name
    when "base"
      UnixConverterBaseFeature.new
    when "test"
      UnixConverterTestFeature.new
    else
      UnixConverterBaseFeature.new
    end
  end
end
