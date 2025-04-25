import { socketContext } from '@/app/context/SocketProvider';
import CentralDeck from '@/components/CentralDeck';
import PlayerLeft from '@/components/PlayerLeft';
import PlayerRight from '@/components/PlayerRight';
import PlayerTop from '@/components/PlayerTop';
import UsedCards from '@/components/UsedCards';
import VisibleCards from '@/components/VisibleCards';
import { randomDeckGen, sortCards } from '@/utils/cardGen';
import { Card } from '@/utils/cardObjects';
import { useSession } from 'next-auth/react';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { FadingTextRef } from './PlayerLeft';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from 'next/navigation';


interface thisPlayerContextType {
    playerName: string,
    playerEmail: string,

}


export const thisPlayerContext = createContext<thisPlayerContextType>({ playerName: '', playerEmail: '' })

const PlayGround = () => {
    const { data: session } = useSession()

    const SocketContext = useContext(socketContext)
    const gameState = SocketContext?.gameState
    console.log('GAME STATE', gameState)
    const messages = SocketContext?.messages
    const sendMessage = SocketContext?.emitMessage

    //chat message
    const path = usePathname()
    const roomId = path.split('/')[path.split('/').length - 1]
    const [chatInput, setChatInput] = useState<string>('')

    function handleSendMessage() {
        if (sendMessage && chatInput.trim().length > 0) {
            const name = session?.user?.name 
            if(name)sendMessage(name, chatInput, roomId)
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

    //"Enter" key listener to send chat message
    // const chatInputBoxRef = useRef<HTMLInputElement>(null)

    // useEffect(() => {
    //     const inputElement = chatInputBoxRef.current;
    //     if (inputElement) {
    //         const handleKeyDown = (e: KeyboardEvent) => {
    //             if (e.key === "Enter") {
    //                 handleSendMessage();
    //             }
    //         };

    //         inputElement.addEventListener("keydown", handleKeyDown);

    //         return () => {
    //             inputElement.removeEventListener("keydown", handleKeyDown);
    //         };
    //     }
    // }, [chatInputBoxRef.current])

    const players = gameState?.players
    console.log('Number of players', players?.length, players)
    let whoseTurn: any, thisplayer: any, deck, nextPlayer, nextNextPlayer, nextNextNextPlayer, nextCardCount, nextNextCardCount, nextNextNextCardCount
    let thisPLayerIndex = 0
    const leftFadeRef = useRef<FadingTextRef>(null)
    const rightFadeRef = useRef<FadingTextRef>(null)
    const topFadeRef = useRef<FadingTextRef>(null)
    const bottomFadeRef = useRef<FadingTextRef>(null)

    if (players && gameState && session) {
        whoseTurn = players[gameState.whoseTurn as number]
        thisplayer = players.find(player => {
            if (player) {
                return player['email'] === session.user?.email
            }
            else {
                return false
            }
        })

        players.forEach(player => {
            console.log('PLAYER', player)
        })
        console.log('THIS PLAYER', thisplayer)
        console.log('WHOSE TURN', whoseTurn)
        console.log('DECK', thisplayer?.deck)


        deck = thisplayer?.deck as Array<any>

        if (deck) {
            sortCards(deck)

            for (thisPLayerIndex = 0; thisPLayerIndex < players.length; thisPLayerIndex++) {
                if (players[thisPLayerIndex].socketId === SocketContext.socketId) {
                    break
                }
            }

            nextPlayer = players[(thisPLayerIndex + 1) % players.length]
            nextNextPlayer = players[(thisPLayerIndex + 2) % players.length]
            nextNextNextPlayer = players[(thisPLayerIndex + 3) % players.length]

            nextCardCount = players[(thisPLayerIndex + 1) % players.length].deck.length
            nextNextCardCount = players[(thisPLayerIndex + 2) % players.length].deck.length
            nextNextNextCardCount = players[(thisPLayerIndex + 3) % players.length].deck.length

            if (gameState.extraCards) {
                console.log(gameState.extraCards.playerEmail, `got extra ${gameState.extraCards.counter} cards`)
                if (players.length === 2) {
                    if ((nextPlayer.email == gameState.extraCards.playerEmail)) {
                        if (topFadeRef.current) {
                            topFadeRef.current.setVisibleTrue(gameState.extraCards.counter)
                        }
                    }
                    //else
                }
                if (players.length === 3) {
                    if ((nextPlayer.email == gameState.extraCards.playerEmail)) {
                        if (leftFadeRef.current) {
                            leftFadeRef.current.setVisibleTrue(gameState.extraCards.counter)
                        }
                    }
                    else if (nextNextPlayer.email == gameState.extraCards.playerEmail) {
                        if (rightFadeRef.current) {
                            rightFadeRef.current.setVisibleTrue(gameState.extraCards.counter)
                        }
                    }
                }
                if (players.length === 4) {
                    if ((nextPlayer.email == gameState.extraCards.playerEmail)) {
                        if (leftFadeRef.current) {
                            leftFadeRef.current.setVisibleTrue(gameState.extraCards.counter)
                        }
                    }
                    else if (nextNextNextPlayer.email == gameState.extraCards.playerEmail) {
                        if (rightFadeRef.current) {
                            rightFadeRef.current.setVisibleTrue(gameState.extraCards.counter)
                        }
                    }
                    else if (nextNextPlayer.email == gameState.extraCards.playerEmail) {
                        if (topFadeRef.current) {
                            topFadeRef.current.setVisibleTrue(gameState.extraCards.counter)
                        }
                    }
                    setTimeout(() => {
                        SocketContext.setExtraCardsNull()
                    }, 5000)

                }

            }

        }

    }
    const handleForward = () => {
        if (SocketContext && SocketContext.gameState && session && thisplayer == whoseTurn) {
            SocketContext.gameState.players![thisPLayerIndex].deck = [...SocketContext.gameState.players![thisPLayerIndex].deck, randomDeckGen(1)[0]]
            if (SocketContext.gameState.clockwise) {
                SocketContext.gameState.whoseTurn = (SocketContext.gameState.whoseTurn as number + 1) % SocketContext.gameState.players!.length
            }
            else {
                SocketContext.gameState.whoseTurn = (SocketContext.gameState.whoseTurn as number - 1 + SocketContext.gameState.players!.length) % SocketContext.gameState.players!.length
            }
            SocketContext.gameState!.extraCards = null
            console.log('EXTRA CARDS GAMESTATE', SocketContext.gameState!.extraCards)
            SocketContext.emitNewGameState(SocketContext.gameState, session?.user?.email as string)
        }
    }


    const handleFade = () => {
        if (leftFadeRef.current) {
            leftFadeRef.current.setVisibleTrue(3)
        }
        if (rightFadeRef.current) {
            rightFadeRef.current.setVisibleTrue(3)
        }
        if (topFadeRef.current) {
            topFadeRef.current.setVisibleTrue(3)
        }
        if (bottomFadeRef.current) {
            bottomFadeRef.current.setVisibleTrue(3)
        }
    }



    return session && players && (
        <thisPlayerContext.Provider value={{ playerName: session?.user?.name as string, playerEmail: session?.user?.email as string }}>
            <div className="absolute w-full h-full items-center bg-red-950">

                {/* <select onChange={handlePlayerChange} value={players}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select> */}

                {players?.length === 2 && <PlayerTop noOfCards={nextCardCount} myTurn={nextPlayer == whoseTurn} firstName={nextPlayer.playerName.split(' ')[0]} ref={topFadeRef} />}
                {players?.length === 3 && (
                    <>
                        <PlayerLeft noOfCards={nextCardCount} myTurn={nextPlayer == whoseTurn} ref={leftFadeRef} firstName={nextPlayer.playerName.split(' ')[0]} />
                        <PlayerRight noOfCards={nextNextCardCount} myTurn={nextNextPlayer == whoseTurn} firstName={nextNextPlayer.playerName.split(' ')[0]} ref={rightFadeRef} />
                    </>
                )}
                {players?.length === 4 && (
                    <>
                        <PlayerLeft noOfCards={nextCardCount} myTurn={nextPlayer == whoseTurn} ref={leftFadeRef} firstName={nextPlayer.playerName.split(' ')[0]} />
                        <PlayerRight noOfCards={nextNextNextCardCount} myTurn={nextNextNextPlayer == whoseTurn} firstName={nextNextNextPlayer.playerName.split(' ')[0]} ref={rightFadeRef} />
                        <PlayerTop noOfCards={nextNextCardCount} myTurn={nextNextPlayer == whoseTurn} firstName={nextNextPlayer.playerName.split(' ')[0]} ref={topFadeRef} />
                    </>
                )}
                <CentralDeck />
                {deck && <VisibleCards deck={deck} myTurn={thisplayer == whoseTurn} firstName={thisplayer.playerName.split(' ')[0]} ref={bottomFadeRef} />}
                <div onClick={handleForward} className='w-[20%] cursor-pointer rounded-md absolute bottom-10 right-10 p-2 flex justify-center items-center font-bold text-white bg-sky-600 hover:bg-sky-400 duration-250 focus:bg-sky-700'>
                    FORWARD
                </div>
                <div onClick={handleFade} className='w-[20%] cursor-pointer rounded-md absolute top-10 left-10 p-2 flex justify-center items-center font-bold text-white bg-sky-600 hover:bg-sky-400 duration-250 focus:bg-sky-700'>
                    ENABLE FADE
                </div>
                <div className='absolute bottom-10 left-10'>
                    <Popover>
                        <PopoverTrigger className='p-2 rounded-full text-3xl text-white bg-sky-600 hover:bg-sky-400 duration-250 focus:bg-sky-700'>  <FontAwesomeIcon icon={faComment} />  </PopoverTrigger>
                        <PopoverContent ref={chatContainerRef} className='flex flex-col h-[80vh] p-2 overflow-auto text-sm'>
                            <div className=''>
                                {messages && messages.map((item, index) => (
                                    <div className='hover:bg-sky-900 duration-300 p-2 rounded-lg' key={index}>
                                        <div className="text-base text-yellow-600 font-bold">{item[0]}</div>
                                        {item[1]}
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
            </div>
        </thisPlayerContext.Provider>
    )
}

export default PlayGround
