import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrow from "../images/left_arrow.png";
import Multiselect from "multiselect-react-dropdown";
import { getID, getFriendEvents } from "../Firebase";
import { onSnapshot, getFirestore, doc, Timestamp } from "firebase/firestore";
import MyCalendar from "../components/MyCalendar";
import moment from "moment";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

//hard coding busy times
const testTimes = [
  {
    start: new Date("2022-11-29T13:00"),
    end: new Date("2022-11-29T15:00"),
    title: "Busy",
  },
  {
    start: new Date("2022-11-29T17:00"),
    end: new Date("2022-11-29T18:00"),
    title: "Busy",
  },
];

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

  const defaultDate = new Date(2020, 7, 15);

  // can successfully retrieve the friends list from firestore @s-palakur
  //fixed bug where userCollection was imported not redeclared as a DOC
  const db = getFirestore();
  useEffect(() => {
    const friendsArrFirestore = [];
    const unsub = onSnapshot(doc(db, "userCollection/" + getID()), (doc) => {
      const tempArr = doc.data().friends;
      for (let i = 0; i < tempArr.length; i++) {
        friendsArrFirestore.push(tempArr[i]);
        //setting it with added helper function
      }
      setFriendArr(friendsArrFirestore);
    });
    return () => unsub();
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
    tempList.push(getID());
    console.log("List of friends and yourself: " + tempList);
    //converting objects to Timestamp
    const tsStart = Timestamp.fromDate(new Date(start));
    const tsEnd = Timestamp.fromDate(new Date(end));
    //probs dont need templist as map doesnt modify original array

    const resultEvents = tempList.map((email) => {
      //redefining these variables - if it doesn't work also make an array of
      //const collections to iterate through (@s-palakur)

      //ASYNC function that updates startArray and stop array, might have to add const (?)
      //OR USE SET FUNCTION! to update the array
      getFriendEvents(email, tsStart, tsEnd)
        .then((returnObj) => {
          startArr.push(...returnObj[0]);
          endArr.push(...returnObj[1]);
          setStartArr(startArr);
          setEndArr(endArr);
          return returnObj;
        })
        .catch((err) => console.log(err));
    });
    // when sending start and end dates,  + "T00:00" for datetime format
  }

  //THIS WORKS yay @s-palakur (works outside the array)
  console.log("this is startarr", startArrayConst);
  console.log("this is endArr", endArrayConst);

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
          type="date"
          id="start"
          required
          label="Look for a date from"
          value={start}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setStart(e.target.value);
          }}
        />
        {/* <span>{start}</span> */}
        <TextField
          type="date"
          id="end"
          label="To"
          value={end}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setEnd(e.target.value);
          }}
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
      <div className="content calpos set_mono">
        <MyCalendar busyTimes={testTimes} defaultDate={defaultDate} />
      </div>
    </div>
  );
};

export default Meet;
