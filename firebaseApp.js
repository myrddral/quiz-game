import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC2Vq5pUyRk6yBv6R4CG1fe51AoPIMuTg4",
    authDomain: "quiz-game-7f747.firebaseapp.com",
    projectId: "quiz-game-7f747",
    storageBucket: "quiz-game-7f747.appspot.com",
    messagingSenderId: "58245694364",
    appId: "1:58245694364:web:40b39344391532ca14be59",
    measurementId: "G-XQMVKBMJLN",
  };
  
firebase.initializeApp(firebaseConfig);

export { firebase };