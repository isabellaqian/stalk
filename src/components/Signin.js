import React, { useEffect } from "react";
import { UserAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
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
    }
  }, []);

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
