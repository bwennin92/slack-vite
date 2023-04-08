import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { InfoOutlined, StarBorderOutlined } from "@mui/icons-material";
import supabase from "../../lib/supabase";
function Chat() {
  const { channelId } = useParams();
  const [channelDetails, setChannelDetails] = useState(null)

  useEffect(()=> {
    if (channelId) {
      const realChannelMessage = supabase
      .channel('rooms')
      .on('postgres_changes',
      {
        event:'INSERT',
        schema: 'public',
        table:'messages',
      },
      (payload) =>
      console.log(payload)
      )
      .subscribe()
    }
  })
  return (
    <div className="chat">
      <h2>You are in {channelId}</h2>
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
