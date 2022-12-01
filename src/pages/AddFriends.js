import React, { useState, useEffect } from "react";
import { UserAuth } from "../components/AuthContext";

import { Link } from "react-router-dom";
import arrow from "../images/left_arrow.png";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { addFriend, firestore, getID } from "../Firebase";
import { collection, onSnapshot, doc } from "firebase/firestore";
import FriendList from "../components/FriendList";

import "./pages.css";

const AddFriends = () => {
  const [emails, setEmails] = useState("");
  const [error, setError] = useState(null);
  const [userArr, setUserArr] = useState([]);
  const [friendArr, setFriendArr] = useState([]);
  const [success, setSuccess] = useState(null);

  const { user } = UserAuth();

  useEffect(() => {
    //Get all users here (@emily)
    const userCollection = collection(firestore, "userCollection/");
    const userList = [];
    const unsubscribe = onSnapshot(userCollection, (snapshot) => {
      snapshot.forEach((doc) => {
        console.log("user: ", doc.data().email);
        userList.push(doc.data().email);
      });
      setUserArr(userList);
      console.log("All users in userList: ", userArr.join(", "));
    });

    //Get a list of your friends (@emily)
    const friendCollection = collection(firestore, 'userCollection/' + getID() + '/friends');
    const friendList = [];
    const unsub = onSnapshot(friendCollection, (snapshot) => {
      snapshot.forEach((doc) => {
        friendList.push(doc.data().emailID);
      });
      setFriendArr(friendList);
    });

  }, []);


  function handleSubmit(e) {
    e.preventDefault();

    //Checks to see if provided email links to an existing user (@emily)
    if (isValidEmail(emails)) {
      setEmails(e.target.value);

      if (checkValidUser(emails)) {
        if (checkFriend(emails)) {
          setError("You're already friends with " + emails + "!");
          setSuccess(null);
          return;
        }
          //taking in email input: friends email
          addFriend(emails);
          setError(null);
          setSuccess("You added: " + emails + "!");
          console.log("You added: ", emails);
          return;
      } else {
          setError("Not an existing user!"); 
          setSuccess(null);
      }
    } 
  }

  function isValidEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }
    
  //Returns true if potential friend email input by user is the email of a current user in userArr array (@emily)
  function checkValidUser(email) {
    for (let i = 0; i < userArr.length; i++) {
      if (email === userArr[i]) {
        return true;
      }
    }
    return false;
  }

  function checkFriend(email) {
    for (let i = 0; i < friendArr.length; i++) {
      if (email === friendArr[i]) {
        return true;
      }
    }
    return false;
  }

  const handleChange = (e) => {
    if (!isValidEmail(e.target.value)) {
      setError("Email is invalid");
      setSuccess(null);
    } else {
      setError(null);
    }

    setEmails(e.target.value);
  };

  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <Link to="/dashboard">
          <img src={arrow} />
        </Link>
        <div className="h3">Add friends</div>
      </div>
      <div
        className="custom-centered"
        style={{ width: "50%", paddingTop: "20px" }}
      >
        <TextField
          id="emails"
          label="Enter one email at a time."
          value={emails}
          placeholder="keeperofthetime@g.ucla.edu"
          onChange={handleChange}
          fullWidth
          style={{ width: "300px" }}
        />

      {/* {error && <h2 style={{ color: "red" }}>{error}</h2>} */}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <button
          className="button_accent_small custom-centered"
          type="submit"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
    <div>
        <FriendList/>
      </div>
    </div>
  );
  
};

export default AddFriends;
