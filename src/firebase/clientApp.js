// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';

// Add Firebase products that you need here
import 'firebase/auth';
import 'firebase/firestore';

// Replace this with your app's configuration from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCl85tAsJ7fZfSHU113mNN9IIFgEiE-5Hc",
  authDomain: "fir-starter-9f8bd.firebaseapp.com",
  projectId: "fir-starter-9f8bd",
  storageBucket: "fir-starter-9f8bd.appspot.com",
  messagingSenderId: "423126965001",
  appId: "1:423126965001:web:68cbb71c288d6d187c11d8"
};

firebase.initializeApp(firebaseConfig);

if (window.location.hostname === 'localhost') {
  firebase.auth().useEmulator('http://localhost:9099');
  firebase.firestore().useEmulator('localhost', 8080);
}

export default firebase;
