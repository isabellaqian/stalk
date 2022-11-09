import React, { Component } from "react";
import "./App.css";
import {logInWithGoogle} from "./Firebase";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

function App() {
    return (
      <div>
        <h1>Stalk;</h1>
        <ul className="header">
          <button onClick={logInWithGoogle}>Login with Google</button>
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
 
export default App;
