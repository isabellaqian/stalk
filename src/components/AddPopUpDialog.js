import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  addEvent,
  addEventToFriends,
  getSlotTimes,
  selectedFriends,
  slotTimes,
} from "../Firebase";

export default function AddEventPopUp({ open, handleClose, event }) {
  //const [open, setOpen] = useState(false);
  const [eventTitle, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleClick() {
    handleClose();
  }

  if (event !== null) {
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogActions>
            <button onClick={handleClick}>x</button>
          </DialogActions>
          <DialogTitle className="popUpTitle">{event.title}</DialogTitle>
          <DialogContent>
            Description: {event.description} <br />
            <br />
            Location: {event.loca}
            <br /> <br />
            Author: {event.author}
            <br /><br />
            id:{event.id}
          </DialogContent>
          <DialogActions>
            <button className="button_red_small" onClick={handleClick}>
              Delete Event
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
