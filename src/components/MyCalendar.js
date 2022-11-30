import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../Firebase";
import moment from "moment";
import { UserAuth } from "./AuthContext";

const localizer = momentLocalizer(moment);

export default function MyCalendar({
  busyTimes = [],
  showToolbar = true,
  defaultDate = [],
}) {
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
          isMine: true,
        });
      });
      console.log("tempEvents ", tempEvents);
      setPersonalEvents(Array.from(tempEvents));
      console.log("updated personalEvents ", personalEvents);
    });

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return () => unsubscribe();
  }, []);

  const a = new Date("11/28/2022T00:00");
  const b = new Date("11/30/2022T00:00");

  return (
    <div>
      <Calendar
        selectable
        localizer={localizer}
        events={personalEvents.concat(busyTimes)}
        startAccessor="start"
        endAccessor="end"
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        eventPropGetter={(events) => {
          const color = events.isMine ? "#626fa7" : "#b1b1b1";
          return {
            style: { backgroundColor: color, border: "none" },
          };
        }}
        style={{ height: 500 }}
        toolbar={showToolbar}
      />
    </div>
  );
}
