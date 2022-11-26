import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import { db, getID} from "../Firebase";
//trying out a date-picker (@s-palakur) <button onClick={() => handleClick(eventTitle, selectedDate)}>Create event!</button>
import 'react-datepicker/dist/react-datepicker.css'
import { collection, addDoc, setDoc, Timestamp } from "firebase/firestore"; 
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import userEvent from "@testing-library/user-event";

// import { UserAuth } from "../components/AuthContext"

const localizer = momentLocalizer(moment);
// const user = auth.currentUser;


const CreateEvent2 = () => {

  const [e, setE] = useState({title: ""});
  const [selectedDate, setDate] = useState(null);

  const handleChange = (event) => {
    event.preventDefault();
    const {name, value} = event.target;
    setE((prev) => {
      return {...prev, [name]: value}
    });
  }


  async function addEvent() {
    const eventsCollection = collection(db, 'userCollection/' + getID() + '/events')
    //Using the add() method to add random documents with the Title and Date stored
    const docRef = addDoc(eventsCollection, {
      Title: e.title,
      Date: Timestamp.fromDate(new Date(selectedDate)),
    }).catch(err => {
      //This function catches any error that occurs during the creation of the document
      console.log("Error: " + err.message)
    })
    console.log("Document written with ID: ", docRef.id);
  }
  

  return (
    <div>
      <ul className="header">
        <h2>Enter your calendar event below!</h2>
        <form onSubmit={addEvent}>
          <label>Event name:</label>
          <input
            type="text"
            name="title"
            placeholder = "Event Name"
            required
            value={e.name}
            onChange={handleChange} //constantly updates the state
          />
          <br />
          <label>Event date:</label>
          <DatePicker 
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mmaa" //can now input time
          name="date"
          selected={selectedDate} onChange={date => setDate(date)} />
          <button>Save Event</button>
        </form>
      </ul>
      <div className="content">
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};
export default CreateEvent2;
