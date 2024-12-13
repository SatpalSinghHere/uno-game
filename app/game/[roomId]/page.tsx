'use client'

import React, { useEffect } from 'react'
import PlayGround from '../components/PlayGround'
import { useRouter } from 'next/compat/router'

const page = () => {
    const router = useRouter()
    useEffect(()=>{
        console.log('Joined room', router?.query.roomId)
    },[])
  return (
    <PlayGround />
  )
}

export default page
