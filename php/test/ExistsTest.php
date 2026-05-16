<?php
declare(strict_types=1);

// UnixConverter SDK exists test

require_once __DIR__ . '/../unixconverter_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = UnixConverterSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
