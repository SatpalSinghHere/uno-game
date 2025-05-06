'use client'
import React, { forwardRef, useContext, useImperativeHandle, useState } from 'react';

import CardTemplate from '@/utils/Card';
import { Card } from '@/utils/cardObjects';
import { GameState, socketContext } from '@/app/context/SocketProvider';
import { thisPlayerContext } from './PlayGround';
import FadingText from './FadingText';



const VisibleCards = forwardRef(({ deck, myTurn, firstName }: { deck: Card[], myTurn: boolean, firstName: string }, ref) => {

  const SocketContext = useContext(socketContext)
  const ThisPlayerContext = useContext(thisPlayerContext)

  const gameState: GameState | null | undefined = SocketContext?.gameState
  const discardCard = gameState?.discardCard
  console.log('COUNTER', gameState?.counter)
  let hasPlusCard = false
  if (discardCard?.value === '+2' || discardCard?.value === '+4') {
    deck.forEach((cardObject) => {
      if (discardCard?.value === cardObject.value) {
        hasPlusCard = true
      }
    })

    if (!hasPlusCard && discardCard && ThisPlayerContext && myTurn) {
      if (gameState.counter !== 0) {
        //emit + card not available
        setTimeout(() => {
          console.log('emitting no plus card by', ThisPlayerContext.playerEmail, ThisPlayerContext.playerName)
          SocketContext?.emitForNoPlusCard(gameState, ThisPlayerContext.playerEmail)
        }, 2000)
      }

    }
  }



  const useCard = (cardObject: Card) => {
    if(discardCard?.value === '+2' || discardCard?.value === '+4'){
      if(cardObject.value !== discardCard.value){
        return
      }
    }
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

  const [extraCardsCount, setExtraCardsCount] = useState<number>(0)

  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      setVisibleTrue: (count: number) => {
        setExtraCardsCount(count)
        console.log('setting right Fade text visible', extraCardsCount)
        setVisible(true)
      }
    }
  }, [])

  return (

    <div className={'absolute bottom-[2%] h-36 left-1/2 translate-x-[-50%]'}>

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

        if (myTurn && ((discardCard?.value === '+2' || discardCard?.value === '+4')?(cardObject.value === discardCard.value):(cardObject.color == discardCard?.color || cardObject.value == discardCard?.value))) {
          styles = {
            ...styles,
            transform: `translate(${translateX}px, -20px)`
          }
        }

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
            onClick={() => { if (myTurn) useCard(cardObject) }}
            className='h-full w-auto absolute rounded-lg hover:z-[100]'
            style={styles}
          >

            <CardTemplate className={'h-full bg-white rounded-lg hover:translate-y-[-8px] hover:scale-125 hover:z-200  duration-75 cursor-pointer'} color={cardObject.color} value={cardObject.value} />


          </div>
        )
      })}
      {visible && <FadingText onHide={() => { setVisible(false) }} noOfCards={extraCardsCount} />}
      <span className='absolute translate-y-[-35px] -translate-x-1/2 text-white font-bold font-outline-1 text-lg'>{`${firstName}(${deck.length})`}</span>
    </div>

  );
})

VisibleCards.displayName = 'VisibleCards'

export default VisibleCards
