import React, { Component, useState } from "react";
import { handleClick } from "../Firebase";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);

export default function CreateEvent() {
  const [eventTitle, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    handleClick(eventTitle, start);
    //now need to display events on calendar
    // return {

    // }
  }

  //make sure the event title and start/end dates are inputted or else you can't create the event (@alexavanh)
  const isFormDisabled = eventTitle.trim().length === 0 || start.trim().length === 0 || end.trim().length === 0;

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
            onChange={(e) => setTitle(e.target.value)} //constantly updates the state
          />
          <br />
          <label htmlFor="summary">Summary:</label>
          <input
            type="text"
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <br />
          <label htmlFor="description">Description:</label>
          <input 
            className="inputbox"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label htmlFor="start">Start date time:</label>
          <input
            type="datetime-local"
            id="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <br />
          <label htmlFor="end">End date time:</label>
          <input
            type="datetime-local"
            id="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
          <button onClick={handleSubmit} disabled={isFormDisabled}>Create event!</button>
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
