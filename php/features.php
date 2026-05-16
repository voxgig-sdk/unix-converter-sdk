<?php
declare(strict_types=1);

// UnixConverter SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class UnixConverterFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new UnixConverterBaseFeature();
            case "test":
                return new UnixConverterTestFeature();
            default:
                return new UnixConverterBaseFeature();
        }
    }
}
