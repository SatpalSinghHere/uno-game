import React, { ReactNode } from 'react'
import SocketProvider from '../context/SocketProvider'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <SocketProvider>
                {children}
            </SocketProvider>
        </>
    )
}

export default layout
