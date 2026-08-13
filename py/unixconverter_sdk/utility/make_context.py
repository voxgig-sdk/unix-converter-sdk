# UnixConverter SDK utility: make_context

from unixconverter_sdk.core.context import UnixConverterContext


def make_context_util(ctxmap, basectx):
    return UnixConverterContext(ctxmap, basectx)
