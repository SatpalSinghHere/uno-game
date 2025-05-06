'use client'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import SocketProvider from '../context/SocketProvider'
import {useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { FadeLoader } from 'react-spinners'

import { sessionContext } from '../context/SocketProvider'

const Layout = ({ children }: { children: ReactNode }) => {

    const { data, status } = useSession()
    const [session, setSession] = useState<Session>()
    const router = useRouter()

    useEffect(() => {
        if (status === 'authenticated') {
            setSession(data)
        }
    }, [status, data])

    if (status === 'loading') {
        return (

            <div className='flex flex-col gap-5 justify-center items-center text-xl h-[100vh]'>
                <FadeLoader color={'white'} />Connecting to Server 
            </div>

        )
    }

    if (!session) {
        return (
            <div className='w-full h-[100vh] flex justify-center items-center'>
                <div>
                    Sorry, you need to{' '}
                    <button onClick={() => router.replace('/')} className='text-blue-500 underline'>
                        Sign In
                    </button>{' '}
                    first.
                </div>
            </div>
        )
    }
    return (
        <sessionContext.Provider value={session}>
            <SocketProvider>
                {children}
            </SocketProvider>
        </sessionContext.Provider>
    )
}

export default Layout
