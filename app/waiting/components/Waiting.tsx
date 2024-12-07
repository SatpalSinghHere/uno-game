
import React, { useContext, useState } from 'react'
import { socketContext } from '../../context/SocketProvider'

const Waiting = () => {
    const [players, setPlayers] = useState<string[] | undefined>(undefined)
    const SocketContext = useContext(socketContext)

    console.log("Players Online", SocketContext?.playersOnline)
    
    return (
        <div>
            Waiting Room
        </div>
    )
}

export default Waiting
