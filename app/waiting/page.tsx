'use client'
import React, { useContext, useState } from 'react'
import SocketProvider, { socketContext } from '../context/SocketProvider'

const page = () => {
    const [players, setPlayers] = useState<string[] | undefined>(undefined)
    const SocketContext = useContext(socketContext)

    console.log("Players Online", SocketContext?.playersOnline)
    return (
        <SocketProvider>
            <div>
                Waiting room
            </div>
        </SocketProvider>
    )
}

export default page
