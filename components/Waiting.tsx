'use client'
import React, { useContext, useEffect, useState } from 'react'
import { socketContext } from '../app/context/SocketProvider'
import { redirect, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { sessionContext } from '@/app/game/layout'

const Waiting = () => {
    const path = usePathname()
    const roomId = path.split('/')[path.split('/').length - 1]

    const session = useContext(sessionContext)
    console.log('SESSION info : ', session)
    const SocketContext = useContext(socketContext)
    const socketId = SocketContext?.socketId
    const players = SocketContext?.playersOnline
    const emitStartGame = SocketContext?.emitStartGame
    const insideWaitingRoom = SocketContext?.insideWaitingRoom
    console.log("Players Waiting", SocketContext?.playersOnline)

    useEffect(() => {
        if (session && insideWaitingRoom && socketId) {

            insideWaitingRoom(session.user?.name as string, roomId)
        }
    }, [session, socketId])



    return (
        <div className='flex flex-col items-center w-full h-[100vh]'>
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
                    <TableCaption>Maximum four players are allowed</TableCaption>
                </Table>
            </div>

            <button className='mt-10 p-3 w-[20%] bg-blue-800 hover:bg-green-500 duration-200 rounded-3xl' onClick={() => { if (emitStartGame) { emitStartGame(roomId) } }}>Start Game</button>
        </div>
    )
}

export default Waiting
