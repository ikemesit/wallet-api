# wallet-api

exploratory api for wallet app

This is a simple NodeJs based API using Firebase Cloud functions to simulate the various endpoints for the proposed wallet app API. It runs Express as its server engine, using the Firebase Admin SDK to process and route requests to Firebase.

## Endpoints

- /user
  - GET - returns the UserRecord Object generated from Firebase.auth
  - POST - Creates a new UserRecord in the Firebase Console, returns a UserRecord Object. Accepts email, password, phoneNumber, displayName as parameters.
