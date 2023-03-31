import React from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { InfoOutlined, StarBorderOutlined } from "@mui/icons-material";
function Chat() {
  const { channelId } = useParams();
  return (
    <div className="chat">
      <h2>You are in {channelId} room!</h2>
      <div className="chat_header">
        <div className="chat_headerLeft">
          <h4 className="chat_channelName">
            <strong># General</strong>
            <StarBorderOutlined/>
          </h4>
        </div>
        <div className="chat_headerRight">
          <p>
          <InfoOutlined/> Details
          </p>
        </div>
      </div>
    </div>
  );
}

export default Chat;
