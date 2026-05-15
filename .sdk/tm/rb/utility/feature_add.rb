# PlaceholderImage SDK utility: feature_add
module PlaceholderImageUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
