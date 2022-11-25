import React, { Component, useState } from "react";
export default function CreateEvent() {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    console.log(summary, description, start, end);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="summary">Summary</label>
        <input
          type="text"
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <br />
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label htmlFor="start">Start date time</label>
        <input
          type="datetime-local"
          id="start"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <br />
        <label htmlFor="end">End date time</label>
        <input
          type="datetime-local"
          id="end"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
