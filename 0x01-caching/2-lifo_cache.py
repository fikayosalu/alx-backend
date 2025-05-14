#!/usr/bin/env python3
"""2-lifo_cache"""
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """LIFO Cache system"""

    def __init__(self):
        super().__init__()  # Call parent constructor
        self.stack = []     # To track insertion order (LIFO)

    def put(self, key, item):
        """Adds and removes from the cache"""
        if key is None or item is None:
            return

        # If key is already present, remove it to re-insert later (LIFO update)
        if key in self.cache_data:
            self.stack.remove(key)
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            last_key = self.stack.pop()  # Get the last inserted key
            del self.cache_data[last_key]
            print("DISCARD:", last_key)

        # Insert new item
        self.cache_data[key] = item
        self.stack.append(key)

    def get(self, key):
        """Retrieve data from the cache"""
        return self.cache_data.get(key, None)
