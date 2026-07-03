package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/placeholder-image-sdk/go"
	"github.com/voxgig-sdk/placeholder-image-sdk/go/core"

	vs "github.com/voxgig-sdk/placeholder-image-sdk/go/utility/struct"
)

func TestPlaceholderImageEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PlaceholderImage(nil)
		if ent == nil {
			t.Fatal("expected non-nil PlaceholderImageEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := placeholder_imageBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "placeholder_image." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set PLACEHOLDERIMAGE_TEST_PLACEHOLDER_IMAGE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		placeholderImageRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.placeholder_image", setup.data)))
		var placeholderImageRef01Data map[string]any
		if len(placeholderImageRef01DataRaw) > 0 {
			placeholderImageRef01Data = core.ToMapAny(placeholderImageRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = placeholderImageRef01Data

		// LOAD
		placeholderImageRef01Ent := client.PlaceholderImage(nil)
		placeholderImageRef01MatchDt0 := map[string]any{}
		placeholderImageRef01DataDt0Loaded, err := placeholderImageRef01Ent.Load(placeholderImageRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if placeholderImageRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func placeholder_imageBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "placeholder_image", "PlaceholderImageTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read placeholder_image test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse placeholder_image test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"placeholder_image01", "placeholder_image02", "placeholder_image03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("PLACEHOLDERIMAGE_TEST_PLACEHOLDER_IMAGE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"PLACEHOLDERIMAGE_TEST_PLACEHOLDER_IMAGE_ENTID": idmap,
		"PLACEHOLDERIMAGE_TEST_LIVE":      "FALSE",
		"PLACEHOLDERIMAGE_TEST_EXPLAIN":   "FALSE",
		"PLACEHOLDERIMAGE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["PLACEHOLDERIMAGE_TEST_PLACEHOLDER_IMAGE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["PLACEHOLDERIMAGE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["PLACEHOLDERIMAGE_APIKEY"],
			},
			extra,
		})
		client = sdk.NewPlaceholderImageSDK(core.ToMapAny(mergedOpts))
	}

	live := env["PLACEHOLDERIMAGE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["PLACEHOLDERIMAGE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
