import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/* cSpell:disable */
const firebaseConfig = {
  apiKey: "AIzaSyBhWZGJmoJKaxAcfjD-5myvySxsft5XReo",
  authDomain: "rn-instagram-clone-37e97.firebaseapp.com",
  projectId: "rn-instagram-clone-37e97",
  storageBucket: "rn-instagram-clone-37e97.appspot.com",
  messagingSenderId: "821568314244",
  appId: "1:821568314244:web:8624585c38054ad149dbd1",
};

/* cSpell:enable */
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
