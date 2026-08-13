# UnixConverter SDK exists test

import pytest
from unixconverter_sdk import UnixConverterSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = UnixConverterSDK.test(None, None)
        assert testsdk is not None
