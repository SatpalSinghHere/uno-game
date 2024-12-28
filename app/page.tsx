'use client'
import Navbar from "@/components/Navbar";
import CardTemplate from "@/utils/Card";
import CardBack from "@/utils/CardBack";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import FadingText from "@/components/FadingText";

export default function Home() {
  const cardRef = useRef(null)
  const [cardFlipped, setCardFlipped] = useState(false)
  const flipCard = () => {
    console.log('card flipped!',cardFlipped )
    setCardFlipped(!cardFlipped)
  }

  const [invisible, setInvisible] = useState(false)

  const showComponent = () => {
    console.log('showing component')
    setInvisible(false)
  }

  // let styles = {
  //   transform: 'rotateY(180deg) translate(27%, 0)',
  // }

  // return cardFlipped?(
  //   <div className="dark w-full h-[100vh] bg-slate-800">

  //     <Navbar />
  //     <button onClick={flipCard}>FLIP CARD</button>
  //     <motion.div 
  //     layoutId="abc"
  //     onClick={flipCard} className={cardFlipped?"transform flip-y fixed left-1/4 top-1/4 flex w-28 h-36 duration-100":"h-36 w-28 left-1/2 flex relative duration-100"} >
  //       <div onClick={flipCard} className={cardFlipped?"absolute h-36":"z-10 absolute h-36"}>
  //         <CardTemplate className="h-36 w-auto bg-white rounded-lg" color='blue' value='9' />
  //       </div>
  //       <div onClick={flipCard} className={"absolute h-36"}>
  //       <CardBack className={"transform flip-y w-auto z-1 h-full bg-white rounded-lg duration-500"} />
  //       </div>
        
  //     </motion.div>

  //   </div>
  // ):
  // (
  //   <div className="dark w-full h-[100vh] bg-slate-800">

  //     <Navbar />
  //     <button onClick={flipCard}>FLIP CARD</button>
  //     <motion.div 
  //     layoutId="abc"
  //     onClick={flipCard} className={cardFlipped?"transform flip-y fixed left-3/4 top-3/4 flex w-28 h-36 duration-100":"h-36 w-28 fixed left-3/4 top-3/4 flex duration-100"} >
  //       <div onClick={flipCard} className={cardFlipped?"absolute h-36":"z-10 absolute h-36"}>
  //         <CardTemplate className="h-36 w-auto bg-white rounded-lg" color='blue' value='9' />
  //       </div>
  //       <div onClick={flipCard} className={"absolute h-36"}>
  //       <CardBack className={"transform flip-y w-auto z-1 h-full bg-white rounded-lg duration-500"} />
  //       </div>
        
  //     </motion.div>

  //   </div>
  // )

  return (
    <div className="dark w-full h-[100vh] bg-slate-800">
      <Navbar />
      <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        {!invisible && (<FadingText noOfCards={4} onHide={()=>{setInvisible(true)}} />)}
          <button onClick={()=>{setInvisible(false)}}>Show</button>
      </div>
    </div>
  )
  
}
