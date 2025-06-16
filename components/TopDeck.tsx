import React, { useContext } from 'react'
import { motion, useAnimation } from "motion/react"
import CardBack from '@/utils/CardBack'
import { GameState, socketContext } from '@/app/context/Socket'
import { Card } from '@/utils/cardObjects'
import OfflineBanner from './ui/OfflineBanner'

const TopDeck = ({player}:{player: any}) => {
    const sc = useContext(socketContext)
    const setGameState = sc?.setGameState
    let players = sc?.gameState?.players
    let whoseTurn = sc?.gameState?.whoseTurn
    let myturn = false
    if(players && whoseTurn &&(player.email == players[whoseTurn].email)) myturn = true
    let name 
    if(player) name = player.playerName.split(' ')[0]
    else return
    let cards = player.deck
    if(!cards) return
    
    // const useCard = (card: Card) => {
    //     if (sc) {
    //         console.log('using card')
    //         let newGameState: any = sc?.gameState
    //         let newDeck = cards!.filter((c:Card) => c.id !== card.id)
    //         console.log('previous state', newGameState)
    //         if (newGameState && players) {
    //             players[whoseTurn].deck = newDeck
    //             newGameState = { ...sc.gameState, discardCard: card, players: players }
    //         }
    //         console.log('new state', newGameState)
    //         if (setGameState) setGameState(newGameState)
    //     }
    // }
    return (
        <div className='h-[150px] w-[700px] flex m-auto absolute left-[50%] top-[10px]'>
            {cards && cards.map((card:Card, index:number) => {
                const x = (index + 1 - ((cards.length + 4) / 2)) * 28
                return (
                    <motion.div
                        key={card.id}
                        layoutId={card.id}
                        // onClick={()=>{useCard(card)}}
                        initial={{ x: x, y:0, rotate:180 }}
                        animate={{ x: x, y:0, rotate:180 }}
                        // whileHover={{
                        //     scale: 1.2,
                        //     transition: { duration: 0.05 },
                        // }}
                        // whileTap={{ scale: 0.9 }}
                        // drag
                        // whileDrag={{ scale: 1.2 }}
                        // onDragEnd={() => {
                        //     controls.start({ x: (index + 1 - ((emptyDeck.length + 4) / 2)) * 28, y:0 });
                        // }}
                        
                        className={`bg-white p-[2px] h-full aspect-[1/1.37] m-1 rounded-lg absolute ${myturn ? ' shadow-2xl shadow-yellow-300' : ''}`}>
                        <CardBack
                            className={'w-full -translate-y-0'}
                        />
                    </motion.div>
                )
            })}
            <div className='p-2 rounded-full h-10 translate-y-[130px] translate-x-[-50%] bg-blue-950 text-white z-50'>
                {cards && `${name} (${cards.length})`}
            </div>
            {!player.online && <OfflineBanner className='w-[10vw] h[10vh] z-50 translate-x-[-120%] translate-y-[7%]'/>}
        </div>
    )
}

export default TopDeck
