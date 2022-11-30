import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrow from "../images/left_arrow.png";
import Multiselect from "multiselect-react-dropdown";
import { getID, getFriendEvents, getFriendEvents2 } from "../Firebase";
import { onSnapshot, getFirestore, doc, Timestamp, collection } from "firebase/firestore";
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
  //added the array with ALL START/END times for ALL FRIENDS @s-palakur 
  //added with useState so it can be accessed outside of the function/useEffect!
  const[ret, setRetArr] = useState([]);

  // can successfully retrieve the friends list from firestore @s-palakur
  //fixed bug where userCollection was imported not redeclared as a DOC
  const db = getFirestore();
  useEffect(() => {
    const friendsArrFirestore = [];
    const unsub = onSnapshot(doc(db, 'userCollection/' + getID()), (doc) => {
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
    begin.trim().length === 0 ||
    end.trim().length === 0 ||
    moment(end).isBefore(begin);

function handleSubmit() {
    //empty temp arrays that will be added to
    let startArr = [];
    let endArr = [];
    //local functions that will be updated with useState  
    const tempList = ["alexavanh03@g.ucla.edu"];
    console.log("lsit of selected friends" + tempList);
    tempList.push(getID());
    console.log("List of friends and yourself: " + tempList);
    //variables can only be declared once with let
    const a ="2022-11-27T14:00"; //alexa should have one event between these times
    const b ="2022-11-29T14:00";
    const tsStart = Timestamp.fromDate(new Date(a));
    const tsEnd = Timestamp.fromDate(new Date(b));
    //probs dont need templist as map doesnt modify original array

    const resultEvents = tempList.map((email) => {
    //redefining these variables - if it doesn't work also make an array of 
    //const collections to iterate through (@s-palakur)

    //ASYNC function that updates startArray and stop array, might have to add const (?)
    //OR USE SET FUNCTION! to update the array 
      getFriendEvents2(email, tsStart, tsEnd).then((returnObj) => {
        startArr.push(...returnObj[0])
        endArr.push(...returnObj[1])
        return returnObj;
      })
      .catch((err)=>console.log(err));
    })

    console.log("this is startarr", startArr)
    console.log("this is endArr", endArr)
  }

  
  function clear() {
    setBegin("");
    setEnd("");
  }

  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <Link to="/dashboard">
          <img src={arrow} />
        </Link>
        <div className="h3">Meet with your friends!</div>
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
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isFormDisabled}
          >
            Submit
          </button>
          <button type="button" onClick={clear}>
            Clear
          </button>
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
