import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../Firebase";
import moment from "moment";
import { UserAuth } from "./AuthContext";

const localizer = momentLocalizer(moment);

export default function MyCalendar() {
  const [personalEvents, setPersonalEvents] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (!user) {
      return;
    }
    const fbEvents = collection(
      firestore,
      "userCollection/" + user.email + "/events"
    );
    const unsubscribe = onSnapshot(fbEvents, (snap) => {
      // console.log(snap);
      const tempEvents = [];
      snap.forEach((doc) => {
        const d = doc.data();
        tempEvents.push({
          title: d.Title,
          start: d.Start.toDate(),
          end: d.End.toDate(),
        });
      });
      console.log("tempEvents ", tempEvents);
      setPersonalEvents(Array.from(tempEvents));
      console.log("updated personalEvents ", personalEvents);
    });

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={personalEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
