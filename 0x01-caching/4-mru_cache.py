#!/usr/bin/env python3
"""4-mru_cache.py"""
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """MRU (Most Recently Used) Cache System"""

    def __init__(self):
        super().__init__()
        self.usage_order = []  # Keeps track of usage order

    def put(self, key, item):
        """Adds and removes items from the cache dictionary"""
        if key is None or item is None:
            return

        # If key already exists, update usage position
        if key in self.cache_data:
            self.usage_order.remove(key)
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            # Remove the most recently used item (last in the list)
            mru_key = self.usage_order.pop()
            del self.cache_data[mru_key]
            print("DISCARD:", mru_key)

        # Insert or update
        self.cache_data[key] = item
        self.usage_order.append(key)  # Mark as most recently used

    def get(self, key):
        """Used to retrieve data from the cache"""
        if key is None or key not in self.cache_data:
            return None

        # Update usage order: move to the end (most recently used)
        self.usage_order.remove(key)
        self.usage_order.append(key)

        return self.cache_data[key]
