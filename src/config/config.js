import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDcw2eyquwfvQcwFIfiasnvjxFZ5cXCbcc",
    authDomain: "admlisten-24088.firebaseapp.com",
    databaseURL: "https://admlisten-24088.firebaseio.com",
    projectId: "admlisten-24088",
    storageBucket: "admlisten-24088.appspot.com",
    messagingSenderId: "202332007978",
    appId: "1:202332007978:web:d59c95b15b12e445235d53"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase