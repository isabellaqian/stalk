import React, { useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { writeUserDoc } from "../Firebase";

const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleSignInOrUp = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  // show dashboard if the user is logged in
  useEffect(() => {
    if (user != null) {
      navigate("/dashboard");
      writeUserDoc();
    }
    else {
      navigate("/");
    }
  }, [googleSignIn]);

  return (
    <button
      className="button_accent float_right"
      style={{ width: "200px" }}
      onClick={handleSignInOrUp}
    >
      Log in or Sign Up
    </button>
  );
};

export default Signin;

/* Changing to only one button. (@emily)
  <button className="button_accent float_right" onClick={handleSignUp}>
    Sign up now
  </button> */
