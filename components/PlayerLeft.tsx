'use client'
import CardTemplate from '@/utils/Card'
import CardBack from '@/utils/CardBack'
import { cardList } from '@/utils/cardObjects'
import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react'
import FadingText from './FadingText'

export interface FadingTextRef {
  setVisibleTrue: Function
}

const PlayerLeft = forwardRef(({noOfCards, myTurn}:{noOfCards : number, myTurn: boolean}, ref) => {

  const array = Array(noOfCards).fill(1)

  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, ()=>{
    return {
      setVisibleTrue: ()=>{
        console.log('setting Fade text visible')
        setVisible(true)
      }
    }
  },[])

  

  return (
    <div className=' w-28 absolute left-[10%] top-1/2 translate-y-[-50%]'>
      {array.map((_, index)=>{

        const translateX = (index + 1 - ((noOfCards+6)/2)) * 28
        // const translateY = index * 28

        let styles = {
          transform: `translateX(${translateX}px)`,
          zIndex: index,
          boxShadow: 'none',
          backgroundColor: 'none',
          rotate: '90deg'
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
      {visible && <FadingText onHide={()=>{setVisible(false)}} noOfCards={4} />}
    </div>
  )
})

export default PlayerLeft
