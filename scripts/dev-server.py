#!/usr/bin/env python3
"""Local preview server with no-cache headers (avoids stale CSS/JS in the browser)."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(os.environ.get("PORT", "8080"))
HOST = os.environ.get("HOST", "127.0.0.1")


class DevHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        print(f"[dev] {self.address_string()} {fmt % args}")


if __name__ == "__main__":
    os.chdir(ROOT)
    server = ThreadingHTTPServer((HOST, PORT), DevHandler)
    print(f"Serving BCA-USA at http://{HOST}:{PORT}/  (no-cache)")
    print(f"Root: {ROOT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
