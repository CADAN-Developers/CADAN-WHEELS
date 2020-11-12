import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC0KI-OSMAb4TcApOAe9DVO92o0m0i75gQ",
    authDomain: "cadanwheels-7fd31.firebaseapp.com",
    databaseURL: "https://cadanwheels-7fd31.firebaseio.com",
    projectId: "cadanwheels-7fd31",
    storageBucket: "cadanwheels-7fd31.appspot.com",
    messagingSenderId: "829830247725",
    appId: "1:829830247725:web:494891034ceccf6f66cfa4",
    measurementId: "G-JKXXYRHPGF"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, firebase as default};