import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import arrow from "../images/left_arrow.png";
import Multiselect from 'multiselect-react-dropdown';
import { userCollection } from "../Firebase";
import { onSnapshot } from 'firebase/firestore'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);

const Meet = () => {
  //realistically, we need to get the user's friend list from the database (@alexavanh)
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [begin, setBegin] = useState("");
  const [end, setEnd] = useState("");
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
  useEffect(() => {
    const friendsArrFirestore = [];
    const unsub = onSnapshot(userCollection, (doc) => {
        friendsArrFirestore.push(doc.data().friends); 
        //setting it with added helper function
        setFriendArr(friendsArrFirestore);
    }); 
  return() => unsub();
  }, []);

  const handleSelect = (selectedList, selectedItem) => {
    setSelectedFriends(selectedList);
  };

  const isFormDisabled = begin.trim().length === 0 || end.trim().length === 0 || (moment(end).isBefore(begin)) || (moment(end).diff(moment(begin), 'days') > 7);

  function handleSubmit() {
    //get friends' and user's calendars within the begin and end dates and compare them
    //@s-palakur
  }

  function clear() {
    setBegin("");
    setEnd("");
  }

  return (
    <div>
      <div className="container">
        <div style={{ display: "flex" }}>
          <Link to="/dashboard">
            <img src={arrow} />
          </Link>
          <div className="h3">Meet with your friends!</div>
        </div>
      </div>
      <div className="smallerh3 padding">
        <h1>Choose friends to meet up with!</h1>
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
          placeholder="Select friends!"
        />
      </div>
      <div className="smallerh3 padding2">
        <h1>Choose the date and time range to meet</h1>
      </div>
      <div className="smallerh3 rangepickerpos">
        <form>
          <label htmlFor="start">Start date time:</label>
          <input
            type="datetime-local"
            id="start"
            value={begin}
            onChange={(e) => setBegin(e.target.value)}
          />
          <br />
          <label htmlFor="end">End date time:</label>
          <input
            type="datetime-local"
            id="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
          <button type="button" onClick={handleSubmit} disabled={isFormDisabled}>Submit</button>
          <button type="button" onClick={clear}>Clear</button>
        </form>
      </div>
      <div className="content calpos">
        <Calendar
          localizer={localizer}
          // events={}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default Meet;
