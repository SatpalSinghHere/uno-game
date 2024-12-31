'use client'
import React, { useEffect } from 'react'



const FadingText = ({onHide, noOfCards}:{onHide : Function, noOfCards: number}) => {
  useEffect(() => {
    // Hide the component after 3 seconds
    const timer = setTimeout(() => {
      onHide();
    }, 4000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [onHide]);

  return (
    <div className='w-[200px] h-[200px] absolute z-50 flex justify-center items-center text-[150px] font-outline-2 text-blue-700 font-extrabold animate-fadeup fill-mode-forwards'>
      {`+${noOfCards}`}
    </div>
  )
}

export default FadingText
