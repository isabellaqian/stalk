import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrow from "../images/left_arrow.png";
import Multiselect from "multiselect-react-dropdown";
import {
  getID,
  getFriendEvents,
  firestore,
  holdSlotTimes,
  holdSelectedFriends,
} from "../Firebase";
import {
  onSnapshot,
  collection,
  getFirestore,
  doc,
  Timestamp,
} from "firebase/firestore";
import MyCalendar from "../components/MyCalendar";
import moment from "moment";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { findBusyTimes } from "../findBusyTimes";
import AddEventDialog from "../components/AddEventDialog";

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
  const [busyArr, setBusyArr] = useState([]);
  const [count, setCount] = useState(0);

  const [friendArr, setFriendArr] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  //added friend list with set function to update friends list from Firebase (@s-palakur)
  const [startArrayConst, setStartArr] = useState([]);
  const [endArrayConst, setEndArr] = useState([]);
  const [defaultDate, setDefaultDate] = useState("");
  const [canSelectCal, setCanSelectCal] = useState(false);
  //   const defaultDate = new Date(2020, 7, 15);

  // can successfully retrieve the friends list from firestore @s-palakur
  //fixed bug where userCollection was imported not redeclared as a DOC
  useEffect(() => {
    //Get all users here (@emily)
    const friendCollection = collection(
      firestore,
      "userCollection/" + getID() + "/friends"
    );
    const friendsArrFirestore = [];
    const unsubscribe = onSnapshot(friendCollection, (snapshot) => {
      snapshot.forEach((doc) => {
        friendsArrFirestore.push(doc.data().emailID);
      });
      setFriendArr(friendsArrFirestore);
    });
    return () => unsubscribe();
  }, []);

  const handleSelect = (selectedList, selectedItem) => {
    setSelectedFriends(selectedList);
  };

  const isFormDisabled =
    start.trim().length === 0 ||
    end.trim().length === 0 ||
    moment(end).isBefore(start);

  function handleSubmit() {
    // set where the calendar view starts at and if you can select it to add events
    setDefaultDate(new Date(start + "T00:00"));
    setCanSelectCal(true);

    //empty temp arrays that will be added to
    let startArr = [];
    let endArr = [];
    console.log(selectedFriends);
    //local functions that will be updated with useState
    const tempList = selectedFriends;
    // console.log("lsit of selected friends" + tempList);
    //tempList.push(getID());
    // console.log("List of friends and yourself: " + tempList);
    //converting objects to Timestamp
    const tsStart = Timestamp.fromDate(new Date(start + "T00:00"));
    const tsEnd = Timestamp.fromDate(new Date(end + "T23:59"));
    console.log("start", start);
    console.log("end", end);
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
          if (email === tempList[tempList.length - 1]) setCount(count + 1);
          return returnObj;
        })
        .catch((err) => console.log(err));
    });
  }

  //THIS WORKS yay @s-palakur (works outside the array)
  console.log("this is startarr", startArrayConst);
  console.log("this is endArr", endArrayConst);

  useEffect(() => {
    console.log(count);
    console.log("this is startarr in func", startArrayConst);
    console.log("this is endArr in func", endArrayConst);
    const arr = findBusyTimes(startArrayConst, endArrayConst);
    setBusyArr(arr);
    console.log("This is the busy array" + busyArr);
  }, [count]);

  function clear() {
    setTitle("");
    setDescription("");
    setStart("");
    setEnd("");
    setDefaultDate("");
  }

  const handleSelectSlot = ({ start, end }) => {
    //start and end here are the start and end timestamps of your selected slot
    setOpenDialog(true);
    console.log(start, " ", end);
    holdSlotTimes(start, end);
    holdSelectedFriends(selectedFriends);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <Link to="/dashboard">
          <img src={arrow} />
        </Link>
        <div className="h3">Find the best time to meet with your friends!</div>
      </div>
      <AddEventDialog open={openDialog} handleClose={handleCloseDialog} />
      <Stack spacing={2} className="custom-centered" style={{ width: "60%" }}>
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
          style={{
            chips: {
              background: "#e05927",
            },
          }}
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
            setEnd(e.target.value);
          }}
        />
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
      <div className="content calpos cal">
        <MyCalendar
          key={canSelectCal}
          busyTimes={testTimes}
          selectable={canSelectCal}
          handleSelectSlot={handleSelectSlot}
          defaultDate={defaultDate}
        />
      </div>
    </div>
  );
};

export default Meet;
