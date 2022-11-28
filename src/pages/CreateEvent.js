import React, { useEffect, useState } from "react";
import { addEvent, firestore } from "../Firebase";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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
      <form>
        <TextField
          // id="outlined-textarea"
          label="Event Name"
          placeholder="CS35L"
          onChange={(e) => console.log(e)} //constantly updates the state
        />
        <br />
        <TextField
          // id="outlined-textarea"
          label="Description"
          placeholder="Plan: grind for 5 hours straight."
          onChange={(e) => console.log(e)} //constantly updates the state
        />
      </form>

      <table id="create-event-table" className="custom-centered">
        <thead>
          <tr>
            <th colSpan={5}>Add an event to calendar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan={2}>Event Name:</th>
            <td colSpan={3}>
              <input
                type="text"
                required
                value={eventTitle}
                onChange={(e) => setTitle(e.target.value)} //constantly updates the state
              />
            </td>
          </tr>
          <tr>
            <th colSpan={2}>Description:</th>
            <td colSpan={3}>
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
            <th colSpan={2}>Start:</th>
            <td colSpan={3}>
              <input
                type="datetime-local"
                id="start"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th colSpan={2}>End:</th>
            <td colSpan={3}>
              <input
                type="datetime-local"
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
              Create event!
            </button>
            <button className="button_white_small" onClick={clear}>
              Clear input
            </button>
          </th>
        </tr>
      </table>
      <div className="content">
        <MyCalendar />
      </div>
    </div>
  );
}
