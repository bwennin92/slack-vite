import "./App.css";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";

import Chat from "./components/chatroom/Chat";
function App() {
  return (
    //BEM naming convention
    <div className="App">
      <h1>Qua-Hiss Crocoduck!</h1>
      <Router>
      <Header />
      <div className="app_body">
        <Sidebar />
        <Routes>
          <Route path="/channel/:channelId" element={<Chat/>}>
            
            
          </Route>
          <Route path="/" element={<h1>This is Crocoduck</h1>}>
            {/* <h1>Qua-Hiss!</h1> */}
          </Route>
        </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
