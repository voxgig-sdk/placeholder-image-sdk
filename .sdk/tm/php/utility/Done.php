<?php
declare(strict_types=1);

// PlaceholderImage SDK utility: done

class PlaceholderImageDone
{
    public static function call(PlaceholderImageContext $ctx): mixed
    {
        self::clean_explain($ctx);
        if ($ctx->result && $ctx->result->ok) {
            $resdata = $ctx->result->resdata;
            if (is_object($resdata)) {
                $resdata = (array)$resdata;
            }
            return $resdata;
        }
        return ($ctx->utility->make_error)($ctx, null);
    }

    // The record is an array the context owns (the caller's copy is its
    // own), so the cleaned copy is assigned back; err is pruned from it.
    public static function clean_explain(PlaceholderImageContext $ctx): void
    {
        if (!$ctx->ctrl->explain) {
            return;
        }
        $ctx->ctrl->explain = ($ctx->utility->clean)($ctx, $ctx->ctrl->explain);
        if (is_array($ctx->ctrl->explain['result'] ?? null)) {
            unset($ctx->ctrl->explain['result']['err']);
        }
    }
}
