import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { InfoOutlined, StarBorderOutlined } from "@mui/icons-material";
import supabase from "../../lib/supabase";
import Messages from "../message/Messages";
function Chat() {
  const { channelId } = useParams();
  const [channelDetails, setChannelDetails] = useState([]);
  const [channelTitle, setChannelTitle] = useState([]);

  useEffect(() => {
    async function channelName() {
      const { data: channels, error } = await supabase
        .from("channels")
        .select("slug")
        .eq('id', channelId)
        .limit(1)
        .single()
      setChannelTitle(channels);
      if (error) console.error(error);
      console.log(channels);
    }
    channelName();
  }, [channelId]);

  useEffect(() => {
    if (channelId) {
      const realChannelMessage = supabase
        .channel("rooms")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
          },
          (payload) => console.log(payload)
        )
        .subscribe();
    }
  }, [channelId]);

  useEffect(() => {
    async function messageData() {
      const { data: messages, error } = await supabase
        .from("messages")
        .select("channel_id, message, user_id, inserted_at, channels(id)")
        .eq("channel_id", channelId);
      setChannelDetails(messages);
      if (error) console.error(error);
      console.log(messages);
      console.log('refreshing messages')
    }
    messageData();
  }, [channelId]);

  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_headerLeft">
          <h4 className="chat_channelName">
            <strong>#{channelTitle.slug}</strong>
            <StarBorderOutlined />
          </h4>
        </div>
        <div className="chat_headerRight">
          <p>
            <InfoOutlined /> Details
          </p>
        </div>
      </div>
      <div className="chat_messages">
        {channelDetails ? (
          channelDetails.map((chatMessage, m) => (
            <Messages
              key={m}
              message={chatMessage.message}
              timestamp={chatMessage.inserted_at}
              user={chatMessage.user_id}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="chat_input">
        <textarea name="" id="chat_box" cols="30" rows="1"></textarea>
        <div className="chat_inputButtons"></div>
      </div>
    </div>
  );
}

export default Chat;
