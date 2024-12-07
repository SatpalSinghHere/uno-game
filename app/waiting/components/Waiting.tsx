
import React, { useContext, useState } from 'react'
import { socketContext } from '../../context/SocketProvider'

const Waiting = () => {
    
    const SocketContext = useContext(socketContext)
    const players = SocketContext?.playersOnline
    console.log("Players Online", SocketContext?.playersOnline)
    
    return (
        <div>
            {players?.map((player,index) => {
                return <li key={index}>{player}</li>
            })}
        </div>
    )
}

export default Waiting
