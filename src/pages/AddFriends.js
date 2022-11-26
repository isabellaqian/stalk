import React, { useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../images/left_arrow.png";

import "./pages.css";

const AddFriends = () => {
  const [emails, setEmails] = useState("");
  const handleSubmit = () => {};
  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <Link to="/dashboard">
          <img src={arrow} />
        </Link>
        <div className="h3">Add friends</div>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          id="emails"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
        />
        <button className="button_accent" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddFriends;
