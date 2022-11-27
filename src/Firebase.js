// Configuring Firebase (@amy-al)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//Configuring Realtime Firebase database(@s-palakur)
import { getDatabase, ref, set } from "firebase/database";

// imports for firestore
import { getFirestore, doc, setDoc, Timestamp, collection, addDoc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmrEuta4P3Kp4qapI-NZVZvlaLHQSxfxY",
  authDomain: "stalk-6c0fe.firebaseapp.com",
  projectId: "stalk-6c0fe",
  storageBucket: "stalk-6c0fe.appspot.com",
  messagingSenderId: "838823308350",
  appId: "1:838823308350:web:240854399139887031b56f",
  measurementId: "G-DTE6CWB5N2",
  //added database URL - set rules to true by default
  databaseURL: "https://stalk-6c0fe-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//creating a reference to getFirestore

//adding a way to get the user.id @s-palakur 
var url;

// firestore to store user info into database when logging in (@amy-al)
// TODO: using query to double check if user exists to update data etc.

//moved some constants outside functions for fun @s-palakur
const friendArray = [];
const firestore = getFirestore(); //basically db
//userCollection - gets you the path of the current user's document
export const userCollection = doc(firestore, 'userCollection/' + getID())

//function to see if the user is signed in so we can retrieve email id @s-palakur
function getID() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user != null) {
    return user.email;
  }
}

export async function addEvent(title, summary, desc, start_d, end_d) {
  const eventsCollection = collection(firestore, 'userCollection/' + getID() + '/events')
  //Using the add() method to add random documents with the Title and Date stored
  const docRef = addDoc(eventsCollection, {
    Title: title,
    Summary: summary,
    Description: desc,
    Start: Timestamp.fromDate(new Date(start_d)),
    End: Timestamp.fromDate(new Date(end_d)),
  }).catch(err => {
    //This function catches any error that occurs during the creation of the document
    console.log("Error: " + err.message)
  })
  console.log("Document written with ID: ", docRef.id);
}

export function writeUserDoc() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const docData = { // userid that's stored in user-doc
        user: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        friends: friendArray
      };
      setDoc(userCollection, docData)
    }
  });
}

export async function addFriend(friendID) {
  //add new friend's email to const friendArray
  friendArray.push(friendID)
  //update "friends" field of docData to newFriendList (@emily-coding-kim)
  updateDoc(userCollection, { friends: friendArray })
}


// const provider = new GoogleAuthProvider();
const database = getDatabase();

// export const logInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   const user = auth.currentUser;

//   // Added this to get user info (@s-palakur) - remove necessary info later
//   //This is within this function to get auth after user logs in
//   if (user !== null) {
//     // The user object has basic properties such as display name, email, etc.
//     const displayName = user.displayName;
//     const email = user.email;
//     const photoURL = user.photoURL;
//     const emailVerified = user.emailVerified;

//     // The user's ID, unique to the Firebase project. Do NOT use
//     // this value to authenticate with your backend server, if
//     // you have one. Use User.getToken() instead.
//     const uid = user.uid;
//   }
//   return {
//     uname: user.displayName,
//     uemail: user.email,
//   };
// };

