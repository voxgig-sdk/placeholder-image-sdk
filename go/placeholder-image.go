package voxgigplaceholderimagesdk

import (
	"github.com/voxgig-sdk/placeholder-image-sdk/go/core"
	"github.com/voxgig-sdk/placeholder-image-sdk/go/entity"
	"github.com/voxgig-sdk/placeholder-image-sdk/go/feature"
	_ "github.com/voxgig-sdk/placeholder-image-sdk/go/utility"
)

// Type aliases preserve external API.
type PlaceholderImageSDK = core.PlaceholderImageSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type PlaceholderImageEntity = core.PlaceholderImageEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type PlaceholderImageError = core.PlaceholderImageError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewPlaceholderEntityFunc = func(client *core.PlaceholderImageSDK, entopts map[string]any) core.PlaceholderImageEntity {
		return entity.NewPlaceholderEntity(client, entopts)
	}
	core.NewPlaceholderImageEntityFunc = func(client *core.PlaceholderImageSDK, entopts map[string]any) core.PlaceholderImageEntity {
		return entity.NewPlaceholderImageEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewPlaceholderImageSDK = core.NewPlaceholderImageSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
