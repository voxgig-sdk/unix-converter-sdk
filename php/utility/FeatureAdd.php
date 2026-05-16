<?php
declare(strict_types=1);

// UnixConverter SDK utility: feature_add

class UnixConverterFeatureAdd
{
    public static function call(UnixConverterContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
