import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCtN7oPLgQF6EbSGdLmrpkcllnPUkM-pfM",
    authDomain: "test-app-f3dac.firebaseapp.com",
    databaseURL: "https://test-app-f3dac.firebaseio.com",
    projectId: "test-app-f3dac",
    storageBucket: "test-app-f3dac.appspot.com",
    messagingSenderId: "757905477962",
    appId: "1:757905477962:web:e85dcb1df9620277cdb1b3",
    measurementId: "G-6V8KYR2D9C"
  };

firebase.initializeApp(firebaseConfig);

const database = firebase.database();


export {firebase, database as default };