import { Card, cardList } from '@/utils/cardObjects'
import React, { useCallback, useEffect, useState } from 'react'
import { centralCardContext, CentralCardContext } from './centralCard'
import { io, Socket } from 'socket.io-client'


interface SocketProviderProps {
    children: React.ReactNode
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [centralCard, setCentralCard] = useState(cardList[cardList.length - 1])
    const recNewCentralCard = useCallback((str: string) => {
        const card = JSON.parse(str)
        console.log('Receiving new central Card', card)
        setCentralCard(card)
    }, [])

    const [socket, setSocket] = useState<Socket>()

    const emitNewCentralCard: CentralCardContext['emitNewCentralCard'] = useCallback((card: Card)=>{
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
        setSocket(_socket)

        return () => {
            _socket.off('New Central Card', recNewCentralCard)
        }
    },[])

    return (
        <centralCardContext.Provider value={{centralCard, emitNewCentralCard}}>
            {children}
        </centralCardContext.Provider>
    )
}

export default SocketProvider
