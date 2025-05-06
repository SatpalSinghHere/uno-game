'use client'

import React, { useContext, useEffect, useState } from 'react'
import PlayGround from '../../../components/PlayGround'
// import { useRouter } from 'next/compat/router'
import { socketContext } from '@/app/context/SocketProvider'
import { randomDeckGen } from '@/utils/cardGen'
import { usePathname } from 'next/navigation'
import { sessionContext } from '../layout'
import { FadeLoader } from 'react-spinners'

const Page = () => {
  const [requested, setRequested] = useState(false)

  const path = usePathname()
  const roomId = path.split('/')[path.split('/').length - 1]

  const SocketContext = useContext(socketContext)
  const reqJoinRoom = SocketContext?.reqJoinRoom
  const socketId = SocketContext?.socketId

  const session = useContext(sessionContext)

  const deck = randomDeckGen(10)

  useEffect(() => {
    if (!requested && session && reqJoinRoom && socketId) {
      setRequested(true)
      console.log('REQUESTING TO JOIN ROOM -> ', roomId as string, session.user?.name as string, session.user?.email as string, deck)
      reqJoinRoom(roomId as string, session.user?.name as string, session.user?.email as string, deck)
    }
  }, [session, socketId])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = '' // Needed for Chrome to trigger the confirmation dialog
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  if (session && !socketId) {
    return (
      <div className='flex flex-col gap-5 justify-center items-center text-xl h-[100vh]'>
        <FadeLoader color={'white'} />Connecting to Server
      </div>
    )
  }

  return (
    <PlayGround />
  )
}

export default Page
