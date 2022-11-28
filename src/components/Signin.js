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
    }catch (error) {
      console.log(error);
    }
  };

  // show dashboard if the user is logged in
  useEffect(() => {
    if (user != null) {
      navigate("/dashboard");
      writeUserDoc()
    }
  }, []);

  return (
    <div>
      
      {/* Changing to only one button. (@emily)
      <button className="button_accent float_right" onClick={handleSignUp}>
        Sign up now
      </button> */}
      <button className="button_white float_right" onClick={handleSignInOrUp}>
        Log in or Sign Up
      </button>
    </div>
  );
};

export default Signin;