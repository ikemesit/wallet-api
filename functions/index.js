const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');
const bodyParser = require('body-parser');
const serviceAcct = require('./config/funpay-demo-api-firebase-adminsdk-tijmt-8bd7c01966.json');

// const firebaseApp = firebase.initializeApp(functions.config().firebase);
const firebaseApp = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAcct),
    databaseURL: 'https://funpay-demo-api.firebaseio.com'
});

function getFacts() {
    const ref = firebaseApp.database().ref('facts');
    return ref.once('value').then(snap => snap.val());
}

function createNewUser(email, password, phoneNumber, displayName) {
    const ref = firebaseApp.auth()
        .createUser({
            email,
            emailVerified: false,
            password,
            phoneNumber,
            displayName,
            photoURL: 'https://previews.123rf.com/images/kritchanut/kritchanut1406/kritchanut140600093/29213195-male-silhouette-avatar-profile-picture.jpg',
            disabled: false
        });
    return ref;
}

function getUserRecord(uid) {
    const ref = firebaseApp.auth().getUser(uid);
    return ref;
}

const app = express();
const jsonParser = bodyParser.json();

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.post('/user', jsonParser, (req, res) => {
    const creds = {
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        displayName: req.body.displayName,
    };

    createNewUser(creds.email, creds.password, creds.phoneNumber, creds.displayName)
        .then((userRecord) => {
            res.status(200);
            res.send(userRecord);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/weak-password') {
                const msg = {
                    errorCode: 400,
                    errorMessage: 'Your password is too weak'
                }
                res.status(400).send(msg);
            } else {
                const msg = {
                    errorCode: 400,
                    errorMessage: 'Your request could not be completed'
                }
                res.status(500).send(msg);
            }

            console.log(errorCode, errorMessage);
        });
});

app.get('/user/:uid', (req, res) => {
    const uid = req.param('uid');

    getUserRecord(uid).then((user) => {
        res.status(200);
        res.send(user);
    }).catch((error) => console.log(error));
});

app.get('/', (req, res) => {
    getFacts().then(facts => {
        res.json(facts);
    });
});

exports.app = functions.https.onRequest(app);