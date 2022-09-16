import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Installation - 

const firebaseConfig = {
  apiKey: "AIzaSyBKu012UpiQ8xVXADpJJKk-JOkYOOn8FbM",
  authDomain: "todo-react-fe9da.firebaseapp.com",
  projectId: "todo-react-fe9da",
  storageBucket: "todo-react-fe9da.appspot.com",
  messagingSenderId: "1007186610258",
  appId: "1:1007186610258:web:f44de3a90df7e24989b78b",
  measurementId: "G-JBJYX7538C"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db,auth}