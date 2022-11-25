import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "./AuthContext";
import logo from "../images/logo.png";
import Signin from "./Signin";
import { Navigate } from "react-big-calendar";

// import "../index.css"; don't know if I need this line?

const Navbar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="nav_bar">
      <Link to="/">
        <img src={logo} className="logo" />
      </Link>
      {user?.displayName ? (
        <button className="button_white float_right" onClick={handleSignOut}>
          Logout
        </button>
      ) : (
        // <Link to="/signin">
        //   <button className="button_accent">Sign in</button>
        // </Link>
        <Signin />
      )}
    </div>
  );
};
export default Navbar;
