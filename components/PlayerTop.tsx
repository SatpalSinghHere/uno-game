import CardBack from '@/utils/CardBack';
import { cardList } from '@/utils/cardObjects';
import React, { useState } from 'react'

const PlayerTop = ({noOfCards, myTurn}:{noOfCards : number, myTurn: boolean}) => {

  const array = Array(noOfCards).fill(1)

  return (
    <div className='absolute top-[5%] h-36 left-1/2 translate-x-[-50%]'>
      
      {array.map((_, index) => {
        // const translateX = (index + 1 - midIndex) * 28;
        

        // const cardGap = divWidth / cards.length

        // console.log(cardGap)
        
        // const translateX = index * 28;
        const translateX = (index + 1 - ((array.length-4)/2)) * 28;

        let styles = {
          transform: `translateX(${translateX}px)`,
          zIndex: index,
          boxShadow: 'none',
          backgroundColor: 'none'
        }

        if(myTurn){
          styles = {
            ...styles,
            boxShadow: '0px 10px 10px blue',
            
        }}

        // // Using clsx to conditionally build the class string dynamically
        // const cardClasses = clsx(
        //   'h-full w-auto absolute hover:translate-y-[-8px] hover:scale-125 hover:z-[100] duration-75 cursor-pointer bg-white rounded-lg',
        //   // `translate-x-[${translateX}px]` // Tailwind-compatible class name with dynamic value
        // );

        return (
          <div key={index} className={'h-full w-auto absolute right-0 rounded-lg'} style={styles} >
            <CardBack className={' h-full w-auto bg-white rounded-lg cursor-pointer'}/>
          </div>
        );
      })}
    </div>
  )
}

export default PlayerTop
