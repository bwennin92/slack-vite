import React from 'react'
import './Chat.css'
import { useParams } from 'react-router-dom'
function Chat() {
const { channelId } = useParams()
  return (
    <div className='chat'>
<h2>You are in  {channelId} room!</h2>
    </div>
  )
}

export default Chat