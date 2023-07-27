import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { InfoOutlined, StarBorderOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import supabase from "../../lib/supabase";
import Messages from "../message/Messages";
import Grid from "@mui/material/Grid";
function Chat() {
  const { channelId } = useParams();
  const [channelDetails, setChannelDetails] = useState([]);
  const [channelTitle, setChannelTitle] = useState([]);
  const [chatMessage, setChatMessage] = useState("");

  useEffect(() => {
    async function channelName() {
      const { data: channels, error } = await supabase
        .from("channels")
        .select("slug")
        .eq("id", channelId)
        .limit(1)
        .single();
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
      console.log("refreshing messages");
    }
    messageData();
  }, [channelId]);

  async function submitMessage(channel_id, user_id, message, id = false) {
    if (id) {
      // editing
    } else {
      // new message
      const { error } = await supabase
        .from("messages")
        .insert([{ channel_id, user_id, message }]);

      if (error) console.error(error);
    }
  }

//checking repo

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
        <Box component="form" noValidate autoComplete="off"
          onSubmit={(e) => {
            console.log('form submitted');
            e.preventDefault();
            submitMessage(channelId, "8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e", chatMessage).then(()=>{
              console.log('message submitted');
            }).catch(err=>{
              console.warn(err);
            });
            e.stopPropagation();
          }}
        >
          <Grid>
            {/* https://mui.com/material-ui/api/text-field/ */}
            <TextField
              id="outlined-basic"
              label="Message to"
              variant="outlined"
              fullWidth
              onChange={e=>setChatMessage(e.target.value)}
              value={chatMessage}
            />
          </Grid>
        </Box>
        <div className="chat_inputButtons"></div>
      </div>
    </div>
  );
}

export default Chat;
