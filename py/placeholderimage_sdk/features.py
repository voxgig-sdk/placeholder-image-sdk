# PlaceholderImage SDK feature factory

from placeholderimage_sdk.feature.base_feature import PlaceholderImageBaseFeature
from placeholderimage_sdk.feature.test_feature import PlaceholderImageTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PlaceholderImageBaseFeature(),
        "test": lambda: PlaceholderImageTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
