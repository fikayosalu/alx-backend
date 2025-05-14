#!/usr/bin/env python3
"""3-lru_cache.py"""
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """LRU (Least Recently Used) Cache System"""

    def __init__(self):
        super().__init__()       # Call parent constructor
        self.usage_order = []    # To track the order of key usage

    def put(self, key, item):
        """Adds and removes data from the cache"""
        if key is None or item is None:
            return

        # If key already exists, remove it to update usage order
        if key in self.cache_data:
            self.usage_order.remove(key)
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            # Remove least recently used (first in the list)
            lru_key = self.usage_order.pop(0)
            del self.cache_data[lru_key]
            print("DISCARD:", lru_key)

        # Insert or update the item
        self.cache_data[key] = item
        self.usage_order.append(key)

    def get(self, key):
        """Retrieve data from the cache"""
        if key is None or key not in self.cache_data:
            return None

        # Update usage order: move key to the end
        self.usage_order.remove(key)
        self.usage_order.append(key)

        return self.cache_data[key]
