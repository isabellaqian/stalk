import React from "react";
import { UserAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { writeUserDoc } from "../Firebase"

const Signin = () => {
  const { googleSignIn } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="button_accent float_right" onClick={handleSignIn}>
        Sign up now
      </button>
      <button className="button_white float_right" onClick={handleSignIn}>
        Log in
      </button>
    </div>
  );
};

export default Signin;
