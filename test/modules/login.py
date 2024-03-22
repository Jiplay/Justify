import requests, json

def register_tests():
    register_success()


def register_success():
    payload = json.dumps({
        "username": "John_Dobidobidoo",
        "password": "Azerty123*",
    })

    headers = {
        'Content-Type': 'application/json'
    }
    url = 'http://localhost/register'
    response = requests.request("POST", url, headers=headers, data=payload)
    print("resp", response.text)


def login_success():
    payload = json.dumps({
        "username": "John_Dobidobidoo",
        "password": "Azerty123*",
    })

    headers = {
        'Content-Type': 'application/json'
    }
    url = 'http://localhost/login'
    response = requests.request("POST", url, headers=headers, data=payload)
    print("resp", response.text)
