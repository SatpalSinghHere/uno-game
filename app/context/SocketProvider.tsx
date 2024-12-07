import { Card, cardList } from '@/utils/cardObjects'
import React, { useCallback, useEffect, useState, createContext } from 'react'
import { centralCardContext, CentralCardContext } from './centralCard'
import { io, Socket } from 'socket.io-client'

interface SocketProviderProps {
    children: React.ReactNode
}

export interface SocketContext {
    playersOnline : string[]
    centralCard : Card,
    emitNewCentralCard : (card: Card) => void
}

export const socketContext = createContext<SocketContext | undefined>(undefined);

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [playersOnline, setPlayersOnline] = useState<string[]>(['Harry'])
    const newOnlinePlayers = useCallback((str : string)=>{
        setPlayersOnline((p)=> [...p, str])
    }, [])

    const [centralCard, setCentralCard] = useState(cardList[cardList.length - 1])
    const recNewCentralCard = useCallback((str: string) => {
        const card = JSON.parse(str)
        console.log('Receiving new central Card', card)
        setCentralCard(card)
    }, [])

    const [socket, setSocket] = useState<Socket>()

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
        _socket.on('Online Players: ', newOnlinePlayers)
        setSocket(_socket)

        return () => {
            _socket.off('New Central Card', recNewCentralCard)
        }
    },[])

    return (
        <socketContext.Provider value={{playersOnline, centralCard, emitNewCentralCard}}>
            {children}
        </socketContext.Provider>
    )
}

export default SocketProvider
