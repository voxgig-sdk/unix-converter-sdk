<?php
declare(strict_types=1);

// UnixConverter SDK utility: result_body

class UnixConverterResultBody
{
    public static function call(UnixConverterContext $ctx): ?UnixConverterResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
