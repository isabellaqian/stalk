// Configuring Firebase (@amy-al)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

//Configuring Realtime Firebase database(@s-palakur)
import { getDatabase, ref, set } from "firebase/database";

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

export function handleClick(t, d) {
  const db = getDatabase(); //still have to figure out how to pass in the email
  //make it mandatory to sign in
  set(ref(db), {
    Title: t,
    Date: d,
  });

  //added following code to display on calendar, not sure if it should go here? (@alexavanh)
  return {
    
  }
}
