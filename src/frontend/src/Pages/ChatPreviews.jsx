import ChatCard from '../Components/ChatCard'
import React from 'react'

function ChatPreviews() {
    return (
        <div >
    
        <ul style={{marginTop:'10px', gap:'1rem', listStyle:'none', display:'flex', flexDirection:'column'}}>
          <ChatCard name='Alper' message='Ceyda seri'></ChatCard>
          <ChatCard name='Ece' message='Ceyda acil gel'></ChatCard>
          <ChatCard name='Oğuz' message='gec kalma sakin'></ChatCard>
          </ul>
          
    
        </div>
      )
}

export default ChatPreviews