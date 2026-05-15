<?php
declare(strict_types=1);

// PlaceholderImage SDK utility: result_headers

class PlaceholderImageResultHeaders
{
    public static function call(PlaceholderImageContext $ctx): ?PlaceholderImageResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
