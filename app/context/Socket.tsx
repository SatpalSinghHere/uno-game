'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { createContext } from 'react'
import { Card, cardList } from '@/utils/cardObjects'
import { useRouter } from 'next/navigation'
import { randomDeckGen } from '@/utils/cardGen'


interface SocketProps {
    children: React.ReactNode
}

export interface GameState {
    roomId: string | undefined,
    clockwise: boolean | undefined,
    whoseTurn: number | undefined,
    discardCard: Card | undefined,
    extraCards: {
        playerEmail: string,
        counter: number
    } | null
    players: Array<any> | undefined,
    counter: number
}

export type Message = [string, string]

interface SocketContext {
    SocketId: string,
    gameState: GameState | null,
    setGameState: (gameState: GameState) => void,
    insideWaitingRoom: (playername: string, roomId: string) => void,
    emitStartGame: (roomId: string) => void,
    reqJoinRoom: (roomId: string, username: string, userEmail: string) => void,
    playersOnline: string[]
    emitNewGameState: (newGameState: GameState, playerEmail: string) => void,
    emitForNoPlusCard: (gameStateData: GameState, playerEmail: string) => void,
    messages: Array<string[]>,
    emitMessage: (name: string, msg: string, roomId: string) => void,
    messageSeen: boolean,
    setMessageSeen: (seen: boolean) => void,
    toast: string,
    setToast: (toast: string) => void,
    emitToast: (toast: string, roomId: string) => void
}

export const socketContext = createContext<SocketContext | undefined>(undefined)

const SocketProvider: React.FC<SocketProps> = ({ children }) => {

    const [socket, setSocket] = useState<Socket>()
    const [socketId, setSocketId] = useState<string>('')

    const [gameState, setGameState] = useState<GameState | null>(null)

    const [playersOnline, setPlayersOnline] = useState<string[]>([])

    const [toast, setToast] = useState<string>('')

    const [messages, setMessages] = useState<Message[]>([])
    const [messageSeen, setMessageSeen] = useState(true)
    const emitMessage = useCallback((name: string, msg: string, roomId: string) => {
        if (socket) {
            console.log("Sending message : ", name, msg)
            socket.emit("message", name, msg, roomId)
        }
        else {
            console.log('socket not available')
        }
    }, [socket])

    const handleSetMessage = useCallback((name: string, msg: string) => {
        setMessages(prev => {
            console.log('messages', prev)
            return [...prev, [name, msg]]
        })
        setMessageSeen(false)
    }, [])

    const emitToast = useCallback((toast: string, roomId: string) => {
        if (socket) {
            console.log('emitting toast')
            socket.emit('new toast', toast, roomId)
        }
    }, [socket])

    const handleToast = useCallback((toast: string) => {
        console.log('receiving Toast')
        setToast(toast)
    }, [])

    const insideWaitingRoom = useCallback((playername: string, roomId: string) => {
        if (socket) {
            console.log('Inside waiting room', roomId)
            socket.emit('coming to waiting room', playername, roomId)
        }
    }, [socket])

    const emitStartGame = useCallback((roomId: string) => {
        // const roomId = randomString()
        if (socket) {
            console.log('Emitting start game', roomId)
            socket.emit('Start Game', roomId)

        }
    }, [socket])

    const newOnlinePlayers = useCallback((players: string[]) => {
        console.log("new online players", players)
        setPlayersOnline(players)
    }, [])

    const router = useRouter()
    const handleStartGame = (roomId: string) => {

        router.push(`/game/${roomId}`)
    }

    const reqJoinRoom = useCallback((roomId: string, username: string, userEmail: string) => {
        console.log('running reqJoinRoom', socket)
        if (socket) {
            socket.emit('join room', roomId, username, userEmail)
        }
    }, [socket])

    const recNewGameState = useCallback((gameState: GameState) => {
        console.log('Receiving new game state', gameState)

        setGameState(gameState)

    }, [])

    const emitNewGameState = useCallback((newGameState: GameState, playerEmail: string) => {

        if (socket) {
            socket.emit('new game state', newGameState, newGameState.roomId, playerEmail)
        }
    }, [socket])

    const emitForNoPlusCard = useCallback((gameStateData: GameState | null | undefined, playerEmail: string) => {
        if (socket) {
            console.log('Emitting no plus card', gameStateData, playerEmail)
            socket.emit('+ card not available', gameStateData, playerEmail)
        }
    }, [socket])

    useEffect(() => {
        console.log('new gameState Set', gameState)
    }, [gameState])

    useEffect(() => {
        const _socket = io(process.env.NEXT_PUBLIC_SERVER_URL)
        _socket.on('connect', () => {
            console.log('connect to socket')
            setSocketId(_socket.id as string)
            console.log('SOCKET ID ----> ', _socket.id)
        })
        _socket.on('players waiting', newOnlinePlayers)
        _socket.on('Start Game', handleStartGame)
        _socket.on('new game state', recNewGameState)
        _socket.on('message', handleSetMessage)
        _socket.on('new toast', handleToast)

        _socket.on('disconnect', () => {
            setSocketId('')
        })
        setSocket(_socket)


        return () => {

            _socket.disconnect()
        }
    }, [])

    return (
        <socketContext.Provider value={
            {
                SocketId: socketId,
                gameState,
                setGameState,
                insideWaitingRoom,
                emitStartGame,
                reqJoinRoom,
                playersOnline,
                emitNewGameState,
                emitForNoPlusCard,
                emitMessage,
                messages,
                messageSeen,
                setMessageSeen,
                toast,
                setToast,
                emitToast
            }
        }>
            {children}
        </socketContext.Provider>
    )
}

export default SocketProvider
