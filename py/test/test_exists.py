# ProjectName SDK exists test

import pytest
from placeholderimage_sdk import PlaceholderImageSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = PlaceholderImageSDK.test(None, None)
        assert testsdk is not None
