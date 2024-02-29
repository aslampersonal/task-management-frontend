import React, { useState } from "react";
import "./SignupLoginPage.css";
import SignInForm from "../components/Login";
import SignUpForm from "../components/Signup";

export default function SignupLogin() {
  
  const [type, setType] = useState("signIn");
  
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass = "ls-container " + (type === "signUp" ? "right-panel-active" : "");
  
  return (
    <div className="SignupLogin">
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="ls-h1">Welcome Back!</h1>
              <p className="ls-p">To keep connected with us please login with your personal info</p>
              <button
                className="ghost ls-btn"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="ls-h1">Hello, Friend!</h1>
              <p className="ls-p">Enter your personal details and start journey with us</p>
              <button
                className="ghost ls-btn"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
