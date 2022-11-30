import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrow from "../images/left_arrow.png";
import Multiselect from "multiselect-react-dropdown";
import { getID, getFriendEvents, firestore } from "../Firebase";
import { onSnapshot, collection, getFirestore, doc, Timestamp } from "firebase/firestore";
import MyCalendar from "../components/MyCalendar";
import moment from "moment";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { findBusyTimes } from "../findBusyTimes";

const Meet = () => {
  //realistically, we need to get the user's friend list from the database (@alexavanh)
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [eventTitle, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [friendArr, setFriendArr] = useState([]);
  
  //added friend list with set function to update friends list from Firebase (@s-palakur)
  const [startArrayConst, setStartArr] = useState([]);
  const [endArrayConst, setEndArr] = useState([]);


  // can successfully retrieve the friends list from firestore @s-palakur
  //fixed bug where userCollection was imported not redeclared as a DOC
  const db = getFirestore();
  useEffect(() => {
    //Get all users here (@emily)
    const friendCollection = collection(firestore, 'userCollection/' + getID() + '/friends');
    const friendsArrFirestore = [];
    const unsubscribe = onSnapshot(friendCollection, (snapshot) => {
      snapshot.forEach((doc) => {
      friendsArrFirestore.push(doc.data().emailID);
      });
      setFriendArr(friendsArrFirestore);
    });
  }, []);

  const handleSelect = (selectedList, selectedItem) => {
    setSelectedFriends(selectedList);
  };

  const isFormDisabled =
    start.trim().length === 0 ||
    end.trim().length === 0 ||
    moment(end).isBefore(start);

    function handleSubmit() {
      //empty temp arrays that will be added to
      let startArr = [];
      let endArr = [];
      console.log(selectedFriends);
      //local functions that will be updated with useState  
      const tempList = selectedFriends;
      console.log("lsit of selected friends" + tempList);
      //tempList.push(getID());
      console.log("List of friends and yourself: " + tempList);
      //converting objects to Timestamp
      const tsStart = Timestamp.fromDate(new Date(start + "T00:00"));
      console.log("start", start)
      const tsEnd = Timestamp.fromDate(new Date(end + "T23:59"));
      console.log("end", end)
      //probs dont need templist as map doesnt modify original array
  
      const resultEvents = tempList.map((email) => {
      //redefining these variables - if it doesn't work also make an array of 
      //const collections to iterate through (@s-palakur)
  
      //ASYNC function that updates startArray and stop array, might have to add const (?)
      //OR USE SET FUNCTION! to update the array 
        getFriendEvents(email, tsStart, tsEnd).then((returnObj) => {
          startArr.push(...returnObj[0])
          endArr.push(...returnObj[1])
          setStartArr(startArr);
          setEndArr(endArr);
          return returnObj;
        })
        .catch((err)=>console.log(err));
      })
    }
  
    //THIS WORKS yay @s-palakur (works outside the array)
    console.log("this is startarr", startArrayConst)
    console.log("this is endArr", endArrayConst)
  
    // useEffect(() => {
    //   return(busyTimes) => {findBusyTimes(startArrayConst, endArrayConst);
  
    //   };
    // }, []);
  
  function clear() {
    setTitle("");
    setDescription("");
    setStart("");
    setEnd("");
  }

  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <Link to="/dashboard">
          <img src={arrow} />
        </Link>
        <div className="h3">Find the best time to meet with your friends!</div>
      </div>
      <Stack spacing={2}>
        <Multiselect
          className="set_roboto"
          isObject={false}
          onRemove={(event) => {
            console.log(event);
          }}
          onSelect={handleSelect}
          options={friendArr}
          selectedValues={selectedFriends} //values must be passed to get events
          placeholder="I want to meet with..."
          style={{ height: "40px" }}
        />
        <TextField
          // id="outlined-textarea"
          label="We are meeting for..."
          required
          placeholder="CS35L Hack"
          value={eventTitle}
          // style={{ "padding-bottom": "10px" }}
          onChange={(e) => setTitle(e.target.value)} //constantly updates the state
        />

        <TextField
          // id="outlined-textarea"
          label="Description (optional)"
          placeholder="Plan: grind for 5 hours straight."
          value={description}
          onChange={(e) => setDescription(e.target.value)} //constantly updates the state
        />
        <TextField
          type="datetime-local"
          id="start"
          required
          label="Look for a time from"
          value={start}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setStart(e.target.value)}
        />

        <TextField
          type="datetime-local"
          id="end"
          label="To"
          value={end}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setEnd(e.target.value)}
        />
        <div>
          <button
            className="button_accent_small"
            onClick={handleSubmit}
            disabled={isFormDisabled}
          >
            Check times
          </button>
          <button className="button_white_small" onClick={clear}>
            Clear input
          </button>
        </div>
      </Stack>
      {/* <div className="smallerh3 padding">
        <h1>I want to meet with...</h1>
      </div>
      <div className="multiselect">
        <Multiselect
          isObject={false}
          onRemove={(event) => {
            console.log(event);
          }}
          onSelect={handleSelect}
          options={friendArr}
          selectedValues={selectedFriends} //values must be passed to get events
          placeholder="Select friends"
        />
      </div>

      <table id="create-event-table" style={{ "padding-top": "20px" }}>
        <thead>
          <tr>
            <th colSpan={5}>When do you want to meet?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan={2}>Between</th>
            <td colSpan={3}>
              <input
                type="date"
                id="start"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th colSpan={2}>and</th>
            <td colSpan={3}>
              <input
                type="date"
                id="end"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </td>
          </tr>
        </tbody>

        <tr>
          <th colSpan={5}>
            <button
              className="button_accent_small"
              onClick={handleSubmit}
              disabled={isFormDisabled}
            >
              Find times!
            </button>
            <button className="button_white_small" onClick={clear}>
              Clear input
            </button>
          </th>
        </tr>
      </table> */}
      <div className="content calpos">
        <MyCalendar />
      </div>
    </div>
  );
};

export default Meet;
