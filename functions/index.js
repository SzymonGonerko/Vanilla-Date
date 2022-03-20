const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello world!");
});


const admin = require('firebase-admin')

admin.initializeApp()
const arr = []
exports.getUsers = functions.https.onRequest((req, res) => {
  admin.firestore().collection('Users').get().
      then(data => {
        data.forEach(el => {arr.push(el.data())})
    return res.json(arr)
  }).catch((err) => console.log(err))
})