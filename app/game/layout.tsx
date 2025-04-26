'use client'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import SocketProvider from '../context/SocketProvider'
import { SessionContextValue, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'

export const sessionContext = createContext<Session | undefined>(undefined)

const layout = ({ children }: { children: ReactNode }) => {

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

            <div className='w-full h-[100vh] flex justify-center items-center'>
                <div>Loading...</div>
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

export default layout
