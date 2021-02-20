import firebase from 'firebase';
import fs from 'fs';

//CSERÉLD LE A SAJÁT APPOD CONFIG OBJECTJÉRE!
const firebaseConfig = {
    apiKey: "AIzaSyC2Vq5pUyRk6yBv6R4CG1fe51AoPIMuTg4",
    authDomain: "quiz-game-7f747.firebaseapp.com",
    projectId: "quiz-game-7f747",
    storageBucket: "quiz-game-7f747.appspot.com",
    messagingSenderId: "58245694364",
    appId: "1:58245694364:web:40b39344391532ca14be59",
    measurementId: "G-XQMVKBMJLN"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

firebase
  .auth()
  .signInAnonymously()
  .then(() => {
    console.log('signed in');
  })
  .catch((error) => {
    console.error(error);
  });

const fileName = './quiz_app.hu.json';
let content = [];

fs.readFile(fileName, function read(err, data) {
  if (err) {
    throw err;
  }

  content = JSON.parse(data);
  for (let question of content.questions) {

      db.collection('questions')
        .add(question)
        .then(() => {
            console.log('Document written');
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
        });
  }

});



// firebase.auth().onAuthStateChanged(async (user) => {
//   if (user) {
//     const restaurants = Object.keys(content);

//     for (let i = 0; i < restaurants.length; i++) {
//       db.collection('restaurant')
//         .doc(restaurants[i])
//         .set(content[restaurants[i]])
//         .then(() => {
//           console.log('Document written');
//         })
//         .catch((error) => {
//           console.error('Error adding document: ', error);
//         });
//     }
//   } else {
//     console.log('no user');
//   }
// });

// -----------------------
// A Fenti kódhoz ne nyúlj!
// -----------------------