'use client'
import Navbar from "@/components/Navbar";
import CardTemplate from "@/utils/Card";
import CardBack from "@/utils/CardBack";
import { useRef, useState } from "react";

export default function Home() {
  const cardRef = useRef(null)
  const [cardFlipped, setCardFlipped] = useState(false)
  const flipCard = () => {
    console.log('card flipped!',cardFlipped )
    setCardFlipped(!cardFlipped)
  }

  let styles = {
    transform: 'rotateY(180deg) translate(27%, 0)',
  }

  return (
    <div className="dark w-full h-[100vh] bg-slate-800">

      <Navbar />
      <div onClick={flipCard} className={cardFlipped?"transform flip-y left-1/2 flex relative w-28 h-36 duration-100":"h-36 w-28 left-1/2 flex relative duration-100"} >
        <div onClick={flipCard} className={cardFlipped?"absolute h-36":"z-10 absolute h-36"}>
          <CardTemplate className="h-36 w-auto bg-white rounded-lg" color='blue' value='9' />
        </div>
        <div onClick={flipCard} className={"absolute h-36"}>
        <CardBack className={"transform flip-y w-auto z-1 h-full bg-white rounded-lg duration-500"} />
        </div>
        
      </div>

    </div>
  )
}
