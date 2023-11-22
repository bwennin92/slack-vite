import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import supabase from '../../lib/supabase'; // Adjust the path as per your project structure

const Logout = () => {
  const Navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      Navigate('/'); // Redirect to the login page after logout
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
