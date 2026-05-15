package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewPlaceholderEntityFunc func(client *PlaceholderImageSDK, entopts map[string]any) PlaceholderImageEntity

var NewPlaceholderImageEntityFunc func(client *PlaceholderImageSDK, entopts map[string]any) PlaceholderImageEntity

