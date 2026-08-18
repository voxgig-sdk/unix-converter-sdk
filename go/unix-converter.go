package voxgigunixconvertersdk

import (
	"github.com/voxgig-sdk/unix-converter-sdk/go/core"
	"github.com/voxgig-sdk/unix-converter-sdk/go/entity"
	"github.com/voxgig-sdk/unix-converter-sdk/go/feature"
	_ "github.com/voxgig-sdk/unix-converter-sdk/go/utility"
)

// Type aliases preserve external API.
type UnixConverterSDK = core.UnixConverterSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type UnixConverterEntity = core.UnixConverterEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type UnixConverterError = core.UnixConverterError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewConversionEntityFunc = func(client *core.UnixConverterSDK, entopts map[string]any) core.UnixConverterEntity {
		return entity.NewConversionEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewUnixConverterSDK = core.NewUnixConverterSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewUnixConverterSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *UnixConverterSDK  { return NewUnixConverterSDK(nil) }
func Test() *UnixConverterSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
