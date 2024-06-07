// Import the functions you need from the SDKs you need

import { getStorage } from "firebase/storage";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDOGc4O4_1TKNeSMMrWRw8dJxcNiqcbefc",
  authDomain: "doctors-portal-efba6.firebaseapp.com",
  projectId: "doctors-portal-efba6",
  storageBucket: "doctors-portal-efba6.appspot.com",
  messagingSenderId: "748362349775",
  appId: "1:748362349775:web:aee0656884f7ff68bdcbba",
  measurementId: "G-LXY3QWLZGS"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);

export default auth;
