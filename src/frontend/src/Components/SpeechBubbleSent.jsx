import React from 'react'
import "./SpeechBubble.css"

function SpeechBubbleSent({ sentAt, sender, message }) {
  return (
    <div style={{ margin:'0px auto 0px auto', marginRight:'10px', display:'relative'}}>
      <div style={{marginLeft:'10px'}}> <h1 style={{fontSize:'medium', fontWeight:'800', width:'100%'}}>{sender}</h1>
      </div>

      <div style={{display:'flex', alignItems:'center', gap:'20px'}}>

    
      <div style={{display:'flex', alignItems:'center', gap:'20px', verticalAlign:'middle'}}>
      
      <p>{message}</p>
      <h2 style={{fontSize:'medium', fontWeight:'500'}}>{new Date(sentAt).toTimeString().split(' ')[0]}</h2>
      </div>

    </div>
    </div>
  )
}
// function SpeechBubbleSent({ sentAt, sender, message }) {
//   return (
//     <div style={{ position:'absolute', right:'10px'}}>
//       <div style={{marginLeft:'10px'}}> <h1 style={{fontSize:'medium', fontWeight:'800'}}>{sender}</h1></div>

//       <div style={{display:'flex', alignItems:'center', gap:'20px'}}>

//       <p>{message}</p>
//       <h2 style={{fontSize:'medium', fontWeight:'500'}}>{new Date(sentAt).toTimeString().split(' ')[0]}</h2>
//       </div>
    
//     </div>
//   )
// }

export default SpeechBubbleSent