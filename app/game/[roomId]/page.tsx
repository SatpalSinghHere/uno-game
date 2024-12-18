'use client'

import React, { useContext, useEffect } from 'react'
import PlayGround from '../components/PlayGround'
// import { useRouter } from 'next/compat/router'
import { useSession } from 'next-auth/react'
import { socketContext } from '@/app/context/SocketProvider'
import { randomDeckGen } from '@/utils/cardGen'
import { usePathname, useRouter } from 'next/navigation'

const page = () => {
  const path = usePathname()
  const roomId = path.split('/')[path.split('/').length - 1]

  const { data: session } = useSession()

  const SocketContext = useContext(socketContext)
  const reqJoinRoom = SocketContext?.reqJoinRoom

  const deck = randomDeckGen(10)
  
  useEffect(() => {
    if (session && reqJoinRoom) {
      console.log('REQUESTING TO JOIN ROOM -> ', roomId as string, session.user?.name as string, session.user?.email as string, deck)
      reqJoinRoom(roomId as string, session.user?.name as string, session.user?.email as string, deck)
    }
  }, [session])

  return (
    <PlayGround />
  )
}

export default page
