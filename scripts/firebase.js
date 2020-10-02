// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAe2tEkNTDkkRXUfNq9rF53SAWE3NJaSz8",
    authDomain: "portiforial.firebaseapp.com",
    databaseURL: "https://portiforial.firebaseio.com",
    projectId: "portiforial",
    storageBucket: "portiforial.appspot.com",
    messagingSenderId: "426332596477",
    appId: "1:426332596477:web:3fde53ec76a858152db694",
    measurementId: "G-VXYXXMJBHC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //make aut and firestore references
  const auth = firebase.auth();
  const db  = firebase.firestore();
  const storage = firebase.storage();
//   db.settings({timeStampInShots: true});