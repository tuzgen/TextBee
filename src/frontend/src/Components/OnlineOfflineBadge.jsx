import React from 'react'
import "./OnlineOfflineBadge.css"

function OnlineOfflineBadge(props) {
    //logic to check if user is online or not 
    //TODO!!

    var isOnline = Math.floor(Math.random() * 2)

  return (
    <div>
        <> {isOnline ? 
        <div className='online-badge'/> : <div className='offline-badge'/>}
        </>

    </div>
  )
}

export default OnlineOfflineBadge