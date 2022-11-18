import React from "react";
import { logInWithGoogle, handleClick } from "./Firebase";
import calendar_screenshot from "./images/calendar_screenshot.png";
import logo from "./images/logo.png";
export default function Landing() {
  return (
    <div>
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Oxygen+Mono&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Oxygen&display=swap"
          rel="stylesheet"
        />
      </head>
      <div class="nav_bar">
        <img src={logo} class="logo" />
        <button class="button_accent" onClick={logInWithGoogle}>
          Sign up now
        </button>
        <button class="button_white" onClick={logInWithGoogle}>
          Log in
        </button>
      </div>
      <div class="container">
        <body class="landing_text">
          Schedule meetings with ease. Schedules at a glance.
        </body>
        <img src={calendar_screenshot} alt="calendar view" class="hero" />
      </div>
    </div>
  );
}
