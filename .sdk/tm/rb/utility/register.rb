# PlaceholderImage SDK utility registration
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
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

PlaceholderImageUtility.registrar = ->(u) {
  u.clean = PlaceholderImageUtilities::Clean
  u.done = PlaceholderImageUtilities::Done
  u.make_error = PlaceholderImageUtilities::MakeError
  u.feature_add = PlaceholderImageUtilities::FeatureAdd
  u.feature_hook = PlaceholderImageUtilities::FeatureHook
  u.feature_init = PlaceholderImageUtilities::FeatureInit
  u.fetcher = PlaceholderImageUtilities::Fetcher
  u.make_fetch_def = PlaceholderImageUtilities::MakeFetchDef
  u.make_context = PlaceholderImageUtilities::MakeContext
  u.make_options = PlaceholderImageUtilities::MakeOptions
  u.make_request = PlaceholderImageUtilities::MakeRequest
  u.make_response = PlaceholderImageUtilities::MakeResponse
  u.make_result = PlaceholderImageUtilities::MakeResult
  u.make_point = PlaceholderImageUtilities::MakePoint
  u.make_spec = PlaceholderImageUtilities::MakeSpec
  u.make_url = PlaceholderImageUtilities::MakeUrl
  u.param = PlaceholderImageUtilities::Param
  u.prepare_auth = PlaceholderImageUtilities::PrepareAuth
  u.prepare_body = PlaceholderImageUtilities::PrepareBody
  u.prepare_headers = PlaceholderImageUtilities::PrepareHeaders
  u.prepare_method = PlaceholderImageUtilities::PrepareMethod
  u.prepare_params = PlaceholderImageUtilities::PrepareParams
  u.prepare_path = PlaceholderImageUtilities::PreparePath
  u.prepare_query = PlaceholderImageUtilities::PrepareQuery
  u.result_basic = PlaceholderImageUtilities::ResultBasic
  u.result_body = PlaceholderImageUtilities::ResultBody
  u.result_headers = PlaceholderImageUtilities::ResultHeaders
  u.transform_request = PlaceholderImageUtilities::TransformRequest
  u.transform_response = PlaceholderImageUtilities::TransformResponse
}
