from datetime import datetime
from flask import request
from models import db, RequestLog

class RequestLoggerMiddleware:
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        # Capture request details
        with app.app_context():
            request_ip = environ.get("REMOTE_ADDR")
            request_method = environ.get("REQUEST_METHOD")
            request_url = environ.get("PATH_INFO")
            request_payload = environ.get("CONTENT_LENGTH", "None")
            user_id = request.environ.get("user_id", None)

            log_entry = RequestLog(
                user_id=user_id,
                request_url=request_url,
                request_payload=str(request_payload),
                request_type=request_method,
                request_time=datetime.utcnow(),
                request_ip=request_ip,
                response_status=None,  # Add logic to capture response status if needed
                response_object=None,  # Add response object details if needed
            )
            db.session.add(log_entry)
            db.session.commit()

        return self.app(environ, start_response)
