'use client'
import React, { useContext, useEffect, useState } from 'react'
import { socketContext } from '../app/context/SocketProvider'
import { redirect, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Waiting = () => {
    const path = usePathname()
    const roomId = path.split('/')[path.split('/').length - 1]

    const { data: session } = useSession()
    console.log('SESSION info : ', session)
    const SocketContext = useContext(socketContext)
    const players = SocketContext?.playersOnline
    const emitStartGame = SocketContext?.emitStartGame
    const insideWaitingRoom = SocketContext?.insideWaitingRoom
    console.log("Players Waiting", SocketContext?.playersOnline)

    useEffect(()=>{
        if(session && insideWaitingRoom){
            
            insideWaitingRoom(session.user?.name as string, roomId)
        }
    }, [session])

    
    
    return (
        <div>
            {players?.map((player,index) => {
                return <li key={index}>{player}</li>
            })}
            <button onClick={()=>{if(emitStartGame){emitStartGame(roomId)}}}>Start Game</button>
        </div>
    )
}

export default Waiting
