import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Stack from "@mui/material/Stack";

import {
  addEvent,
  addEventToFriends,
  getSlotTimes,
  selectedFriends,
  slotTimes,
} from "../Firebase";

export default function AddEventDialog({ open, handleClose }) {
  //const [open, setOpen] = useState(false);
  const [eventTitle, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleClick() {
    //slotTimes will hold the times of the slot now @alexavanh
    //selectedFriends will hold the friends that were selected in Meet page @alexavanh
    const start = slotTimes[0];
    const end = slotTimes[1];

    //this function adds an event for yourself too
    selectedFriends.forEach((friend) => {
      addEventToFriends(friend, eventTitle, description, start, end);
    });

    handleClose();
  }

  function handleCancel() {
    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create an event</DialogTitle>
        <DialogContent>
          <Stack spacing={2} style={{ paddingTop: "5px" }}>
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClick}>Send invite to friends!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
