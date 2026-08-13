# UnixConverter SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

UnixConverterUtility.registrar = ->(u) {
  u.clean = UnixConverterUtilities::Clean
  u.done = UnixConverterUtilities::Done
  u.make_error = UnixConverterUtilities::MakeError
  u.feature_add = UnixConverterUtilities::FeatureAdd
  u.feature_hook = UnixConverterUtilities::FeatureHook
  u.feature_init = UnixConverterUtilities::FeatureInit
  u.fetcher = UnixConverterUtilities::Fetcher
  u.make_fetch_def = UnixConverterUtilities::MakeFetchDef
  u.make_context = UnixConverterUtilities::MakeContext
  u.make_options = UnixConverterUtilities::MakeOptions
  u.make_request = UnixConverterUtilities::MakeRequest
  u.make_response = UnixConverterUtilities::MakeResponse
  u.make_result = UnixConverterUtilities::MakeResult
  u.make_point = UnixConverterUtilities::MakePoint
  u.make_spec = UnixConverterUtilities::MakeSpec
  u.make_url = UnixConverterUtilities::MakeUrl
  u.param = UnixConverterUtilities::Param
  u.prepare_auth = UnixConverterUtilities::PrepareAuth
  u.prepare_body = UnixConverterUtilities::PrepareBody
  u.prepare_headers = UnixConverterUtilities::PrepareHeaders
  u.prepare_method = UnixConverterUtilities::PrepareMethod
  u.prepare_params = UnixConverterUtilities::PrepareParams
  u.prepare_path = UnixConverterUtilities::PreparePath
  u.prepare_query = UnixConverterUtilities::PrepareQuery
  u.graphql_body = UnixConverterUtilities::GraphqlBody
  u.graphql_errors = UnixConverterUtilities::GraphqlErrors
  u.result_basic = UnixConverterUtilities::ResultBasic
  u.result_body = UnixConverterUtilities::ResultBody
  u.result_headers = UnixConverterUtilities::ResultHeaders
  u.transform_request = UnixConverterUtilities::TransformRequest
  u.transform_response = UnixConverterUtilities::TransformResponse
}
