# PlaceholderImage SDK utility: make_context

from placeholderimage_sdk.core.context import PlaceholderImageContext


def make_context_util(ctxmap, basectx):
    return PlaceholderImageContext(ctxmap, basectx)
