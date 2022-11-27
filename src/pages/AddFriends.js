import React, { useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../images/left_arrow.png";

import "./pages.css";

const AddFriends = () => {
  const [emails, setEmails] = useState("");
  const [error, setError] = useState(null);

  function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = e => {
    if (!isValidEmail(e.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }

    setEmails(e.target.value);
  };

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
        <input
          className="addfriendsinput"
          type="text"
          id="emails"
          value={emails}
          placeholder="Enter your friend's email (only one email)"
          onChange={handleChange}
        />
        {error && <h2 style={{color: 'red'}}>{error}</h2>}
        <button className="button_accent" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddFriends;
