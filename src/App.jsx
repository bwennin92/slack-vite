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
import { useEffect, useState } from "react";
import supabase from "./lib/supabase";
import Logout from "./components/logout/Logout";
import Chat from "./components/chatroom/Chat";


function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
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
    // Set up a real-time subscription to auth changes
    const{ data: { authListener }, } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setCurrentUser(session?.user || null);
        if (event === "SIGNED_IN") {
          navigate("/channel/1");
        }
        if (event === "SIGNED_OUT") {
          navigate("/");
        }
      }
    );
  
    // Cleanup function
    return () => {
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, [navigate]); // Ensure dependencies are correctly listed

  return (
    currentUser === null ? <LoginPage />:
    <div className="App">
      <h1>Qua-Hiss Crocoduck!</h1>

      <Header />
      <div className="app_body">
        <Routes>
          {/* <Route path="/" element={<LoginPage />}></Route> */}
          <Route path="/channel/:channelId" element={<Chat />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Logout onLogout={handleLogout} />

        <Sidebar />

        {/* Other routes */}
      </div>
    </div>
  );
}

export default App;
