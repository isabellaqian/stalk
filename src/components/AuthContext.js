import { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // add scopes for Calendar API (what we want to access from user's Google Account)
    provider.addScope("https://www.googleapis.com/auth/calendar");
    provider.addScope("https://www.googleapis.com/auth/calendar.events");
    provider.addScope(
      "https://www.googleapis.com/auth/calendar.events.readonly"
    );
    provider.addScope("https://www.googleapis.com/auth/calendar.readonly"); // commenter @amy-al: need to check whether need readonly scopes when already have editing scopes
    provider.addScope(
      "https://www.googleapis.com/auth/calendar.settings.readonly"
    );
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    // const isThereCurrentUser = getAuth();
    // if (isThereCurrentUser == null) {
    //   setUser(null);
    //   // console.log("User is now ", isThereCurrentUser.currentUser);
    //   return;
    // }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User is now ", currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
