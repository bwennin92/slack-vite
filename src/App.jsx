import "./App.css";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import { useEffect } from "react";
import supabase from "./lib/supabase";
import LogoutButton from "./components/logout/Logout";

import Chat from "./components/chatroom/Chat";
function App() {
  const handleLogout = async () => {
    // Call Supabase to log out
    let { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error logging out:', error);
    } else {
        console.log("User logged out successfully");
        // Redirect to login page or home page after logout
        // window.location.href = '/login'; // or use your routing solution
    }
};


  return (
    //BEM naming convention
    <div className="App">
      <h1>Qua-Hiss Crocoduck!</h1>
      <Router>
        <Header />
        <div className="app_body">
        <LogoutButton onLogout={handleLogout} />
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          <Sidebar />
          <Routes>
            <Route path="/channel/:channelId" element={<Chat />}></Route>

            {/* Other routes */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
