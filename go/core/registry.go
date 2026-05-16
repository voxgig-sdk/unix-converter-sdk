package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewConversionEntityFunc func(client *UnixConverterSDK, entopts map[string]any) UnixConverterEntity

