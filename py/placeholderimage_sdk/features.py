# PlaceholderImage SDK feature factory

from placeholderimage_sdk.feature.base_feature import PlaceholderImageBaseFeature
from placeholderimage_sdk.feature.ratelimit_feature import PlaceholderImageRatelimitFeature
from placeholderimage_sdk.feature.retry_feature import PlaceholderImageRetryFeature
from placeholderimage_sdk.feature.test_feature import PlaceholderImageTestFeature
from placeholderimage_sdk.feature.timeout_feature import PlaceholderImageTimeoutFeature


_FEATURES = {
    "base": lambda: PlaceholderImageBaseFeature(),
    "ratelimit": lambda: PlaceholderImageRatelimitFeature(),
    "retry": lambda: PlaceholderImageRetryFeature(),
    "test": lambda: PlaceholderImageTestFeature(),
    "timeout": lambda: PlaceholderImageTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
