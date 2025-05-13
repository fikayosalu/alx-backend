#!/usr/bin/env python3
import csv
import math
from typing import List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    @staticmethod
    def index_range(page: int, page_size: int) -> tuple:
        start = (page - 1) * page_size
        end = start + page_size
        return (start, end)

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        assert type(page) == int and page > 0,"page must be an\
                integer greater than 0"
        assert type(page_size) == int and page_size > 0, "page size \
                must be an integer greater than 0"
        start, end = self.index_range(page, page_size)
        try:
            return self.dataset()[start:end]
        except:
            return []

    def get_hyper(self, page: int = 1, page_size: int = 10) -> List[List]:
        assert type(page) == int and page > 0,"page must be an\
                integer greater than 0"
        assert type(page_size) == int and page_size > 0, "page size \
                must be an integer greater than 0"
        start, end = self.index_range(page, page_size)
        total = math.ceil(len(self.dataset())/page_size)
        return {
                    "page_size": page_size,
                    "page": page,
                    "data": self.get_page(page, page_size),
                    "next_page": page + 1 if page < total else None,
                    "prev_page": page - 1 if page > 1 else None,
                    "total_pages": total
                    }
