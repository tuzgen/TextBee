import "./ChatCard.css"
import usericon from "../assets/user-circle.svg"

import React from 'react'
import { Button } from "react-bootstrap";


function ChatCardHeader(props) {
  return (
    <div className="chat-header">

        <h1 className="header">Chat with User</h1>

        <Button variant="secondary">Delete Chat</Button>{' '}
    </div>
  );
}

export default ChatCardHeader