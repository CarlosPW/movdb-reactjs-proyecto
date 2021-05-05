import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
	apiKey: "AIzaSyDMw1jhDq6Id3M2d0zgvhkM4RpRbNKR_PI",
	authDomain: "movieapp-proyectoreact.firebaseapp.com",
	projectId: "movieapp-proyectoreact",
	storageBucket: "movieapp-proyectoreact.appspot.com",
	messagingSenderId: "58744835642",
	appId: "1:58744835642:web:134b7a550d34b6f251af03",
	measurementId: "G-1JK5BZQRKW",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
