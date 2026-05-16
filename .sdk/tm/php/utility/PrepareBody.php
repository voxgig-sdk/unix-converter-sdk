<?php
declare(strict_types=1);

// UnixConverter SDK utility: prepare_body

class UnixConverterPrepareBody
{
    public static function call(UnixConverterContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
