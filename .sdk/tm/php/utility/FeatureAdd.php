<?php
declare(strict_types=1);

// PlaceholderImage SDK utility: feature_add

class PlaceholderImageFeatureAdd
{
    public static function call(PlaceholderImageContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
