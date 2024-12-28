'use client'
import React, { useEffect } from 'react'

export interface FadingTextRef {
  setVisibleTrue: Function
}

const FadingText = ({onHide, noOfCards}:{onHide : Function, noOfCards: number}) => {
  useEffect(() => {
    // Hide the component after 3 seconds
    const timer = setTimeout(() => {
      onHide();
    }, 1000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [onHide]);

  return (
    <div className='w-[300px] h-[300px] flex justify-center items-center text-[100px] text-white animate-fadeup fill-mode-forwards'>
      {`+${noOfCards}`}
    </div>
  )
}

export default FadingText
