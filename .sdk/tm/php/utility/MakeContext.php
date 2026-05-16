<?php
declare(strict_types=1);

// UnixConverter SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class UnixConverterMakeContext
{
    public static function call(array $ctxmap, ?UnixConverterContext $basectx): UnixConverterContext
    {
        return new UnixConverterContext($ctxmap, $basectx);
    }
}
