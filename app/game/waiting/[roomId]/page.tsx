'use client'
import React from 'react'
import SocketProvider from '@/app/context/SocketProvider'
import Waiting from '@/components/Waiting'
import { usePathname, useSearchParams } from 'next/navigation'

const page = () => {

    return (
        
            <Waiting />
        
    )
}

export default page
