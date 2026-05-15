<?php
declare(strict_types=1);

// PlaceholderImage SDK utility: prepare_body

class PlaceholderImagePrepareBody
{
    public static function call(PlaceholderImageContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
