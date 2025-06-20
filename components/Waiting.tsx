'use client'
import React, { useContext, useEffect } from 'react'
import { socketContext } from '../app/context/Socket'
import { usePathname } from 'next/navigation'
import {FadeLoader} from "react-spinners"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { sessionContext } from '@/app/game/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

const Waiting = () => {
    const path = usePathname()
    const roomId = path.split('/')[path.split('/').length - 1]

    const session = useContext(sessionContext)
    console.log('SESSION info : ', session)
    const SocketContext = useContext(socketContext)
    const socketId = SocketContext?.SocketId
    const players = SocketContext?.playersOnline
    const emitStartGame = SocketContext?.emitStartGame
    const insideWaitingRoom = SocketContext?.insideWaitingRoom
    console.log("Players Waiting", SocketContext?.playersOnline)

    async function handleCopyLink(){
        await navigator.clipboard.writeText(window.location.href)
    }

    useEffect(() => {
        if (session && insideWaitingRoom && socketId) {

            insideWaitingRoom(session.user?.name as string, roomId)
        }
    }, [session, socketId])

    if(session && !socketId){
        return (
            <div className='flex flex-col gap-5 justify-center items-center text-xl h-[100vh]'>
                <FadeLoader color={'white'} />Connecting to Server 
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center w-full h-[100vh]'>
            <button className='mt-10 mb-10 py-3 px-6 hover:px-12 bg-blue-800 hover:bg-green-400 active:bg-green-600 duration-200 rounded-3xl' onClick={handleCopyLink}>Share link <FontAwesomeIcon icon={faLink} /></button>
            <div className='w-1/2'>
                <Table className='w-full'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">#</TableHead>
                            <TableHead className="text-right">Waiting Room</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {players?.map((player, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell className="font-medium text-left">{index + 1}</TableCell>
                                    <TableCell className="font-medium text-right">{player[2]}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    <TableCaption className='text-xs'>Maximum four players are allowed</TableCaption>
                </Table>
            </div>

            <button className='mt-10 py-3 px-6 hover:px-12 bg-blue-800 hover:bg-green-400 active:bg-green-600 duration-200 rounded-3xl' onClick={() => { if (emitStartGame) { emitStartGame(roomId) } }}>Start Game 🚀</button>
        </div>
    )
}

export default Waiting
