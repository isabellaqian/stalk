import React, { Component, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { addEvent, db } from "../Firebase";
import moment from "moment";
import { UserAuth } from "../components/AuthContext";

const localizer = momentLocalizer(moment);

// so for front end I think it would be great if you guys could make the data persist by always reading
// from Fire store. so you could just get the current users email and there’s a URL routing that
// I have in my code so you can just follow that convention.

export default function CreateEvent() {
  const [personalEvents, setPersonalEvents] = useState([]);
  const [eventTitle, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const { user } = UserAuth();
  const uid = user.uid;
  useEffect(() => {
    const tempEvents = [];
    const fbEvents = collection(db, "userCollection/" + uid + "/events");
    const unsubscribe = onSnapshot(fbEvents, (querySnapshot) => {
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // console.log(doc);

        const d = doc.data();
        tempEvents.push({
          title: d.Title,
          start: Date.parse(d.Start),
          end: Date.parse(d.End),
        });
      });
      setPersonalEvents(tempEvents);
      console.log("updated personalEvents ", personalEvents);
    });

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return () => unsubscribe();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    //we may want to store more info than just title and start date in database (@alexavanh)
    //adding new entries to store new incoming data @s-palakur
    addEvent(eventTitle, summary, description, start, end, personalEvents);
    const myEvent = {
      title: eventTitle,
      start: Date.parse(start),
      end: Date.parse(end),
    };
    // setPersonalEvents(personalEvents.concat([myEvent]));
  }

  function clear() {
    setTitle("");
    setSummary("");
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

  // const tempEvents = [];
  // onSnapshot(eventsCollection, (snapshot) => {
  //   snapshot.docs.forEach((doc) => {
  //     const d = doc.data();
  //     tempEvents.push({
  //       title: d.Title,
  //       start: Date.parse(d.Start),
  //       end: Date.parse(d.End),
  //     });
  //   });
  //   console.log("new snapshot: ", tempEvents);
  //   setPersonalEvents(tempEvents);
  //   console.log("updated personalEvents ", personalEvents);
  // });
  // getEvents()
  //   .then((val) => {
  //     setTest(val);
  //     console.log("test ", test);
  //   })
  //   .catch((err) => console.log(err));
  // console.log("test general ", test);

  return (
    <div>
      <ul className="header">
        <h2>Enter your calendar event below!</h2>
        <form>
          <label>Event name:</label>
          <input
            type="text"
            required
            value={eventTitle}
            onChange={(e) => setTitle(e.target.value)} //constantly updates the state
          />
          <br />
          <label htmlFor="summary">Summary:</label>
          <input
            type="text"
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <br />
          <label htmlFor="description">Description:</label>
          <input
            className="inputbox"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label htmlFor="start">Start date time:</label>
          <input
            type="datetime-local"
            id="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <br />
          <label htmlFor="end">End date time:</label>
          <input
            type="datetime-local"
            id="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
          <button onClick={handleSubmit} disabled={isFormDisabled}>
            Create event!
          </button>
          <button onClick={clear}>Clear</button>
        </form>
      </ul>
      <div className="content">
        <Calendar
          localizer={localizer}
          events={personalEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
}
