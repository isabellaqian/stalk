import "./App.css";
import React, { Component } from "react";
import {logInWithGoogle} from "./Firebase";


class App extends Component {
  render() {
      return (
        <div>
          <h1>Stalk;</h1>
          <ul className="header">
            <button onClick={logInWithGoogle}>Login with Google</button>
          </ul>
          <div className="content">
          </div>
        </div>
    );
  }

}

export default App;
