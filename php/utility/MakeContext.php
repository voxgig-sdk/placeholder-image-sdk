<?php
declare(strict_types=1);

// PlaceholderImage SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class PlaceholderImageMakeContext
{
    public static function call(array $ctxmap, ?PlaceholderImageContext $basectx): PlaceholderImageContext
    {
        return new PlaceholderImageContext($ctxmap, $basectx);
    }
}
