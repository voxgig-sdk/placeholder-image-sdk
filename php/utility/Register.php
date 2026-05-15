<?php
declare(strict_types=1);

// PlaceholderImage SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

PlaceholderImageUtility::setRegistrar(function (PlaceholderImageUtility $u): void {
    $u->clean = [PlaceholderImageClean::class, 'call'];
    $u->done = [PlaceholderImageDone::class, 'call'];
    $u->make_error = [PlaceholderImageMakeError::class, 'call'];
    $u->feature_add = [PlaceholderImageFeatureAdd::class, 'call'];
    $u->feature_hook = [PlaceholderImageFeatureHook::class, 'call'];
    $u->feature_init = [PlaceholderImageFeatureInit::class, 'call'];
    $u->fetcher = [PlaceholderImageFetcher::class, 'call'];
    $u->make_fetch_def = [PlaceholderImageMakeFetchDef::class, 'call'];
    $u->make_context = [PlaceholderImageMakeContext::class, 'call'];
    $u->make_options = [PlaceholderImageMakeOptions::class, 'call'];
    $u->make_request = [PlaceholderImageMakeRequest::class, 'call'];
    $u->make_response = [PlaceholderImageMakeResponse::class, 'call'];
    $u->make_result = [PlaceholderImageMakeResult::class, 'call'];
    $u->make_point = [PlaceholderImageMakePoint::class, 'call'];
    $u->make_spec = [PlaceholderImageMakeSpec::class, 'call'];
    $u->make_url = [PlaceholderImageMakeUrl::class, 'call'];
    $u->param = [PlaceholderImageParam::class, 'call'];
    $u->prepare_auth = [PlaceholderImagePrepareAuth::class, 'call'];
    $u->prepare_body = [PlaceholderImagePrepareBody::class, 'call'];
    $u->prepare_headers = [PlaceholderImagePrepareHeaders::class, 'call'];
    $u->prepare_method = [PlaceholderImagePrepareMethod::class, 'call'];
    $u->prepare_params = [PlaceholderImagePrepareParams::class, 'call'];
    $u->prepare_path = [PlaceholderImagePreparePath::class, 'call'];
    $u->prepare_query = [PlaceholderImagePrepareQuery::class, 'call'];
    $u->result_basic = [PlaceholderImageResultBasic::class, 'call'];
    $u->result_body = [PlaceholderImageResultBody::class, 'call'];
    $u->result_headers = [PlaceholderImageResultHeaders::class, 'call'];
    $u->transform_request = [PlaceholderImageTransformRequest::class, 'call'];
    $u->transform_response = [PlaceholderImageTransformResponse::class, 'call'];
});
