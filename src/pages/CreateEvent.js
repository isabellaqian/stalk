import React, { useCallback, useEffect, useState } from "react";
import { addEvent, firestore, holdSlotTimes } from "../Firebase";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import MyCalendar from "../components/MyCalendar";
import PersonalEventDialog from "../components/PersonalEventDialog";

export default function CreateEvent() {
  const [eventTitle, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  function handleSubmit(e) {
    clearSuccess();
    if (eventTitle.trim().length === 0) {
      setError("Missing title");
      setSuccess(null);
      return;
    } else if (start.trim().length === 0 || end.trim().length === 0) {
      setError("Missing date");
      setSuccess(null);
      return;
    } else if (moment(end).isBefore(start)) {
      setError("Invalid dates");
      setSuccess(null);
      return;
    }
    e.preventDefault();
    //adding new entries to store new incoming data in firestore database @s-palakur
    console.log(start);
    console.log(end);
    addEvent(eventTitle, description, start, end, location);
    setSuccess("Event added!");
    setError(null);
    clear();
  }

  function clear() {
    setTitle("");
    setDescription("");
    setLocation("");
    setStart("");
    setEnd("");
  }

  function clearSuccess() {
    setSuccess(null);
    setError(null);
  }

  //make sure the event title and start/end dates are inputted or else you can't create the event (@alexavanh)
  // const isFormDisabled =
  //   eventTitle.trim().length === 0 ||
  //   start.trim().length === 0 ||
  //   end.trim().length === 0 ||
  //   moment(end).isBefore(start);

  const handleSelectSlot = ({ start, end }) => {
    //start and end here are the start and end timestamps of your selected slot
    holdSlotTimes(start, end);
    setOpenDialog(true);
  };

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  return (
    <div className="container">
      <PersonalEventDialog open={openDialog} handleClose={handleCloseDialog} />
      <div className="content" style={{ paddingTop: "25px" }}>
        <MyCalendar selectable={true} handleSelectSlot={handleSelectSlot} />
      </div>
      <div className="custom-centered" style={{ width: "50%" }}>
        <Stack spacing={2}>
          <h1 className="custom-centered">Add an event</h1>
          <p>Pro tip: you can also add an event by dragging on the calendar!</p>
          <TextField
            // id="outlined-textarea"
            label="Event Name"
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
            type="datetime-local"
            id="start"
            required
            label="Start time"
            value={start}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setStart(e.target.value);
              setEnd(e.target.value);
            }}
          />

          <TextField
            type="datetime-local"
            id="end"
            label="End time"
            value={end}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setEnd(e.target.value)}
          />

          <TextField
            label="Location (optional)"
            placeholder="Ur mom's house."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <div>
            <button
              className="button_blue_small"
              onClick={handleSubmit}
              // disabled={isFormDisabled}
            >
              Create event!
            </button>
            <button className="button_white_small" onClick={clear}>
              Clear input
            </button>
          </div>
        </Stack>
      </div>
    </div>
  );
}
