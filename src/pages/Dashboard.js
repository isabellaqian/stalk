import React from "react";
import { UserAuth } from "../components/AuthContext";
import { Link } from "react-router-dom";
import CreateEvent from "./CreateEvent";

export const Dashboard = () => {
  const { user } = UserAuth();
  const style = {
    display: "inline-block",
  };
  return (
    //izzy TODO: make meet add friends button cenetered
    <div>
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

    <div>
      <div className="setcal"> 
        <h1>Set your personal calendar below!</h1>
      </div>
      <div className="cal">
        <CreateEvent/>
      </div>
    </div>
    </div>
  );
};
export default Dashboard;