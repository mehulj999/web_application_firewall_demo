from datetime import datetime
from db import log_request

class RequestLoggerMiddleware:
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        # Log request to the database
        path = environ.get('PATH_INFO', '')
        method = environ.get('REQUEST_METHOD', '')

        # Only log for login or register routes
        if path in ['/login', '/register']:
            log_request(path, method)
        
        return self.app(environ, start_response)
