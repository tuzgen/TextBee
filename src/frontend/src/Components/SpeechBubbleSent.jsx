import React from 'react'
import "./SpeechBubble.css"

function SpeechBubbleSent({ sentAt, sender, message }) {
  return (
    <div>
    
    <div style={{display:'flex', justifyContent:'flex-end', gap: '20px'}}>
    <h1 style={{fontSize:'medium', fontWeight:'800', display:'flex'}}>{sender}ceyda</h1>
    <h2 style={{fontSize:'medium', fontWeight:'500', color:'transparent'}}>{new Date(sentAt).toTimeString().split(' ')[0]}</h2>
    </div>
    <div style={{display:'flex', justifyContent:'flex-end'}}>

    
      <div style={{display:'flex', alignItems:'center', gap:'20px', verticalAlign:'middle'}}>
      
      <p>{message}</p>
      <h2 style={{fontSize:'medium', fontWeight:'500'}}>{new Date(sentAt).toTimeString().split(' ')[0]}</h2>
      </div>

      
    
    </div>
    </div>
  )
}

export default SpeechBubbleSent