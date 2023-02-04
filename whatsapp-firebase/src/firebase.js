import firebase from 'firebase/app';
import 'firebase/auth';       // fore authntication
import 'firebase/storage';    //fore storage
import 'firebase/database';   // fore realtime database
import 'firebase/firestore';  //for cloud firestore
const firebaseConfig = {
  apiKey: "AIzaSyARpAY9t3Hu0vZX3dO_AyYU35jMdADi1Vk",
  authDomain: "whatsapp--firebase-yt.firebaseapp.com",
  projectId: "whatsapp--firebase-yt",
  storageBucket: "whatsapp--firebase-yt.appspot.com",
  messagingSenderId: "821148308012",
  appId: "1:821148308012:web:4ca527e715f8786d643789"
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider}
export default db
 