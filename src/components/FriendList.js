import React, { useState, useEffect } from "react";
import { userCollection } from "../Firebase";
import { onSnapshot } from "firebase/firestore";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import { collection } from "firebase/firestore";
import { getID, firestore } from "../Firebase";
import { deleteDoc, doc } from "firebase/firestore";

const FriendList = () => {
  const [friendArr, setFriendArr] = useState([]);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  useEffect(() => {
    //Get all users here (@emily)
    const friendCollection = collection(
      firestore,
      "userCollection/" + getID() + "/friends"
    );
    const friendsArrFirestore = [];
    const unsubscribe = onSnapshot(friendCollection, (snapshot) => {
      snapshot.forEach((doc) => {
        friendsArrFirestore.push(doc.data().emailID);
      });
      setFriendArr(friendsArrFirestore);
    });
    return () => unsubscribe();
  }, [friendArr]);

  async function handleClick(friend) {
    console.log("deleting friend");
    await deleteDoc(
      doc(firestore, "userCollection/" + getID() + "/friends/", friend)
    );
  }

  //generates the number of friends to list out
  function generate(element) {
    return friendArr.map((friend) =>
      React.cloneElement(
        <div style={{ display: "flex" }}>
          <Button onClick={() => handleClick(friend)}>x</Button>
          <ListItemText primary={friend} />
        </div>
      )
    );
  }

  return (
    <div className="friend-list">
      <Typography variant="h4">My friends:</Typography>
      <List dense={dense}>
        {generate(
          <ListItem>
            <ListItemText />
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default FriendList;
