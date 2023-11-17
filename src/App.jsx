import "./App.css";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./components/login_page/LoginPage";
import { useEffect } from "react";
import supabase from "./lib/supabase";
import LogoutButton from "./components/logout/Logout";

import Chat from "./components/chatroom/Chat";
function App() {
  const Navigate = useNavigate();
  const handleLogout = async () => {
    // Call Supabase to log out
    let { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error);
    } else {
      console.log("User logged out successfully");
      // Redirect to login page or home page after logout
      // window.location.href = '/login'; // or use your routing solution
    }
  };
  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        Navigate("/channel/1");
      }
    });
    return authListener.data.subscription.unsubscribe;
  });

  return (
    //BEM naming convention
    <div className="App">
      <h1>Qua-Hiss Crocoduck!</h1>

      <Header />
      <div className="app_body">
        <LogoutButton onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/channel/:channelId" element={<Chat />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Sidebar />

        {/* Other routes */}
      </div>
    </div>
  );
}

export default App;
