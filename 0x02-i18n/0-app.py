#!/usr/bin/env python3
""" 0-app.py
Flask app that serves a single page with a title and a header.
"""
from flask import Flask
from flask import render_template

app = Flask(__name__)


@app.route('/')
def index():
    """Render the index page."""
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run()
