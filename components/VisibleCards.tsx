'use client'
import React, { useContext, useEffect, useRef, useState } from 'react';
import card from '@/utils/card.svg';
import CardTemplate from '@/utils/Card';
import { Card, cardList } from '@/utils/cardObjects';
import { GameState, socketContext } from '@/app/context/SocketProvider';
import { thisPlayerContext } from './PlayGround';
import { motion } from 'framer-motion';
import CardBack from '@/utils/CardBack';



const VisibleCards = ({ deck, myTurn }: { deck: Card[], myTurn: boolean }) => {

  const SocketContext = useContext(socketContext)
  const ThisPlayerContext = useContext(thisPlayerContext)

  let gameState: GameState | null | undefined = SocketContext?.gameState
  const discardCard = gameState?.discardCard

  let optionsAvailable = false
  deck.forEach((cardObject) => {
    if (discardCard?.color === cardObject.color || discardCard?.value === cardObject.value) {
      optionsAvailable = true
    }
  })

  if(!optionsAvailable && discardCard && ThisPlayerContext){
    if(gameState.counter!== 0 && (discardCard?.value === '+2' || discardCard?.value === '+4')) {
      //emit +2 card not available
      SocketContext?.emitForNoPlusCard(ThisPlayerContext.playerEmail)
    }
    
  }


  const useCard = (cardObject: Card) => {
    if (discardCard?.color === cardObject.color || discardCard?.value === cardObject.value) {
      if (gameState && gameState.players) {
        if (gameState.players[0]) {

          gameState.discardCard = cardObject
          if (cardObject.value === 'R') gameState.clockwise = !gameState.clockwise
          if (gameState.clockwise) {
            if (cardObject.value !== 'S') {
              gameState.whoseTurn = (gameState.whoseTurn as number + 1) % gameState.players.length
            }
            else {
              gameState.whoseTurn = (gameState.whoseTurn as number + 2) % gameState.players.length
            }
          }
          else {
            if (cardObject.value !== 'S') {
              gameState.whoseTurn = (gameState.whoseTurn as number - 1 + gameState.players.length) % gameState.players.length
            }
            else {
              gameState.whoseTurn = (gameState.whoseTurn as number - 2 + gameState.players.length) % gameState.players.length
            }
          }

          gameState.players.forEach((player, index) => {
            if (player.email === ThisPlayerContext.playerEmail) {
              if (gameState.players) {
                gameState.players[index].deck = player.deck.filter((deckCard: Card) => deckCard !== cardObject)
              }
            }
          })
          console.log('Emitting NEW GAME STATE', gameState)
          SocketContext?.emitNewGameState(gameState, ThisPlayerContext.playerEmail)
        }
      }

    }

  };

  return (

    <div className={'absolute bottom-[5%] h-36 left-1/2 translate-x-[-50%]'}>

      {deck && deck.map((cardObject, index) => {
        const translateX = (index + 1 - ((deck.length + 4) / 2)) * 28;


        let styles = {
          transform: `translateX(${translateX}px)`,
          zIndex: index,
          boxShadow: 'none',
          backgroundColor: 'none',

        }

        if (myTurn) {
          styles = {
            ...styles,
            boxShadow: '0px 10px 10px blue',

          }
        }

        if (myTurn && (cardObject.color == discardCard?.color || cardObject.value == discardCard?.value)) {
          styles = {
            ...styles,
            transform: `translate(${translateX}px, -20px)`
          }
        }

        console.log('CARD ID', cardObject.id)
        // if(cardObject.flipped){
        //   styles = {
        //     ...styles,
        //     transform: `rotateY(180deg) translate(${translateX}px, -20px)`
        //   }
        // }

        // return (
        //   <div key={index} className={'h-full w-auto absolute rounded-lg hover:z-[100]'} style={styles} onClick={() => { if (myTurn) useCard(cardObject) }}>
        //     <CardTemplate
        //       className={' h-full w-auto bg-white rounded-lg hover:translate-y-[-8px] hover:scale-125  duration-75 cursor-pointer'}
        //       color={cardObject.color}
        //       value={cardObject.value}
        //     />
        //   </div>
        // );
        return (

          <div
            key={index}
            onClick={() => { useCard(cardObject) }}
            className='h-full w-auto absolute rounded-lg hover:z-[100]'
            style={styles}
          >

            <CardTemplate className={'h-full bg-white rounded-lg hover:translate-y-[-8px] hover:scale-125  duration-75 cursor-pointer'} color={cardObject.color} value={cardObject.value} />


          </div>
        )
      })}
    </div>

  );
}

export default VisibleCards
