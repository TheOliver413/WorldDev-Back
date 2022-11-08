require('dotenv').config()
var admin = require("firebase-admin");
var serviceAccount = require("./world-developer-firebase.json");

const { getFirestore } = require('firebase-admin/firestore')


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore()

module.exports = {
    db
}