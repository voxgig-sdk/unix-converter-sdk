# UnixConverter SDK utility: feature_add
module UnixConverterUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
