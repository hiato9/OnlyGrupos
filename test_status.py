import sys
import os
import asyncio
import urllib.request
import json
try:
    req = urllib.request.Request('http://127.0.0.1:8000/status', method='GET')
    with urllib.request.urlopen(req, timeout=5) as response:
        print(response.read().decode('utf-8'))
except Exception as e:
    print(f'Error: {e}')
