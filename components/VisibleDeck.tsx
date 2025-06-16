import React, { useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { Card } from '@/utils/cardObjects'
import CardTemplate from '@/utils/Card'
import { GameState, socketContext } from '@/app/context/Socket'

import { sortCards } from '@/utils/cardGen'
import { sessionContext } from '@/app/game/layout'

const VisibleDeck = ({ player, twoPlayersLeft }: { player: any, twoPlayersLeft: boolean }) => {

  const session = useContext(sessionContext)
  const sc = useContext(socketContext)
  const gameState = sc?.gameState
  const setGameState = sc?.setGameState
  const emitNewGameState = sc?.emitNewGameState
  let players = sc?.gameState?.players
  console.log('Players', players)
  let whoseTurn = sc?.gameState?.whoseTurn
  let discardCard = sc?.gameState?.discardCard
  let name, cards
  if (player) {
    name = player.playerName.split(' ')[0]
    cards = player.deck
  }
  if (!cards) return
  cards = sortCards(cards!)
  const [myturn, setMyturn] = useState(false)
  useEffect(() => {
    if (players && session && whoseTurn && players[whoseTurn].email == session.user?.email) setMyturn(true)
    else setMyturn(false)
  })
  useEffect(() => {
    if (myturn) {
      console.log('***** MY TURN *****')
    }
  }, [myturn])

  const useCard = (card: Card) => {
    if (myturn && sc && discardCard && sc.gameState && sc.gameState.players && emitNewGameState && whoseTurn) {
      console.log('using card')
      if (discardCard && (discardCard.value === '+2' || discardCard.value === '+4')) {
        if (card.value !== discardCard.value) {
          return
        }
      }
      if (discardCard.color == card.color || discardCard.value == card.value) {
        let newGameState: any = sc?.gameState
        let newDeck = cards!.filter((c: Card) => c.id !== card.id)
        console.log('previous state', newGameState)
        if (newGameState && players) {
          players[whoseTurn].deck = newDeck
          newGameState = { ...sc.gameState, discardCard: card, players: players }
        }
        if (card.value === 'R') {
          sc.gameState.clockwise = !sc.gameState.clockwise
        }
        if (sc.gameState.clockwise) {

          if (card.value === 'S') {
            if (!twoPlayersLeft) {
              let nextWhoseTurn = (sc.gameState.whoseTurn as number + 2) % sc.gameState.players.length
              newGameState = { ...newGameState, whoseTurn: nextWhoseTurn }
            }
          }
          else if (card.value === 'R') {
            if (!twoPlayersLeft) {
              let nextWhoseTurn = (sc.gameState.whoseTurn as number + 1) % sc.gameState.players.length
              newGameState = { ...newGameState, whoseTurn: nextWhoseTurn }
            }
          }
          else {
            let nextWhoseTurn = (sc.gameState.whoseTurn as number + 1) % sc.gameState.players.length
            newGameState = { ...newGameState, whoseTurn: nextWhoseTurn }
          }

        }
        else {
          if (card.value === 'S') {
            if (!twoPlayersLeft) {
              let nextWhoseTurn = (sc.gameState.whoseTurn as number - 2 + sc.gameState.players.length) % sc.gameState.players.length
              newGameState = { ...newGameState, whoseTurn: nextWhoseTurn }
            }
          }
          else if (card.value === 'R') {
            if (!twoPlayersLeft) {
              let nextWhoseTurn = (sc.gameState.whoseTurn as number - 1 + sc.gameState.players.length) % sc.gameState.players.length
              newGameState = { ...newGameState, whoseTurn: nextWhoseTurn }
            }
          }
          else {
            let nextWhoseTurn = (sc.gameState.whoseTurn as number - 1 + sc.gameState.players.length) % sc.gameState.players.length
            newGameState = { ...newGameState, whoseTurn: nextWhoseTurn }
          }
        }

        console.log('new state', newGameState)
        if (setGameState) setGameState(newGameState)
        emitNewGameState(newGameState, player.email)
        setMyturn(false)
      }
    }

  }
  let hasPlusCard = false
  if (discardCard?.value === '+2' || discardCard?.value === '+4') {
    cards.forEach((card: any) => {
      if (discardCard?.value === card.value) {
        hasPlusCard = true
      }
    })

    if (!hasPlusCard && discardCard && player && myturn && gameState && sc) {
      if (gameState.counter !== 0) {
        //emit + card not available
        setTimeout(() => {
          console.log('emitting no plus card by', player.email, player.playerName)
          sc.emitForNoPlusCard(gameState, player.email)
        }, 2000)
      }

    }
  }
  return (
    <div className='h-[150px] w-[700px] flex relative left-[50%] top-[72%]'>
      {/* <AnimatePresence mode='sync'> */}
      {cards!.map((card: Card, index: number) => {
        // const controls = useAnimation()
        const x = (index + 1 - ((cards!.length + 4) / 2)) * 28
        let isUsable = false
        if (discardCard && (discardCard.value === '+2' || discardCard.value === '+4')) {
          if (card.value == discardCard.value) {
            isUsable = true
          }
        }
        else if (discardCard && (discardCard.color == card.color || discardCard.value == card.value)) {
          isUsable = true
        }
        return (
          <motion.div
            key={card.id}
            layoutId={card.id}
            onClick={() => { useCard(card) }}
            initial={{
              x: x,
              y: isUsable && myturn ? -20 : 0,
            }}
            animate={{
              x: x,
              y: isUsable && myturn ? -20 : 0,
            }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.05 },
            }}
            // whileTap={{ scale: 0.9 }}
            // drag
            // whileDrag={{ scale: 1.2 }}
            // onDragEnd={() => {
            //   // controls.start({ x: x, y: 0 });
            // }}

            className={`bg-white p-[2px] h-full aspect-[1/1.37] m-1 rounded-lg absolute ${myturn ? ' shadow-2xl shadow-yellow-300' : ''}`}>
            <CardTemplate
              className={''}
              color={card.color}
              value={card.value}
            />
          </motion.div>
        )
      })}
      <div className='p-2 rounded-full translate-y-[-40px] translate-x-[-50%] h-10 bg-blue-950 text-white z-[-1]'>
        {cards && `${name} (${cards.length})`}
      </div>
      {/* </AnimatePresence> */}
    </div>
  )
}

export default VisibleDeck
