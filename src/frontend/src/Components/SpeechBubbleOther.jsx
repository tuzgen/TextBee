import React from 'react'
import "./SpeechBubble.css"

function SpeechBubble({ sentAt, sender, message }) {
  return (
    <div>
      <div style={{marginLeft:'10px'}}> <h1 style={{fontSize:'medium', fontWeight:'800'}}>{sender}</h1></div>

      <div style={{display:'flex', alignItems:'center', gap:'20px'}}>

      <p>{message}</p>
      <h2 style={{fontSize:'medium', fontWeight:'500'}}>{new Date(sentAt).toTimeString().split(' ')[0]}</h2>
      </div>
    
    </div>
  )
}

export default SpeechBubble