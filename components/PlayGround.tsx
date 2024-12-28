import { socketContext } from '@/app/context/SocketProvider';
import CentralDeck from '@/components/CentralDeck';
import PlayerLeft from '@/components/PlayerLeft';
import PlayerRight from '@/components/PlayerRight';
import PlayerTop from '@/components/PlayerTop';
import UsedCards from '@/components/UsedCards';
import VisibleCards from '@/components/VisibleCards';
import { sortCards } from '@/utils/cardGen';
import { Card } from '@/utils/cardObjects';
import { useSession } from 'next-auth/react';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { FadingTextRef } from './FadingText';

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

    const players = gameState?.players
    console.log('Number of players', players?.length, players)
    let whoseTurn:any, thisplayer: any, deck, nextPlayer, nextNextPlayer, nextNextNextPlayer, nextCardCount, nextNextCardCount, nextNextNextCardCount
    let thisPLayerIndex = 0

    

    if (players && gameState && session) {
        whoseTurn = players[gameState.whoseTurn as number]
        thisplayer = players.find(player => {
            if (player) {
                return player['email'] === session.user?.email
            }
            else{
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

        }
                
    }
    const handleForward = () => {
        if (SocketContext && SocketContext.gameState && session && thisplayer==whoseTurn) {
            if(SocketContext.gameState.clockwise){
                SocketContext.gameState.whoseTurn = (SocketContext.gameState.whoseTurn as number + 1) % SocketContext.gameState.players!.length
            }
            else{
                SocketContext.gameState.whoseTurn = (SocketContext.gameState.whoseTurn as number - 1 + SocketContext.gameState.players!.length) % SocketContext.gameState.players!.length
            }
            SocketContext.emitNewGameState(SocketContext.gameState, session?.user?.email as string)
        }
    }

    const leftFadeRef = useRef<FadingTextRef>(null)
    const handleLeftFade = () => {
        if (leftFadeRef.current) {
            leftFadeRef.current.setVisibleTrue()
        }
    }

    return session && players &&(
        <thisPlayerContext.Provider value={{ playerName: session?.user?.name as string, playerEmail: session?.user?.email as string }}>
            <div className="absolute w-full h-full items-center bg-red-950">

                {/* <select onChange={handlePlayerChange} value={players}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select> */}

                {players?.length === 2 && <PlayerTop noOfCards={nextCardCount} myTurn={nextPlayer == whoseTurn}/>}
                {players?.length === 3 && (
                    <>
                        <PlayerLeft noOfCards={nextCardCount} myTurn={nextPlayer == whoseTurn} ref={leftFadeRef}/>
                        <PlayerRight noOfCards={nextNextCardCount} myTurn={nextNextPlayer == whoseTurn}/>
                    </>
                )}
                {players?.length === 4 && (
                    <>
                        <PlayerLeft noOfCards={nextCardCount} myTurn={nextPlayer == whoseTurn} ref={leftFadeRef} />
                        <PlayerRight noOfCards={nextNextCardCount} myTurn={nextNextNextPlayer == whoseTurn}/>
                        <PlayerTop noOfCards={nextNextNextCardCount} myTurn={nextNextPlayer == whoseTurn}/>
                    </>
                )}
                <CentralDeck />
                {deck && <VisibleCards deck={deck} myTurn={thisplayer == whoseTurn} />}
                <div onClick={handleForward} className='w-[20%] cursor-pointer rounded-md absolute bottom-10 right-10 p-2 flex justify-center items-center font-bold text-white bg-sky-600 hover:bg-sky-400 duration-250 focus:bg-sky-700'>
                    FORWARD
                </div>
                <div onClick={handleLeftFade} className='w-[20%] cursor-pointer rounded-md absolute top-10 left-10 p-2 flex justify-center items-center font-bold text-white bg-sky-600 hover:bg-sky-400 duration-250 focus:bg-sky-700'>
                    ENABLE FADE
                </div>
            </div>
        </thisPlayerContext.Provider>
    )
}

export default PlayGround
