# UnixConverter SDK feature factory

from unixconverter_sdk.feature.base_feature import UnixConverterBaseFeature
from unixconverter_sdk.feature.ratelimit_feature import UnixConverterRatelimitFeature
from unixconverter_sdk.feature.retry_feature import UnixConverterRetryFeature
from unixconverter_sdk.feature.test_feature import UnixConverterTestFeature
from unixconverter_sdk.feature.timeout_feature import UnixConverterTimeoutFeature


_FEATURES = {
    "base": lambda: UnixConverterBaseFeature(),
    "ratelimit": lambda: UnixConverterRatelimitFeature(),
    "retry": lambda: UnixConverterRetryFeature(),
    "test": lambda: UnixConverterTestFeature(),
    "timeout": lambda: UnixConverterTimeoutFeature(),
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
