import React from 'react'
import "./SpeechBubble.css"

function SpeechBubble(props) {
  return (
    <div>
      <div style={{marginLeft:'10px'}}> <h1 style={{fontSize:'medium', fontWeight:'800'}}>Gale Boetticher</h1></div>

      <div style={{display:'flex', alignItems:'center', gap:'20px'}}>

      <p>If you have one bucket that contains 2 gallons and another bucket that contains 7 gallons, how many buckets do you have?</p>
      <h2 style={{fontSize:'medium', fontWeight:'500'}}>20:03</h2>
      </div>
    
    </div>
  )
}

export default SpeechBubble