# KitHub
A mobile system that identifies products from photos and shows customer-specific prices. AI detects the item, and the backend retrieves its details and correct price from a database, making product lookup fast, accurate, and easy.

## Installation
Backend
    - cd backend
    - python -m venv venv
    - pip install -r requirements.txt
Frontend
    - cd frontend
    - node -v (check if node version must over v8)
    - npm install expo-cli 
    -or- npm install -g expo-cli (for global installation)
    S
## Running
Backend connect to Database
    - cd backend
    - .\venv\Scripts\activate
    - uvicorn db_test:app --reload --host 0.0.0.0
    (Show: Application startup complete)

Frontend in IOS
    - cd frontend
    - cd KitHub
    - npm start
    - scan QR code to open "EXPO Client"

*** Laptop and Phone need to connect to same WIFI ***