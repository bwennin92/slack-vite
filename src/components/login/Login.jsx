import React from 'react';
import './Login.css'
import  supabase  from "../../lib/supabase"

const Login = () => {
  const loginWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    });

    if (error) console.log('Error logging in:', error);
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
