import React from 'react';
import supabase from "../../lib/supabase";
import './Login.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate

  const loginWithGithub = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    });

    if (error) {
      console.log('Error logging in:', error);
      return;
    }

    if (user) {
      navigate('/channel/2'); // Redirect to channels page after successful login
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Your App</h2>
      <button className="login-btn github-login" onClick={loginWithGithub}>
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;
