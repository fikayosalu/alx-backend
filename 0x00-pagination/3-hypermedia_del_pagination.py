#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
from typing import List, Dict, Any


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE: str = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        self.__dataset: List[List[str]] = []
        self.__indexed_dataset: Dict[int, List[str]] = {}

    def dataset(self) -> List[List[str]]:
        """Cached dataset"""
        if not self.__dataset:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List[str]]:
        """Dataset indexed by sorting position, starting at 0 """
        if not self.__indexed_dataset:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: truncated_dataset[i] for i in range(len(truncated_dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = 0,
                        page_size: int = 10) -> Dict[str, Any]:
        """Returns a deletion-resilient hypermedia pagination"""
        assert isinstance(index, int) and index >= 0, "Index must be a \
                non-negative integer."
        assert isinstance(page_size, int) and page_size > 0, "Page size \
                must be a positive integer."

        indexed_data = self.indexed_dataset()
        dataset_size: int = len(indexed_data)

        assert index < dataset_size, "Index is out of range."

        data: List[List[str]] = []
        current_index: int = index
        collected: int = 0

        while collected < page_size and current_index < dataset_size:
            if current_index in indexed_data:
                data.append(indexed_data[current_index])
                collected += 1
            current_index += 1

        return {
            "index": index,
            "data": data,
            "page_size": page_size,
            "next_index": current_index,
        }
