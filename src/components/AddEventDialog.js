import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { addEvent, addEventToFriends, getSlotTimes, selectedFriends, slotTimes } from "../Firebase";

export default function AddEventDialog({ open, handleClose }) {
  //const [open, setOpen] = useState(false);
  const [eventTitle, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleClick() {
    //slotTimes will hold the times of the slot now @alexavanh
    //selectedFriends will hold the friends that were selected in Meet page @alexavanh
    console.log(selectedFriends);
    const start = slotTimes[0];
    console.log("check start: " + start);
    const end = slotTimes[1];
    console.log("check end: " + end);
    selectedFriends.forEach(friend => {
      console.log("friend: " + friend);
      addEventToFriends(friend, eventTitle, description, start, end);
    })
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create an event</DialogTitle>
        <DialogContent>
          <TextField
            label="We are meeting for..."
            required
            placeholder="CS35L Hack"
            value={eventTitle}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description (optional)"
            placeholder="Plan: grind for 5 hours straight."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>Send invite to friends!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
