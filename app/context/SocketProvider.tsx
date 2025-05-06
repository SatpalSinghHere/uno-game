'use client'

import { Card } from '@/utils/cardObjects'
import React, { useCallback, useEffect, useState, createContext } from 'react'

import { io, Socket } from 'socket.io-client'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'

interface SocketProviderProps {
    children: React.ReactNode
}
export const sessionContext = createContext<Session | undefined>(undefined)

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

export interface SocketContext {
    socketId: string,
    playersOnline: string[]
    gameState: GameState | null,
    messages: Array<string[]>,
    emitMessage : (name:string, msg : string, roomId: string) => void,
    emitNewGameState: (newGameState: GameState, playerEmail: string) => void
    emitStartGame: (roomId: string) => void
    reqJoinRoom: (roomId: string, username: string, userEmail: string, deck: Card[]) => void,
    insideWaitingRoom: (playername: string, roomId: string) => void,
    emitForNoPlusCard : (gameStateData: GameState,playerEmail: string)=>void,
    setExtraCardsNull : ()=>void,
}

export const socketContext = createContext<SocketContext | undefined>(undefined);

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const router = useRouter()

    const [playersOnline, setPlayersOnline] = useState<string[]>([])
    const newOnlinePlayers = useCallback((players: string[]) => {
        console.log("new online players", players)
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

    const [messages, setMessages] = useState<Array<string[]>>([['Bruce','I am Batman'],['Peter', 'And I am Spiderman, ntmy sir, big fan']])

    const emitMessage = useCallback((name: string, msg: string, roomId: string)=>{
        if(socket){
            console.log("Sending message : ", name, msg)
            socket.emit("message", name, msg, roomId)
        }
        else{
            console.log('socket not available')
        }
    },[socket])

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

    const emitForNoPlusCard = useCallback((gameStateData: GameState, playerEmail : string)=>{
        if(socket){
            console.log('Emitting no plus card', gameStateData,playerEmail)
            socket.emit('+ card not available', gameStateData, playerEmail)
        }
    }, [socket])

    const gotExtraCards: GameState['extraCards'] = {
        counter: 0,
        playerEmail: ''
    }

    // const emitNewCentralCard: SocketContext['emitNewGameState'] = useCallback((card: Card) => {
    //     if (socket) {
    //         console.log("Emitting new central card ", card)
    //         socket.emit('New Central Card', JSON.stringify(card))
    //     }
    // }, [socket])
    const emitNewGameState = useCallback((newGameState : GameState, playerEmail: string)=>{
        
        if(socket){
            socket.emit('new game state', newGameState, newGameState.roomId, playerEmail)
        }
    }, [socket])

    const handleNewGameState = useCallback((gameState : GameState)=>{
        console.log('Receiving new game state', gameState)
        const audio = new Audio('/sound/new-game-state-sound.wav')
        audio.play()
        setGameState(gameState)
    }, [])

    const setExtraCardsNull = useCallback(()=>{
        setGameState(prev=>{
            return {
                ...prev!,
                extraCards: null
            }                
        })
        // console.log('setting extra cards null from socketProvider', gameState)
    },[socket])

    const handleGotExtraCards = (counter:number, player:string)=>{
        console.log(`GOT EXTRA ${counter} CARDS`, player)
        gotExtraCards.counter = counter
        gotExtraCards.playerEmail = player
    }

    const handleStartGame = (roomId:string) => {

        router.push(`/game/${roomId}`)            
    }

    useEffect(() => {
        if (gameState?.extraCards === null) {
            console.log('extraCards has been set to null:', gameState);
        }
    }, [gameState]);

    useEffect(() => {
        const _socket = io(process.env.NEXT_PUBLIC_SERVER_URL)
        _socket.on('connect', () => {
            console.log('connect to socket')
            setSocketId(_socket.id as string)
            console.log('SOCKET ID ----> ', _socket.id)
        })
        _socket.on('message', (name:string, msg:string)=>{setMessages(prev=>[...prev, [name, msg]])})
        _socket.on('new game state', recNewGameState)
        _socket.on('players waiting', newOnlinePlayers)
        _socket.on('new game state', handleNewGameState)
        _socket.on('Start Game', handleStartGame)
        _socket.on('got extra cards', handleGotExtraCards)
        _socket.on('disconnect', ()=>{
            setSocketId('')
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
        <socketContext.Provider value={{ socketId, playersOnline, gameState, emitNewGameState, messages, emitMessage, emitStartGame, reqJoinRoom, insideWaitingRoom, emitForNoPlusCard, setExtraCardsNull }}>
            {children}
        </socketContext.Provider>
    )
}

export default SocketProvider
