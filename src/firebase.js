import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCi1uWPqVx95qKrWpIIFbR6AM0U1sDCz1c",
  authDomain: "snapchat-clone-d954b.firebaseapp.com",
  projectId: "snapchat-clone-d954b",
  storageBucket: "snapchat-clone-d954b.appspot.com",
  messagingSenderId: "992509327289",
  appId: "1:992509327289:web:1a1848bb642bda02b3a868",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
