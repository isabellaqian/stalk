import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrow from "../images/left_arrow.png";
import { addFriend, firestore, getID } from "../Firebase";
import { collection, onSnapshot, doc  } from 'firebase/firestore'

import "./pages.css";

const AddFriends = () => {
  const [emails, setEmails] = useState("");
  const [error, setError] = useState(null);
  const [userArr, setUserArr] = useState([]);


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
  }, []);


  function handleSubmit(e) {
    e.preventDefault();

    //Checks to see if provided email links to an existing user (@emily)
    if (isValidEmail(emails)) {
      setEmails(e.target.value);

      if(checkValidUser(emails)) {
          //taking in email input: friends email
          addFriend(emails)
          setError(null);
          console.log("You added: ", emails)
          return;
      } else {
          setError("Not an existing user!"); 
      }
    } 
  }

  function isValidEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }
    
  //Returns true if potential friend email input by user is the email of a current user in userArr array (@emily)
  function checkValidUser(email) {
    for( let i = 0; i < userArr.length; i++) {
      if(email === userArr[i]) {
        return true;
      }
    }
    return false;
  }

  const handleChange = e => {
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
        <input
          className="addfriendsinput"
          type="text"
          id="emails"
          value={emails}
          placeholder="Enter your friend's email (only one email at a time)"
          onChange={handleChange}
        />
      </form>
        {error && <h2 style={{color: 'red'}}>{error}</h2>}
        <button className="button_accent" type="submit" onClick={handleSubmit}>
          Add
        </button>
    </div>
  );
  
};

export default AddFriends;