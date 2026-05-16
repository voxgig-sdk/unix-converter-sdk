<?php
declare(strict_types=1);

// UnixConverter SDK utility: result_headers

class UnixConverterResultHeaders
{
    public static function call(UnixConverterContext $ctx): ?UnixConverterResult
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
