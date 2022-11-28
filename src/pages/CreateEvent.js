import React, { useEffect, useState } from "react";
import { addEvent, firestore } from "../Firebase";
import moment from "moment";

import MyCalendar from "../components/MyCalendar";

export default function CreateEvent() {
  const [eventTitle, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    //adding new entries to store new incoming data in firestore database @s-palakur
    addEvent(eventTitle, description, start, end);
  }

  function clear() {
    setTitle("");
    setDescription("");
    setStart("");
    setEnd("");
  }

  //make sure the event title and start/end dates are inputted or else you can't create the event (@alexavanh)
  const isFormDisabled =
    eventTitle.trim().length === 0 ||
    start.trim().length === 0 ||
    end.trim().length === 0 ||
    moment(end).isBefore(start);
  const [test, setTest] = useState([]);

  return (
    <div className="container">
      <table id="create-event-table">
        <thead>
          <tr>
            <th colSpan={2}>Enter your calendar event below!</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Event Name:</th>
            <td>
              <input
                type="text"
                required
                value={eventTitle}
                onChange={(e) => setTitle(e.target.value)} //constantly updates the state
              />
            </td>
          </tr>
          <tr>
            <th>Description:</th>
            <td>
              <input
                className="inputbox"
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Start:</th>
            <td>
              <input
                type="datetime-local"
                id="start"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>End:</th>
            <td>
              <input
                type="datetime-local"
                id="end"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </td>
            <td>
              <button onClick={handleSubmit} disabled={isFormDisabled}>
                Create event!
              </button>
              <button onClick={clear}>Clear</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="content">
        <MyCalendar />
      </div>
    </div>
  );
}
