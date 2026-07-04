<?php
declare(strict_types=1);

// PlaceholderImage entity test

require_once __DIR__ . '/../placeholderimage_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PlaceholderImageEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = PlaceholderImageSDK::test(null, null);
        $ent = $testsdk->PlaceholderImage(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = placeholder_image_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "placeholder_image." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set PLACEHOLDERIMAGE_TEST_PLACEHOLDER_IMAGE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $placeholder_image_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.placeholder_image")));
        $placeholder_image_ref01_data = null;
        if (count($placeholder_image_ref01_data_raw) > 0) {
            $placeholder_image_ref01_data = Helpers::to_map($placeholder_image_ref01_data_raw[0][1]);
        }

        // LOAD
        $placeholder_image_ref01_ent = $client->PlaceholderImage(null);
        $placeholder_image_ref01_match_dt0 = [];
        $placeholder_image_ref01_data_dt0_loaded = $placeholder_image_ref01_ent->load($placeholder_image_ref01_match_dt0, null);
        $this->assertNotNull($placeholder_image_ref01_data_dt0_loaded);

    }
}

function placeholder_image_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/placeholder_image/PlaceholderImageTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = PlaceholderImageSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["placeholder_image01", "placeholder_image02", "placeholder_image03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("PLACEHOLDERIMAGE_TEST_PLACEHOLDER_IMAGE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "PLACEHOLDERIMAGE_TEST_PLACEHOLDER_IMAGE_ENTID" => $idmap,
        "PLACEHOLDERIMAGE_TEST_LIVE" => "FALSE",
        "PLACEHOLDERIMAGE_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["PLACEHOLDERIMAGE_TEST_PLACEHOLDER_IMAGE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["PLACEHOLDERIMAGE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new PlaceholderImageSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["PLACEHOLDERIMAGE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["PLACEHOLDERIMAGE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
