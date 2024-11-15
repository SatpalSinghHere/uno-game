'use client'
import React, { useEffect } from 'react';
import card from '@/utils/card.svg';
import CardTemplate from '@/utils/Card';

import { Card, cardList } from '@/utils/cardObjects';


import { useMutation, useStorage } from '@liveblocks/react/suspense';
import { LiveObject } from '@liveblocks/client';

const VisibleCards = () => {
  
  const [cards, setCards] = React.useState(cardList);
  const [midIndex, setMidIndex] = React.useState(0);

  const centralCard = useStorage((root) => root.centralCard) as {color: string, value: string};

  const updateCentralCard = useMutation(({ storage }, newCard: Card) => {
    let thisCentralCard = storage.get("centralCard") as LiveObject<{color: string, value: string}>;
    console.log(thisCentralCard)
    
    thisCentralCard.set("color", newCard.color);
    thisCentralCard.set("value", newCard.value);
  }, []);

  const useCard = (cardObject: Card) => {
    if(centralCard.color === cardObject.color || centralCard.value === cardObject.value){
      updateCentralCard(cardObject)
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
