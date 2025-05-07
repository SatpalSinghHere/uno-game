'use client'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React, { useContext, useEffect, useState } from 'react'
import { socketContext } from '@/app/context/SocketProvider';

const Timer = ({className, handleForward}:{className: string, handleForward:()=>void}) => {

  const [seconds, setSeconds] = useState<number>(30)
  const SocketContext = useContext(socketContext)
  const whoseTurn = SocketContext?.gameState?.whoseTurn

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
            handleForward()
          clearInterval(interval); // stop timer at 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [whoseTurn]);


  return (
    <div className={className}>
      <CircularProgressbar value={seconds} maxValue={30} text={`${seconds}s`} />
    </div>
  );
}

export default Timer
