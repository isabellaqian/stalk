import React from "react";
import calendar_screenshot from "../images/calendar_screenshot.png";

export default function Landing() {
  return (
    <div>
      <div className="container" style={{ display: "flex" }}>
        <div className="h3" style={{ width: "20%" }}>
          Schedule meetings with ease. Schedules at a glance.
        </div>
        <img src={calendar_screenshot} alt="calendar view" className="hero" />
      </div>
    </div>
  );
}
