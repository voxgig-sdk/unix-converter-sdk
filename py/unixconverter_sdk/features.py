# UnixConverter SDK feature factory

from unixconverter_sdk.feature.base_feature import UnixConverterBaseFeature
from unixconverter_sdk.feature.test_feature import UnixConverterTestFeature


def _make_feature(name):
    features = {
        "base": lambda: UnixConverterBaseFeature(),
        "test": lambda: UnixConverterTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
