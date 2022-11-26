import React, { Component, useState } from "react";
import { handleClick } from "../Firebase";
import DatePicker from "react-datepicker";
//trying out a date-picker (@s-palakur)
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

// import { UserAuth } from "../components/AuthContext"

const localizer = momentLocalizer(moment);
// const user = auth.currentUser;


const CreateEvent2 = () => {
  const [eventTitle, setTitle] = useState("");
  const [date, onChange] = useState(new Date());

  return (
    <div>
      <ul className="header">
        <h2>Enter your calendar event below!</h2>
        <form>
          <label>Event name:</label>
          <input
            type="text"
            required
            value={eventTitle}
            onChange={(a) => setTitle(a.target.value)} //constantly updates the state
          />
          <br />
          <label>Event date:</label>
          <DatePicker onChange={onChange} value={date} />
          <button onClick={handleClick(eventTitle, date)}>Create event!</button>
        </form>
      </ul>
      <div className="content">
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};
export default CreateEvent2;
