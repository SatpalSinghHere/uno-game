'use client'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React, { useEffect, useState } from 'react'

const Page = ({className}:{className: string}) => {

  const [seconds, setSeconds] = useState<number>(30)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // stop timer at 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);


  return (
    <div className={className}>
      <CircularProgressbar value={seconds} maxValue={30} text={`${seconds}s`} />
    </div>
  );
}

export default Page
