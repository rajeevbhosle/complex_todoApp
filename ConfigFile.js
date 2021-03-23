import firebase from 'firebase';
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBgpSEoCo-k7PVugT3x7R0flUyCgUuyBS4",
    authDomain: "react-firebase-246c9.firebaseapp.com",
    databaseURL: "https://react-firebase-246c9-default-rtdb.firebaseio.com",
    projectId: "react-firebase-246c9",
    storageBucket: "react-firebase-246c9.appspot.com",
    messagingSenderId: "1012236651123",
    appId: "1:1012236651123:web:29cf5af76d84d06371f806",
    measurementId: "G-TY4X886T4M"
}

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
export const TododataRef = db.collection("users");
export { firebase }