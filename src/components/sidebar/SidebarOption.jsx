import React, { useState, useEffect } from "react";
import "./SidebarOption.css";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabase";



function SidebarOption({ Icon, title, id, addChannelOption }) {
const navigate = useNavigate();
const [channels, setChannels] = useState([]);



  const selectChannel = () =>{
    if (id) {
      navigate(`/channel/${title}`);
    } else {
      navigate(title);
    }
  };

const addChannel = () => {
  const channelName = prompt('Please enter channel name')
  if (channelName) {
    async function addingChannels() {
    const { data, error } = await supabase
  .from('channels')
  .insert([{slug:(channelName)}])
      if(error) console.error(error);
    console.log(data)
  }
  addingChannels();
  }
}



  return (
    <div className="sidebarOption" onClick={addChannelOption ? addChannel: selectChannel}>
      {Icon && <Icon className="sidebarOption_icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebarOption_channel">
          <span className="sidebarOption_hash">#</span>
          {title}
        </h3>
      )}
    </div>
  );
}

export default SidebarOption;
