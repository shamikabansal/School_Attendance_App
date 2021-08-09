import firebase from 'firebase';

 var firebaseConfig = {
    apiKey: "AIzaSyCxoHxkTNa1qqZAVEHeJ1qcX0Tm-RLazY8",
    authDomain: "school-attendance-app-a2fed.firebaseapp.com",
    databaseURL: "https://school-attendance-app-a2fed-default-rtdb.firebaseio.com",
    projectId: "school-attendance-app-a2fed",
    storageBucket: "school-attendance-app-a2fed.appspot.com",
    messagingSenderId: "805279121511",
    appId: "1:805279121511:web:5d4d855d9b4dbcfad154c2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.database(); 