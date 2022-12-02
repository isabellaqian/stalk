// Configuring Firebase (@amy-al)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//Configuring Realtime Firebase database(@s-palakur)
import { getDatabase, ref, set } from "firebase/database";

// imports for firestore
import {
  getFirestore,
  doc,
  setDoc,
  Timestamp,
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { get } from "lodash";

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

// firestore to store user info into database when logging in (@amy-al)
// TODO: using query to double check if user exists to update data etc.

//function to see if the user is signed in so we can retrieve email id @s-palakur
export function getID() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user != null) {
    // console.log(user.email);
    return user.email;
  }
  return "no user";
}

//moved some constants outside functions for fun @s-palakur
export const firestore = getFirestore(); //basically db

//holds slotTimes, used only in AddEventDialog.js
export var slotTimes = [];

//holds selectedFriends from Meet.js, used only in AddEventDialog.js
export var selectedFriends = [];

export async function addEvent(title, desc, start_d, end_d, loca) {
  const eventsCollection = collection(
    firestore,
    "userCollection/" + getID() + "/events"
  );
  //Using the add() method to add random documents with the Title and Date stored
  const docRef = addDoc(eventsCollection, {
    Title: title,
    Description: desc,
    Start: Timestamp.fromDate(new Date(start_d)),
    End: Timestamp.fromDate(new Date(end_d)),
    Type: "personal",
    Author: getID(),
    Location: loca,
  }).catch((err) => {
    //This function catches any error that occurs during the creation of the document
    console.log("Error: " + err.message);
  });
  console.log("Document written with ID: ", docRef.id);
}

export async function addEventToFriends(
  friendID,
  title,
  desc,
  start_d,
  end_d,
  loca,
  selectedFriends
) {
  const eventsCollection = collection(
    firestore,
    "userCollection/" + friendID + "/events"
  );
  const friends = selectedFriends.join(", ");
  //Using the add() method to add random documents with the Title and Date stored
  const docRef = addDoc(eventsCollection, {
    Title: title,
    Description: desc,
    Start: Timestamp.fromDate(new Date(start_d)),
    End: Timestamp.fromDate(new Date(end_d)),
    Type: "group",
    Author: getID(),
    Location: loca,
    Friends: friends,
  }).catch((err) => {
    //This function catches any error that occurs during the creation of the document
    console.log("Error: " + err.message);
  });
  console.log("Successfully added to " + friendID + "'s events collection");
}

export function writeUserDoc() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    const userCollection = doc(firestore, "userCollection/" + user.email);
    if (user) {
      const docData = {
        // userid that's stored in user-doc
        user: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      setDoc(userCollection, docData);
    }
  });
}

//Adds friends as documents under friends collection (@emily)
export async function addFriend(friendID) {
  const friendCollection = doc(
    firestore,
    "userCollection/" + getID() + "/friends/" + friendID
  );

  const docData =
    (friendCollection,
    {
      emailID: friendID,
    });
  setDoc(friendCollection, docData);
  console.log("Document written with ID: ", docData.id);
}

// export async function getFriendEvents(eventColl, startArr, endArr, tsStart, tsEnd) {
//   const q = query(eventColl, where("Start", ">=", tsStart), where("Start", "<=", tsEnd));

//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     startArr.push(doc.data().Start);
//     endArr.push(doc.data().End);
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });

// }
export async function getFriendEvents(email, tsStart, tsEnd) {
  const eventColl = collection(
    firestore,
    "userCollection/" + email + "/events"
  );
  const q = query(
    eventColl,
    where("Start", ">=", tsStart),
    where("Start", "<=", tsEnd)
  );
  let startArr = [];
  let endArr = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const d = doc.data();
    startArr.push(doc.data().Start);
    endArr.push(doc.data().End);
    console.log("in firebase ", doc.id, " => ", doc.data());
  });
   //second query added @s-palakur
   const q2 = query(eventColl, where("End", ">=", tsStart), where("End", "<=", tsEnd));
   const querySnapshot2 = await getDocs(q2);
   querySnapshot2.forEach((doc) => {
     if (!(startArr.includes(doc.data().Start) && endArr.includes(doc.data().End))) {
       startArr.push(doc.data().Start);
       endArr.push(doc.data().End);
     }
     console.log("in firebase ", doc.id, " => ", doc.data());
   });

  return [startArr, endArr];
}

//used to store the slot times the user created in the Meet page @alexavanh
//slotTimes[0] and [1] are start/end timestamp objects
//slotTimes[2] and [3] are start/end isostrings that datetime pickers take
export async function holdSlotTimes(start, end) {
  if (slotTimes.length === 0) {
    slotTimes.push(start);
    slotTimes.push(end);
    slotTimes.push(start.toISOString().split(".")[0]);
    slotTimes.push(end.toISOString().split(".")[0]);
  } else {
    slotTimes = [];
    slotTimes.push(start);
    slotTimes.push(end);
    slotTimes.push(start.toISOString().split(".")[0]);
    slotTimes.push(end.toISOString().split(".")[0]);
  }
  // console.log(start);
  // console.log(start.toISOString());
  // console.log(start.toJSON());

  // console.log(slotTimes[2]);
}

//used to store the selected friends from the Meet page @alexavanh
export async function holdSelectedFriends(friendList) {
  if (selectedFriends.length === 0) {
    selectedFriends.push(getID());
    friendList.forEach((friend) => {
      selectedFriends.push(friend);
    });
  } else {
    selectedFriends = [getID()];
    friendList.forEach((friend) => {
      selectedFriends.push(friend);
    });
  }
}

export async function deleteEvent(id) {
  await deleteDoc(doc(firestore, 'userCollection/' + getID() + '/events/', id));
}


// export async function getAllUsers() {
//   console.log("run getAllUsers");
//   const userCollection = collection(firestore, "userCollection/");
//   const userList = [];
//   const unsubscribe = onSnapshot(userCollection, (snapshot) => {
//     snapshot.forEach((doc) => {
//       console.log("user: ", doc.data().email);
//       userList.push(doc.data().email);
//     });
//     console.log("All users: ", userList.join(", "));
//     return userList;
//   });
// }

// export async function friendsExist() {
//   const friendCollection = collection(firestore, '/userCollection' + getID() + '/friends');
//   const colSnapshot = await getDocs(friendCollection);

//   if(colSnapshot.empty) {
//     console.log("You have no friends!");
//     return false;
//   } else {
//     console.log("Already has friends");
//     return true;
//   }
// }

// export async function getFriends() {
//   const friendCollection = collection(firestore, '/userCollection' + getID() + '/friends');
//   const friendList = [];
//   const unsubscribe = onSnapshot(friendCollection, (snapshot) => {
//     snapshot.forEach((doc) => {
//       friendList.push(doc.data().emailID);
//     });
//   });
//   return friendList;
// }

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
