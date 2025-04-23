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
        <div className='flex flex-col justify-center items-center w-full h-[100vh]'>
            <span className='text-white mb-5 text-4xl'>Waiting</span>
            {players?.map((player,index) => {
                return <div key={index} className='w-[70%] p-3 text-2xl bg-blue-800 text-white rounded-lg mb-3'>{index+1}. {player[2]}</div>
            })}
            <button className='p-3 w-[20%] bg-blue-800 hover:bg-green-500 duration-200 rounded-3xl' onClick={()=>{if(emitStartGame){emitStartGame(roomId)}}}>Start Game</button>
        </div>
    )
}

export default Waiting
