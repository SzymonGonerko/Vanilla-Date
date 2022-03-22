import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"

import {getFirestore, collection, getDocs} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_DATABASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()
const colRef = collection(db, 'Users')

// getDocs(colRef)
//     .then(snapshot => {
//         // console.log(snapshot.docs)
//         let users = []
//         snapshot.docs.forEach(doc => {
//             users.push({ ...doc.data(), id: doc.id })
//         })
//         // console.log(users)
//     })
//     .catch(err => {
//         console.log(err.message)
//     })

export default auth
export const storage = getStorage(app)