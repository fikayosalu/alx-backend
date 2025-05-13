#!/usr/bin/env python3
"""Contains a class Server that handles pagination"""
import csv
import math
from typing import List, Iterator, Union


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        self.__dataset: Union[None, List[List]] = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader: Iterator[List[str]] = csv.reader(f)
                dataset: List[List[str]] = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    @staticmethod
    def index_range(page: int, page_size: int) -> tuple:
        """Returns the sart and end range of each page"""
        start: int = (page - 1) * page_size
        end: int = start + page_size
        return (start, end)

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Returns the Dataset for each page"""
        assert type(page) is int and page > 0
        assert type(page_size) is int and page_size > 0
        start, end = self.index_range(page, page_size)
        try:
            return self.dataset()[start:end]
        except IndexError:
            return []
