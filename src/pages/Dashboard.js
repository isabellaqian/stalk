import React from "react";
import { UserAuth } from "../components/AuthContext";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { user } = UserAuth();
  const style = {
    display: "inline-block",
  };
  return (
    //izzy TODO: make meet add friends button cenetered
    <div className="container">
      <div className="h3">Welcome, {user?.displayName}</div>
      <div className="items">
        <Link to="/meet">
          <button className="button_accent" style={style}>
            Meet
          </button>
        </Link>
        <Link to="/addfriends">
          <button className="button_white">Add friends</button>
        </Link>
      </div>
    </div>
  );
};
export default Dashboard;
