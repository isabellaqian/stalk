import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { addEvent, slotTimes } from "../Firebase";

export default function PersonalEventDialog({ open, handleClose }) {
  //const [open, setOpen] = useState(false);
  const [eventTitle, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const start = slotTimes[0];
  const end = slotTimes[1];
  const displayStart = slotTimes[2];
  const displayEnd = slotTimes[3];

  function handleCancel() {
    clear();
    handleClose();
  }

  function clear() {
    setTitle("");
    setDescription("");
    setLocation("");
    setError(null);
    setSuccess(null);
  }

  function handleSubmit() {
    if (eventTitle.trim().length === 0) {
      setError("Missing title");
      setSuccess(null);
      return;
    }
    setSuccess("Event added");
    addEvent(eventTitle, description, start, end, location);

    clear();
    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create an event</DialogTitle>
        <DialogContent>
          <Stack spacing={2} style={{ paddingTop: "5px" }}>
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
              label="Location (optional)"
              placeholder="Ur mom's house."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {/* <TextField
              type="datetime-local"
              id="start"
              required
              label="Start time"
              value={displayStart}
              InputLabelProps={{
                shrink: true,
              }}
              readOnly
            />

            <TextField
              type="datetime-local"
              id="end"
              label="End time"
              value={displayEnd}
              InputLabelProps={{
                shrink: true,
              }}
              readOnly
            /> */}
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        </DialogContent>
        <DialogActions>
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
          <button className="button_white_small" onClick={handleCancel}>
            Cancel
          </button>
          {/* <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClick}>Send invite to friends!</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
