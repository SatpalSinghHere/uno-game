'use client'

import { Card, cardList } from '@/utils/cardObjects'
import React, { useCallback, useEffect, useState, createContext } from 'react'
import { centralCardContext, CentralCardContext } from './centralCard'
import { io, Socket } from 'socket.io-client'
import { redirect } from 'next/navigation'

interface SocketProviderProps {
    children: React.ReactNode
}

export interface SocketContext {
    playersOnline : string[]
    centralCard : Card,
    emitNewCentralCard : (card: Card) => void
    emitStartGame : () => void
}

export const socketContext = createContext<SocketContext | undefined>(undefined);

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [playersOnline, setPlayersOnline] = useState<string[]>([])
    const newOnlinePlayers = useCallback((players: string[])=>{
        setPlayersOnline(players)
    }, [])

    const [centralCard, setCentralCard] = useState(cardList[cardList.length - 1])
    const recNewCentralCard = useCallback((str: string) => {
        const card = JSON.parse(str)
        console.log('Receiving new central Card', card)
        setCentralCard(card)
    }, [])

    const [socket, setSocket] = useState<Socket>()

    //emitters
    const emitStartGame = useCallback(() => {
        
        if(socket){
            console.log("Emitting Start game")
            const alphabet = 'abcdefghijklmnopqrstuvwxyz'
            let roomId = ''
            for(let i = 0; i<10; i++){
                roomId += alphabet[Math.floor(Math.random() * alphabet.length)]
            }
            console.log('Room ID', roomId)
            socket.emit('Start Game', roomId)
            
        }
    }, [socket])

    const emitNewCentralCard: SocketContext['emitNewCentralCard'] = useCallback((card: Card)=>{
        if(socket){
            console.log("Emitting new central card ", card)
            socket.emit('New Central Card', JSON.stringify(card))
        }
    }, [socket])

    useEffect(()=>{
        const _socket = io('http://localhost:8000')
        _socket.on('connect', () => {
            console.log('connected to socket')
        })
        _socket.on('New Central Card', recNewCentralCard)
        _socket.on('Online Players', newOnlinePlayers)
        _socket.on('Start Game', (roomId) => {
            _socket.emit('join room', roomId)
            redirect(`/game/${roomId}`)
            
        })
        setSocket(_socket)

        return () => {
            _socket.off('New Central Card', recNewCentralCard)
            _socket.off('Online Players', newOnlinePlayers)
            _socket.off('Start Game')
            _socket.disconnect()
        }
    },[])

    return (
        <socketContext.Provider value={{playersOnline, centralCard, emitNewCentralCard, emitStartGame}}>
            {children}
        </socketContext.Provider>
    )
}

export default SocketProvider
