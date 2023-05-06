import React from 'react'
import TextField from '@mui/material/TextField';
import './Messages.css';
import {format} from 'date-fns'


function Messages({ message, timestamp, user, userImage}) {
  return (
    <div className="message">
        <img src={userImage} alt="" />
        <div className="message_info">
        <h4>
            {user}
        </h4>
        <p>{format(new Date(timestamp),'h:mma').toLowerCase()} {message}</p>
        </div>
    </div>
  )
}

export default Messages