import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "./AuthContext";
import logo from "../images/logo.png";
import Signin from "./Signin";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

// import "../index.css"; don't know if I need this line?

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // if (user == undefined) {
    //   console.log("user is undefined");
    //   return;
    // }
    if (user != null && !isEmpty(user)) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <div className="nav_bar">
      {user ? (
        <Link to="/dashboard">
          <img src={logo} className="logo" />
        </Link>
      ) : (
        <Link to="/">
          <img src={logo} className="logo" />
        </Link>
      )}
      {user?.displayName ? (
        <Link to="/">
          <button className="button_white float_right" onClick={handleSignOut}>
            Logout
          </button>
        </Link>
      ) : (
        <Signin />
      )}
    </div>
  );
};
export default Navbar;
