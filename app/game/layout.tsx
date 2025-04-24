import React, { ReactNode } from 'react'
import SocketProvider from '../context/SocketProvider'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


const layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <SocketProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <main>
                        <SidebarTrigger />
                        {children}
                    </main>
                </SidebarProvider>
            </SocketProvider>
        </>
    )
}

export default layout
