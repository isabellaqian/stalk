import React, { useState, useEffect } from "react";
import { UserAuth } from "../components/AuthContext";

import { Link } from "react-router-dom";
import arrow from "../images/left_arrow.png";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { addFriend, firestore, getID } from "../Firebase";
import { collection, onSnapshot, doc } from "firebase/firestore";

import "./pages.css";

const AddFriends = () => {
  const [emails, setEmails] = useState("");
  const [error, setError] = useState(null);
  const [userArr, setUserArr] = useState([]);
  const [friendArr, setFriendArr] = useState([]);
  const [success, setSuccess] = useState(null);

  const { user } = UserAuth();

  //Sets userArr to an array of all user emails (@emily)
  useEffect(() => {
    const userEmails = collection(firestore, "userCollection/");
    const unsubscribe = onSnapshot(userEmails, (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        users.push(doc.data().email);
      });
      setUserArr(users);
      console.log("All users: ", users.join(", "));
    });

    const friendsArrFirestore = [];
    const unsub = onSnapshot(
      doc(firestore, "userCollection/" + getID()),
      (doc) => {
        const tempArr = doc.data().friends;
        for (let i = 0; i < tempArr.length; i++) {
          friendsArrFirestore.push(tempArr[i]);
          //setting it with added helper function
        }
        setFriendArr(friendsArrFirestore);
      }
    );
    return () => unsub(); //I detached the listener here, not sure if we need it @izzy
  }, []);

  //Returns true if potential friend email input by user is the email of a current user in userArr array (@emily)
  //Added returns false if email is your own
  function checkValidUser(email) {
    if (email == user.email) {
      return false;
    }
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
        return false;
      }
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isValidEmail(emails)) {
      console.log("email is valid");
      setEmails(e.target.value);

      const usercheck = checkValidUser(emails);
      const friendcheck = checkFriend(emails);

      if (usercheck && friendcheck) {
        console.log("user is valid");
        //taking in email input: friends email
        addFriend(emails);
        setError(null);
        setSuccess("You added: " + emails + "!");
        console.log("You added: ", emails);
        return;
      } else if (!usercheck) {
        console.log("user is invalid");
        setError("Not a vaid user!");
      } else {
        console.log("This person is already your friend.");
        setError("They're already your friend!");
      }
    } else {
      console.log("email is invalid");
    }
  }

  function isValidEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  const handleChange = (e) => {
    if (!isValidEmail(e.target.value)) {
      setError("Email is invalid");
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
      <form onSubmit={handleSubmit}>
        {/* <textarea
          className="addfriendsinput"
          type="text"
          id="emails"
          value={emails}
          placeholder="Enter one email at a time. Eg. eggert@tz.ucla.edu"
          onChange={handleChange}
        /> */}
        <TextField
          id="emails"
          label="Enter one email at a time."
          value={emails}
          placeholder="keeperofthetime@g.ucla.edu"
          onChange={handleChange}
          style={{ width: "300px" }}
        />
      </form>
      {/* {error && <h2 style={{ color: "red" }}>{error}</h2>} */}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <button
        className="button_accent_small"
        type="submit"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
};

export default AddFriends;
