package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewPlaceholderEntityFunc func(client *PlaceholderImageSDK, entopts map[string]any) PlaceholderImageEntity

var NewPlaceholderImageEntityFunc func(client *PlaceholderImageSDK, entopts map[string]any) PlaceholderImageEntity

