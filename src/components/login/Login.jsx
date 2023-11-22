import React from "react";
import supabase from "../../lib/supabase";
import "./Login.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import IconSquareGithub from "../Icons/Github";

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate

  const loginWithGithub = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      console.log("Error logging in:", error);
      return;
    }

    if (user) {
      navigate("/channel/2"); // Redirect to channels page after successful login
    }
  };

  return (
    <div className="page center">
      <div className="loginComponent">
        <h2>Login to Your App</h2>
        <IconSquareGithub
          style={{ height: "60px", width: "60px", color: "#06f27b" }}
        />
        <button className="login-btn github-login" onClick={loginWithGithub}>
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
