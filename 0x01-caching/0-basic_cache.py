#!/usr/bin/env python3
"""0-basic_cache"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """Basic Caching System"""
    def __init__(self):
        super().__init__()

    def put(self, key, item):
        """Adds data to the cache"""
        if key is None or item is None:
            pass
        else:
            self.cache_data[key] = item

    def get(self, key):
        """Retrieves data from the cache"""
        if (key in self.cache_data):
            return self.cache_data.get(key)
        return None
