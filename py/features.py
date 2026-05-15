# PlaceholderImage SDK feature factory

from feature.base_feature import PlaceholderImageBaseFeature
from feature.test_feature import PlaceholderImageTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PlaceholderImageBaseFeature(),
        "test": lambda: PlaceholderImageTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
