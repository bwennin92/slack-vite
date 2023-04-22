import {
  Add,
  Apps,
  BookmarkBorder,
  Create,
  Drafts,
  ExpandLess,
  ExpandMore,
  FiberManualRecord,
  FileCopy,
  Inbox,
  InsertComment,
  PeopleAlt,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import supabase from "../../lib/supabase";

function Sidebar() {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    async function channelData() {
      const { data, error } = await supabase.from("channels").select("*");
      setChannels(data);
      if (error) console.error(error);
      console.log(data);
    }
    channelData();
  }, []);

  useEffect(() => {
    const realChannel = supabase
      .channel("rooms")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "channels",
        },
        (payload) => {
          setChannels([...channels, payload.new]);
          console.log(payload);
        }
      )
      .subscribe();
  });

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_info">
          <h2>Crocoduck</h2>
          <h3>
            <FiberManualRecord />
            Brandon Wenning
          </h3>
        </div>
        <Create />
      </div>
      <SidebarOption Icon={InsertComment} title="Threads" />
      <SidebarOption Icon={Inbox} title="Mentions & Reactions" />
      <SidebarOption Icon={Drafts} title="Saved Drafts" />
      <SidebarOption Icon={BookmarkBorder} title="Channel Browser" />
      <SidebarOption Icon={PeopleAlt} title="People & User Groups" />
      <SidebarOption Icon={Apps} title="Apps" />
      <SidebarOption Icon={FileCopy} title="File browser" />
      <SidebarOption Icon={ExpandLess} title="Show less" />
      <SidebarOption Icon={ExpandMore} title="Channels" />
      <SidebarOption Icon={Add} addChannelOption title="Add Channel" />

      {/* Connect to DB and list all the channels */}
      {/* SidebarOption ... */}
      {channels.map((channel) => (
        <SidebarOption title={channel.slug} id={channel.id} />
      ))}
    </div>
  );
}

export default Sidebar;
