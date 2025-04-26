'use client'

import React, { useContext, useEffect, useState } from 'react'
import PlayGround from '../../../components/PlayGround'
// import { useRouter } from 'next/compat/router'
import { SessionContext, useSession } from 'next-auth/react'
import { socketContext } from '@/app/context/SocketProvider'
import { randomDeckGen } from '@/utils/cardGen'
import { usePathname, useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { sessionContext } from '../layout'

const page = () => {
  const [requested, setRequested] = useState(false)

  const path = usePathname()
  const roomId = path.split('/')[path.split('/').length - 1]

  const SocketContext = useContext(socketContext)
  const reqJoinRoom = SocketContext?.reqJoinRoom
  
  const session = useContext(sessionContext)

  const deck = randomDeckGen(10)
  
  useEffect(() => {
    if (!requested && session && reqJoinRoom) {
      setRequested(true)
      console.log('REQUESTING TO JOIN ROOM -> ', roomId as string, session.user?.name as string, session.user?.email as string, deck)
      reqJoinRoom(roomId as string, session.user?.name as string, session.user?.email as string, deck)
    }
  }, [session])

  return (
    <PlayGround />
  )
}

export default page
