# wallet-api

An exploratory api for wallet app

A simple NodeJs based API using Firebase Cloud functions to simulate the various endpoints for the proposed wallet app API. It runs Express as its server engine, using the Firebase Admin SDK to process and route requests to Firebase.

## Base URL

https://funpay-demo-api.firebaseapp.com/

## Endpoints

- /user
  - GET - returns the UserRecord Object generated from Firebase.auth. Requires a UID as a URL query string.
    USAGE: https://funpay-demo-api.firebaseapp.com/user/{UID}
  - POST - Creates a new UserRecord in the Firebase Console, returns a UserRecord Object. Requires:
    email, password, phoneNumber, displayName as HTTP request body values.
