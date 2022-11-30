import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddEventDialog({ open, handleClose }) {
  const [eventTitle, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
          <Button onClick={handleClose}>Send invite to friends!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
