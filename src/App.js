import React, { Component, useState } from "react";
import "./App.css";
import { handleClick } from "./Firebase";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Landing from "./landing.js";
//trying out a date-picker (@s-palakur)
import DatePicker from "react-datepicker";

const localizer = momentLocalizer(moment);

function App() {
  //creating objects with state to represent event info
  const [eventTitle, setTitle] = useState("");
  const [date, onChange] = useState(new Date());

  return (
    <div>
      <Landing />
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
}

export default App;
