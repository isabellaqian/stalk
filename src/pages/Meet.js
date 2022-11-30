import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrow from "../images/left_arrow.png";
import Multiselect from "multiselect-react-dropdown";
import { getID } from "../Firebase";
import { onSnapshot, getFirestore, doc } from "firebase/firestore";
import MyCalendar from "../components/MyCalendar";
import moment from "moment";

import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
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
  const [displayStart, setDisplayStart] = useState("");
  const [displayEnd, setDisplayEnd] = useState("");

  //added friend list with set function to update friends list from Firebase (@s-palakur)
  const [friendArr, setFriendArr] = useState([]);

  //getting friendsList from the database @s-palakur for async stuff
  // var f = [];
  // getFriendsList()
  //   .then((val) => {
  //     console.log("inside loop" + val);
  //     f = val;
  //     console.log("this is f" + f)

  //   })
  //   .catch((err =>
  //     console.log(err)));

  //the key was - to use useEffect!
  // can successfully retrieve the friends list from firestore @s-palakur
  //fixed bug where userCollection was imported not redeclared as a DOC
  useEffect(() => {
    const friendsArrFirestore = [];
    const db = getFirestore();
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
    //get friends' and user's calendars within the begin and end dates and compare them
    //@s-palakur
  }

  function clear() {
    console.log("end is", end);
    setTitle("");
    setDescription("");
    setStart("");
    setEnd("");
    setDisplayStart("");
    setDisplayEnd("");
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
          value={displayStart}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setStart(e.target.value + "T00:00");
            setDisplayStart(e.target.value);
          }}
        />
        {/* <span>{start}</span> */}
        <TextField
          type="date"
          id="end"
          label="To"
          value={displayEnd}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setEnd(e.target.value + "T00:00");
            setDisplayEnd(e.target.value);
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
        <MyCalendar busyTimes={testTimes} />
      </div>
    </div>
  );
};

export default Meet;
