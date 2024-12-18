'use client'
import React, { useContext, useState } from 'react'
import { socketContext } from '../../../context/SocketProvider'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Waiting = () => {
    const { data: session } = useSession()
    console.log('SESSION info : ', session)
    const SocketContext = useContext(socketContext)
    const players = SocketContext?.playersOnline
    const emitStartGame = SocketContext?.emitStartGame
    console.log("Players Online", SocketContext?.playersOnline)

    
    
    return (
        <div>
            {players?.map((player,index) => {
                return <li key={index}>{player}</li>
            })}
            <button onClick={emitStartGame}>Start Game</button>
        </div>
    )
}

export default Waiting
