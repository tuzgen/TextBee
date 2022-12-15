import "./ChatCard.css"
import React from 'react'


function ChatCardHeader({users}) {
  console.log(users)
  return (
    <div className="chat-header">
        <h1 className="header">{users.join(', ')}</h1>
    </div>
  );
}

export default ChatCardHeader