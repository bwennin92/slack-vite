import React from 'react'
import TextField from '@mui/material/TextField';
import './Messages.css';
function Messages({ message, timestamp, user, userImage}) {
  return (
    <div className="message">
        <img src={userImage} alt="" />
        <div className="message_info">
        <h4>
            {user}
        </h4>
        <p>{timestamp}{message}</p>
        </div>
        <TextField id="outlined-search" label="Search field" type="search" />
    </div>
  )
}

export default Messages