<?php
declare(strict_types=1);

// PlaceholderImage SDK exists test

require_once __DIR__ . '/../placeholderimage_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = PlaceholderImageSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
