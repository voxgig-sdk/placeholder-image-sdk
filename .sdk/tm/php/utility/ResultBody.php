<?php
declare(strict_types=1);

// PlaceholderImage SDK utility: result_body

class PlaceholderImageResultBody
{
    public static function call(PlaceholderImageContext $ctx): ?PlaceholderImageResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
