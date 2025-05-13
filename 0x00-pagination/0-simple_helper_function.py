#!/usr/bin/env python3
""" 0-simple_helper_function module covers the basics of pagination """


def index_range(page: int, page_size: int) -> tuple:
    """Returns a tuple of the start and end range of the page"""
    start: int = (page - 1) * page_size
    end: int = start + page_size
    return (start, end)
