import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { deleteDoc, doc} from  "firebase/firestore";
import { firestore, getID, deleteEvent} from "../Firebase";


export default function AddEventPopUp({ open, handleClose, event }) {
  //const [localId, setId] = useState(0);


  function handleClick() {
    console.log(event);
    handleClose();
  }

  function handleDelete(id) {
    deleteEvent(id);
    handleClose();
  }

  if (event !== null) {
    return (
      <div>
        <Dialog open={open} onClose={handleClose} fullWidth={"xs"}>
          <DialogActions>
            <Button onClick={handleClick}>x</Button>
          </DialogActions>
          <DialogTitle className="popUpTitle">{event.title}</DialogTitle>
          <DialogContent>
            <Typography>
              <strong>Description: </strong>
              {event.description}
              <br />
              <strong>Location: </strong>
              {event.loca ? event.loca : !event.type ? "" : "N/A"}
              <br />
              <strong>Author: </strong>
              {event.author}
              <br />
              <strong>People: </strong>
              {event.friends ? event.friends : !event.type ? "" : "Just you"}
            </Typography>
          </DialogContent>
          <DialogActions>
            <button className="button_red_small" onClick={() => handleDelete(event.id)}>
              Delete Event
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
