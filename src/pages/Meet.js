import React, { useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../images/left_arrow.png";
import Multiselect from "multiselect-react-dropdown";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);

const Meet = () => {
  //realisitcally, we need to get the user's friend list from the database (@alexavanh)
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [begin, setBegin] = useState("");
  const [end, setEnd] = useState("");
  const friendsList = ["Alexa", "Izzy", "Swetha", "Amy", "Emily"];
  const handleSelect = (selectedList, selectedItem) => {
    setSelectedFriends(selectedList);
  };

  const isFormDisabled =
    begin.trim().length === 0 ||
    end.trim().length === 0 ||
    moment(end).isBefore(begin);

  function handleSubmit() {
    //need to get friends' and user's calendars within the begin and end dates and compare them
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
          options={friendsList}
          selectedValues={selectedFriends}
          placeholder="Select friends!"
        />
        <div className="smallerh3 padding2">
          <h1>Choose the date and time to meet</h1>
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
    </div>
  );
};

export default Meet;
