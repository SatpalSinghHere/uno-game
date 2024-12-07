'use client'
import React, { useContext, useEffect, useState } from 'react';
import card from '@/utils/card.svg';
import CardTemplate from '@/utils/Card';

import { Card, cardList } from '@/utils/cardObjects';

import { socketContext } from '@/app/context/SocketProvider';

const randomDeckGen = (length: number) => {
  const randomDeck = []
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * cardList.length)
    randomDeck.push(cardList[index])
  }
  return randomDeck
}

const VisibleCards = () => {

  const [cards, setCards] = useState<Card[]>([])
  const centralCardBody = useContext(socketContext)

  if(cards.length == 0){
    const randomDeck = randomDeckGen(10)
    setCards(randomDeck)
  }

  const useCard = (cardObject: Card) => {
    if (centralCardBody?.centralCard.color === cardObject.color || centralCardBody?.centralCard.value === cardObject.value) {
      centralCardBody?.emitNewCentralCard(cardObject)
    }

  };



  return (

    <div className='absolute bottom-[5%] w-2/5 h-36 left-1/2 translate-x-[-50%]'>

      {cards.map((cardObject, index) => {
        // const translateX = (index + 1 - midIndex) * 28;


        // const cardGap = divWidth / cards.length

        // console.log(cardGap)

        const translateX = index * 28;

        const styles = {
          transform: `translateX(${translateX}px)`,
          zIndex: index
        }

        // // Using clsx to conditionally build the class string dynamically
        // const cardClasses = clsx(
        //   'h-full w-auto absolute hover:translate-y-[-8px] hover:scale-125 hover:z-[100] duration-75 cursor-pointer bg-white rounded-lg',
        //   // `translate-x-[${translateX}px]` // Tailwind-compatible class name with dynamic value
        // );

        return (
          <div key={index} className={'h-full w-auto absolute hover:z-[100]'} style={styles} onClick={() => { useCard(cardObject) }}>
            <CardTemplate

              className={' h-full w-auto bg-white rounded-lg hover:translate-y-[-8px] hover:scale-125  duration-75 cursor-pointer'}
              color={cardObject.color}
              value={cardObject.value}
            />
          </div>
        );
      })}
    </div>

  );
}

export default VisibleCards
