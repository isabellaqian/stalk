import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrow from "../images/left_arrow.png";
import { addFriend, getFriends, friendsExist, getAllUsers, firestore, getID } from "../Firebase";
import { collection, onSnapshot, doc  } from 'firebase/firestore'

import "./pages.css";

const AddFriends = () => {
  const [emails, setEmails] = useState("");
  const [error, setError] = useState(null);
  const [userArr, setUserArr] = useState([]);
  const [friendArr, setFriendArr] = useState([]);


  useEffect(() => {
    // console.log("useEffect AddFriends");
    // //Sets userArr to an array of all user emails (@emily)
    // const users = getAllUsers();
    // const tempUsers = [];
    // for( let i = 0; i < users.length; i++) {
    //   tempUsers.push(users[i]);
    // }
    // setUserArr(tempUsers);
    //  console.log("All users in AddFriends.js: ", tempUsers.join(", "));

    // //Sets friendArr to an arry of all user's friends' emails (@emily)
    // const friendIDs = getFriends();
    // const tempFriends = [];
    // for( let i = 0; i < friendIDs.length; i++) {
    //   tempFriends.push(friendIDs[i]);
    // }
    // setFriendArr(tempFriends);
    // console.log("All Friends: ", tempFriends.join(", "));

  }, []);

  // //Returns true if potential friend email input by user is the email of a current user in userArr array (@emily)
  // function checkValidUser(email) {
  //   for( let i = 0; i < userArr.length; i++) {
  //     if(email === userArr[i]) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // function checkFriend(email) {
  //   for( let i = 0; i < friendArr.length; i++) {
  //     if(email === friendArr[i]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  function handleSubmit(e) {
    e.preventDefault();
    // if (isValidEmail(emails)) {
    //   console.log("email is valid");
    //   setEmails(e.target.value);

    //   const usercheck = checkValidUser(emails);
    //   const friendcheck = checkFriend(emails);

      //if(usercheck && friendcheck) {
        console.log("user is valid");
        //taking in email input: friends email
        addFriend(emails)
        setError(null);
        console.log("You added: ", emails)
        return;
    //   }
    //   else if(!usercheck) {
    //     console.log("user is invalid");
    //     setError("Not a vaid user!");
    //   }else {
    //     console.log("This person is already your friend.");
    //     setError("They're already your friend!");
    //   }
    // } else { console.log("email is invalid"); }
  }

  function isValidEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
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