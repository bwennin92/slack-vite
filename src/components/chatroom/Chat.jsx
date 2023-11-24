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
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user on component mount
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error retrieving user:', error);
      }
    };

    fetchUser();

    // Subscribe to authentication changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    // Cleanup the listener when the component is unmounted
    // return () => {
    //   authListener.unsubscribe();
    // };
  }, []);


  useEffect(() => {
    async function channelName() {
      const { data: channels, error } = await supabase
        .from("channels")
        .select("slug")
        .eq("id", channelId)
        .single();
      setChannelTitle(channels);
      if (error) console.error(error);
    }
    channelName();
  }, [channelId]);

  useEffect(() => {
    const messageListener = supabase
    .channel('custom-all-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, payload => {
      console.log('New message received!', payload);
      // Update your state or UI here with the new message
    })
    .subscribe();

    return () => {
      supabase.removeChannel(messageListener);
    };
  }, [channelId]);

  useEffect(() => {
    async function messageData() {
      const { data: messages, error } = await supabase
        .from("messages")
        .select("channel_id, message, user_id, inserted_at, channels(id)")
        .eq("channel_id", channelId);
      setChannelDetails(messages);
      if (error) console.error(error);
    }
    messageData();
  }, [channelId]);

  async function submitMessage(channel_id, message) {
    if (user && user.id) {
      const { data, error } = await supabase
        .from("messages")
        .insert([{ channel_id, user_id: user.id, message }]);
      
      if (error) {
        console.error('Error submitting message:', error);
      } else if (data && data.length > 0) { // Check if data is not null and has at least one item
        const newMessage = data[0];
        setChannelDetails(prevMessages => [...prevMessages, newMessage]);
      } else {
        console.error('No data returned from the insert operation');
      }
    } else {
      console.log('User must be logged in to send a message.');
    }
  }

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
        {channelDetails.map((message, m) => (
          <Messages
            key={m}
            message={message.message}
            timestamp={message.inserted_at}
            user={message.user_id}
          />
        ))}
      </div>

      <div className="chat_input">
        <Box component="form" noValidate autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            if (user) {
              submitMessage(channelId, chatMessage)
                .then(() => setChatMessage('')) // Clear the input after sending
                .catch(console.error);
            } else {
              console.log('User must be logged in to send a message.');
            }
            e.stopPropagation();
          }}
        >
          <Grid>
            <TextField
              id="outlined-basic"
              label="Message"
              variant="outlined"
              fullWidth
              onChange={e => setChatMessage(e.target.value)}
              value={chatMessage}
            />
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Chat;
