import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrow from "../images/left_arrow.png";
import { addFriend, firestore } from "../Firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import "./pages.css";

const AddFriends = () => {
  const [emails, setEmails] = useState("");
  const [error, setError] = useState(null);
  const [userArr, setUserArr] = useState([]);

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
  }, []);

  //Returns true if potential friend email input by user is the email of a current user in userArr array (@emily)
  function checkValidUser(email) {
    for (let i = 0; i < userArr.length; i++) {
      if (email === userArr[i]) {
        return true;
      }
    }
    return false;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isValidEmail(emails)) {
      console.log("email is valid");
      setEmails(e.target.value);

      if (checkValidUser(emails)) {
        console.log("user is valid");
        //taking in email input: friends email
        addFriend(emails);
        setError(null);
        console.log("You added: ", emails);
        return;
      } else {
        console.log("user is invalid");
        setError("Not a vaid user!");
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
        <textarea
          className="addfriendsinput"
          type="text"
          id="emails"
          value={emails}
          placeholder="Enter one email at a time. Eg. eggert@tz.ucla.edu"
          onChange={handleChange}
        />
      </form>
      {error && <h2 style={{ color: "red" }}>{error}</h2>}
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
