#!/usr/bin/env python3
"""1-fifo_cache"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """FIFO (First in  First out) Caching System"""
    def __init__(self):
        super().__init__()

    def put(self, key, item):
        """Adds and removes data from the cache"""
        if key is None or item is None:
            pass
        else:
            self.cache_data[key] = item

        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            i = 0
            for item in self.cache_data.keys():
                if i == 0:
                    self.cache_data.pop(item)
                    print(f"DISCARD: {item}")
                    break

    def get(self, key):
        """Retrieves data from the cache"""
        if (key in self.cache_data):
            return self.cache_data.get(key)
        return None
