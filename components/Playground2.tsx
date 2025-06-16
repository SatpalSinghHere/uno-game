import { Card, cardList } from '@/utils/cardObjects'
import React, { useContext, useEffect, useRef, useState } from 'react'
import VisibleDeck from './VisibleDeck'
import TopDeck from './TopDeck'
import LeftDeck from './LeftDeck'
import RightDeck from './RightDeck'
import CentralDeck from './CentralDeck'
import { LayoutGroup } from 'motion/react'
import Deck from './Deck'
import { GameState, socketContext } from '@/app/context/Socket'
import { sessionContext } from '@/app/game/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faForward, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { randomDeckGen } from '@/utils/cardGen'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from '@/hooks/use-toast'



const Playground2 = () => {
  const [twoPlayersLeft, setTwoPlayersLeft] = useState(false)
  const session = useContext(sessionContext)
  const userEmail = session?.user?.email
  const sc = useContext(socketContext)
  const gameState = sc?.gameState
  const setGameState = sc?.setGameState
  const emitNewGameState = sc?.emitNewGameState
  const whoseTurn = gameState?.whoseTurn!
  const players = gameState?.players!
  const roomId = gameState?.roomId

  const sendMessage = sc?.emitMessage
  const messages = sc?.messages
  const messageSeen = sc?.messageSeen
  const setMessageSeen = sc?.setMessageSeen

  const { toast } = useToast()
  const Toast = sc?.toast
  const setToast = sc?.setToast
  const emitToast = sc?.emitToast

  useEffect(()=>{
    if( Toast && setToast){
      if (Toast !== ''){
        toast({
          description: Toast,
        })
        setToast('')
      }
    }
  })
  // const playerTurn = players[whoseTurn]

  // console.log(session?.user?.email)

  let thisPlayer: any

  let thisPlayerIndex: number
  let nextPlayerIndex: number
  let nextNextPlayerIndex: number
  let nextNextNextPlayerIndex: number

  let nextPlayer
  let nextNextPlayer
  let nextNextNextPlayer

  const [chatInput, setChatInput] = useState<string>('')

  function handleSendMessage() {
    if (sendMessage && chatInput.trim().length > 0) {
      const name = session?.user?.name?.split(' ')
      if (name) sendMessage(name[0], chatInput, roomId!)
      setChatInput('')
    }
  }

  //chat messsages scroll to bottom
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  useEffect(() => {
    if (players) {
      const onlinePlayers = players.filter(p => p.online)
      if (onlinePlayers.length == 2) setTwoPlayersLeft(true)
      else setTwoPlayersLeft(false)
    }
  })

  console.log(session, sc, gameState, players)
  if (session && sc && gameState && players) {
    thisPlayer = players.find((player) => player.email == session.user?.email)!
    // console.log('thisPlayer', thisPlayer)

    thisPlayerIndex = players.findIndex((player) => player.email == thisPlayer?.email)
    nextPlayerIndex = (thisPlayerIndex as number + 1) % players.length
    nextNextPlayerIndex = (thisPlayerIndex as number + 2) % players.length
    nextNextNextPlayerIndex = (thisPlayerIndex as number + 3) % players.length

    console.log('consecutive indices', thisPlayerIndex, nextPlayerIndex, nextNextPlayerIndex, nextNextNextPlayerIndex)

    nextPlayer = players[nextPlayerIndex]
    nextNextPlayer = players[nextNextPlayerIndex]
    nextNextNextPlayer = players[nextNextNextPlayerIndex]
  }
  // else{
  //   return
  // }

  const handlePass = () => {
    // console.log(gameState , whoseTurn , players , userEmail, setGameState , emitNewGameState)
    // if (gameState && whoseTurn && players && userEmail && setGameState && emitNewGameState) {
    console.log('handling pass')
    let newGameState: GameState = { ...gameState } as GameState
    let nextWhoseTurn


    const extraCard = randomDeckGen(1)
    players.forEach((p) => {
      if (p.email == userEmail) {
        let newDeck = [...p.deck, extraCard[0]]
        newGameState.players![whoseTurn].deck = newDeck
      }
    })
    if (gameState) {
      if (gameState.clockwise) {
        nextWhoseTurn = (gameState.whoseTurn as number + 1) % players.length
      }
      else {
        nextWhoseTurn = (gameState.whoseTurn as number - 1 + players.length) % players.length
      }
    }
    newGameState = { ...newGameState, whoseTurn: nextWhoseTurn }
    setGameState!(newGameState)
    emitNewGameState!(newGameState, userEmail!)
    if(emitToast)emitToast(`${thisPlayer.playerName} took a card and passed...`, roomId!)
  }



  return (
    <div className='base w-[100vw] h-[100vh] fixed z-50'>
      {players && session && <LayoutGroup>
        <CentralDeck />
        <div onClick={() => {
          if (players[whoseTurn].email == session?.user?.email)
            handlePass()
        }}
          className='absolute z-20 bottom-10 right-10 flex justify-center items-center font-bold py-3 px-6 hover:px-12 bg-blue-800 hover:bg-green-400 active:bg-green-600 duration-200 rounded-3xl'>
          PASS &nbsp; <FontAwesomeIcon icon={faForward} />
        </div>
        {players.length == 2 && (
          <>
            <TopDeck player={nextPlayer} />
            <VisibleDeck player={thisPlayer} twoPlayersLeft={twoPlayersLeft} />
          </>
        )}
        {players.length == 3 && (
          <>
            <LeftDeck player={nextPlayer} />
            <RightDeck player={nextNextPlayer} />
            <VisibleDeck player={thisPlayer} twoPlayersLeft={twoPlayersLeft} />
          </>
        )}
        {players.length == 4 && (
          <>
            <LeftDeck player={nextPlayer} />
            <TopDeck player={nextNextPlayer} />
            <RightDeck player={nextNextNextPlayer} />
            <VisibleDeck player={thisPlayer} twoPlayersLeft={twoPlayersLeft} />
          </>
        )}
        <div className='absolute bottom-10 left-10'>
          <Popover>
            <PopoverTrigger
              className={`p-2 rounded-full text-3xl text-white ${messageSeen? 'bg-sky-600 hover:bg-sky-400': 'bg-red-600 hover:bg-red-400'} duration-250`}
              onClick={()=>{
                if(setMessageSeen)setMessageSeen(true)
              }}
            >
              <FontAwesomeIcon icon={faComment} />
            </PopoverTrigger>
            <PopoverContent ref={chatContainerRef} className='flex flex-col h-[80vh] p-2 overflow-auto text-sm'>
              <div className=''>
                {messages && messages.map((item, index) => (
                  <div className='hover:bg-sky-900 bg-sky-950 duration-300 p-2 rounded-lg flex flex-col' key={index}>
                    <div className="text-base text-yellow-600 font-bold">{item[0]}</div>
                    <div>{item[1]}</div>
                  </div>
                ))}
              </div>
              <div className='flex gap-1 mt-auto'>
                <input onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }} value={chatInput} onChange={(e) => { setChatInput(e.target.value) }} className='p-2 bg-sky-600 focus:bg-sky-900 focus:outline-none text-white w-[80%]' type="text" />
                <button onClick={handleSendMessage} className='p-2 w-[20%] bg-sky-800 hover:bg-sky-600 focus:bg-sky-900'><FontAwesomeIcon icon={faPaperPlane} /></button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

      </LayoutGroup>}
    </div>
  )
}

export default Playground2
