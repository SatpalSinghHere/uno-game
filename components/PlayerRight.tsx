import CardTemplate from '@/utils/Card'
import CardBack from '@/utils/CardBack'
import { cardList } from '@/utils/cardObjects'
import React, { useState } from 'react'

const PlayerRight = ({noOfCards, myTurn}:{noOfCards : number, myTurn: boolean}) => {
  
  const array = Array(noOfCards).fill(1)

  // console.log(array)

  return (
    <div className=' w-28 absolute right-[10%] top-1/2 translate-y-[-50%]'>
      {array.map((_, index)=>{

        const translateX = (index + 1 - ((noOfCards-6)/2)) * 28
        // const translateY = index * 28

        let styles = {
          transform: `translateX(${translateX}px)`,
          zIndex: index,
          boxShadow: 'none',
          backgroundColor: 'none',
          rotate: '-90deg'
        }

        if(myTurn){
          styles = {
            ...styles,
            boxShadow: '0px -10px 10px blue'
          }
        }

        return (
          <div key={index} className='absolute rounded-lg' style={styles}>
            <CardBack className={'w-full h-auto bg-white rounded-lg'}/>
          </div>
        )
      })}
    </div>
  )
}

export default PlayerRight
