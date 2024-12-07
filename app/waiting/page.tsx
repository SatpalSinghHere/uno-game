'use client'
import React from 'react'
import SocketProvider from '../context/SocketProvider'
import Waiting from './components/Waiting'

const page = () => {
    
    return (
        <SocketProvider>
            <Waiting />
        </SocketProvider>
    )
}

export default page
