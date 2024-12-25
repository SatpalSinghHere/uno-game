'use client'

import { Card, cardList } from '@/utils/cardObjects'
import React, { useCallback, useEffect, useState, createContext } from 'react'
import { centralCardContext, CentralCardContext } from './centralCard'
import { io, Socket } from 'socket.io-client'
import { redirect } from 'next/navigation'
import { randomDeckGen, randomString } from '@/utils/cardGen'
import { useSession } from 'next-auth/react'

interface SocketProviderProps {
    children: React.ReactNode
}

export interface GameState {
    roomId: string,
    clockwise: boolean,
    whoseTurn: Number,
    discardCard: Card,
    players: Array<any>
}

export interface SocketContext {
    socketId: string,
    playersOnline: string[]
    gameState: GameState | null,
    emitNewGameState: (newGameState: GameState) => void
    emitStartGame: (roomId: string) => void
    reqJoinRoom: (roomId: string, username: string, userEmail: string, deck: Card[]) => void,
    insideWaitingRoom: (playername: string, roomId: string) => void
}

export const socketContext = createContext<SocketContext | undefined>(undefined);

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [playersOnline, setPlayersOnline] = useState<string[]>([])
    const newOnlinePlayers = useCallback((players: string[]) => {
        setPlayersOnline(players)
    }, [])

    const [gameState, setGameState] = useState<GameState | null>(null)
    const recNewGameState = useCallback((gameState: GameState) => {

        console.log('Receiving new game state', gameState)
        setGameState(gameState)
    }, [])

    const [socket, setSocket] = useState<Socket>()
    const [socketId, setSocketId] = useState<string>('')

    //emitters
    const emitStartGame = useCallback((roomId: string) => {
        // const roomId = randomString()
        if (socket) {
            console.log('Emitting start game', roomId)
            socket.emit('Start Game', roomId)

        }
    }, [socket])

    const insideWaitingRoom = useCallback((playername: string, roomId: string) => {
        if (socket) {
            console.log('Inside waiting room', roomId)
            socket.emit('coming to waiting room', playername, roomId)
        }
    }, [socket])

    const reqJoinRoom = useCallback((roomId: string, username: string, userEmail: string, deck: Card[]) => {
        if (socket) {
            socket.emit('join room', roomId, username, userEmail, deck)
        }
    }, [socket])

    // const emitNewCentralCard: SocketContext['emitNewGameState'] = useCallback((card: Card) => {
    //     if (socket) {
    //         console.log("Emitting new central card ", card)
    //         socket.emit('New Central Card', JSON.stringify(card))
    //     }
    // }, [socket])
    const emitNewGameState = useCallback((newGameState : GameState)=>{
        
        if(socket){
            socket.emit('new game state', newGameState, newGameState.roomId)
        }
    }, [socket])

    const handleNewGameState = useCallback((gameState : GameState)=>{
        console.log('Receiving new game state', gameState)
        setGameState(gameState)
    }, [])



    useEffect(() => {
        const _socket = io('http://localhost:8000')
        _socket.on('connect', () => {
            console.log('connect to socket')
            setSocketId(_socket.id as string)
            console.log('SOCKET ID ----> ', _socket.id)
        })
        _socket.on('new game state', recNewGameState)
        _socket.on('players waiting', newOnlinePlayers)
        _socket.on('new game state', handleNewGameState)
        _socket.on('Start Game', (roomId) => {
            redirect(`/game/${roomId}`)            
        })
        setSocket(_socket)


        return () => {
            _socket.off('new game state', recNewGameState)
            _socket.off('Online Players', newOnlinePlayers)
            _socket.off('Start Game')
            _socket.disconnect()
        }
    }, [])

    return (
        <socketContext.Provider value={{ socketId, playersOnline, gameState, emitNewGameState, emitStartGame, reqJoinRoom, insideWaitingRoom }}>
            {children}
        </socketContext.Provider>
    )
}

export default SocketProvider
