import requests
import time

# Define the URL and payload
url = "http://127.0.0.1:5000/login"
payload = {
    "email": "testuser@mail.com",
    "password": "testpassword"
}

# Number of requests to send
num_requests = 10

# Delay between requests in seconds (optional; set to 0 for maximum speed)
delay_between_requests = 0.005  # 5 ms delay

# Send requests in a loop
for i in range(num_requests):
    try:
        response = requests.post(url, json=payload)
        print(f"Request {i + 1}: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Request {i + 1} failed: {e}")
    
    # Delay between requests
    time.sleep(delay_between_requests)

print("All requests sent.")
