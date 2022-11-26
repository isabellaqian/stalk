import React, { useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../images/left_arrow.png";
import Multiselect from 'multiselect-react-dropdown';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);

const Meet = () => {

  //realisitcally, we need to get the user's friend list from the database (@alexavanh)
  const [selectedFriends, setSelectedFriends] = useState([]);
  const friendsList = ["Alexa", "Izzy", "Swetha", "Amy", "Emily"];
  const handleSelect = (selectedList, selectedItem) => {
    setSelectedFriends(selectedList);
  };

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
          options={friendsList}
          selectedValues={selectedFriends}
          placeholder="Select friends!"
        />
      </div>
      <div className="content cal">
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
