import firebase from 'firebase/app'; // this way we only import the app part
import 'firebase/firestore'
//   We've got this code from console

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBOGfi4EdFshyv1CXHOZHTd1O2DS2Qa_DM",
  authDomain: "ejem-pract-crud.firebaseapp.com",
  databaseURL: "https://ejem-pract-crud.firebaseio.com",
  projectId: "ejem-pract-crud",
  storageBucket: "ejem-pract-crud.appspot.com",
  messagingSenderId: "814766884209",
  appId: "1:814766884209:web:fd8626717c10fbf058a2d0",
  measurementId: "G-T3255P35HH"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
// Allow to enter to database
export const db = fb.firestore() // db is exported because it must be used in other modules
// firebase.analytics(); // Only works on web app not for nodejs