import React from 'react'
import Card from 'react-bootstrap/Card';
import "./ChatCard.css"
import usericon from "../assets/user-circle.svg"


function ChatCard(props) {
  return (
    <div >
    <Card style={{width:'300px'}}>
    <div><Card.Header><img style={{width:'30px', marginRight:'6px'}} src={usericon}></img> {props.name} </Card.Header></div>
      <Card.Body>
      <small className='chat-message'>{props.message}</small>
      </Card.Body>
    </Card>
    </div>
  )
}

export default ChatCard