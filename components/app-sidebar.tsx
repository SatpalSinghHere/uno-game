'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useRef, useState } from "react"
import { socketContext } from "@/app/context/SocketProvider"
import { usePathname } from "next/navigation"

export function AppSidebar() {

  const [input, setInput] = useState<string>('')

  const SocketContext = useContext(socketContext)
  const messages = SocketContext?.messages
  const sendMessage = SocketContext?.emitMessage

  const path = usePathname()
  const roomId = path.split('/')[path.split('/').length - 1]

  function send() {
    const msg:string = input?.trim()
    if (msg.length > 0) {
      console.log('catching input', msg)
      if (sendMessage) {
        console.log('send function :', sendMessage)
        sendMessage(msg, roomId)
      }
      setInput("")
    }
  }

  const chatContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent ref={chatContainerRef}>
        {
          messages && messages.map((item, index) => <li key={index}>{item}</li>)
        }
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <div className="mb-1 pl-1 pr-1">
        <input onChange={(e) => { setInput(e.target.value) }} type="text" className="w-[80%] p-2 bg-slate-800 text-white z-50 focus:outline-none focus:bg-slate-900" />
        <button onClick={send} className="w-[20%] bg-black p-2 hover:opacity-80 "><FontAwesomeIcon icon={faPaperPlane} /></button>
      </div>
      {/* <SidebarFooter /> */}
    </Sidebar>
  )
}
