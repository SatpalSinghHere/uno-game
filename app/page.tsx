'use client'
import Navbar from "@/components/Navbar";
import CardTemplate from "@/utils/Card";
import CardBack from "@/utils/CardBack";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import FadingText from "@/components/FadingText";
import { dancing_script, inter, jersey_10, lobster, pacifico, roboto_mono, sixtyfour } from "./fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { signIn, signOut, useSession } from "next-auth/react";

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

  const { data: session } = useSession()

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
    <>
    
    <div className="dark w-full h-[100vh] bg-slate-800">
      
      <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[700px] h-[60%] md:flex md:flex-col md:items-center">
        <div className={lobster.className +' absolute md:static text-[200px] antialiased font-extrabold text-cyan-500 hover:font-outline-white-glow hover:text-blue-600 duration-300'}>UNO</div>
        
        {!session && <div className="w-[300px] h-[50vh] rounded-lg absolute md:static -right-10 flex flex-col items-center justify-center gap-2">
          <div className={lobster.className+" w-[200px] hover:cursor-pointer hover:w-full h-[40px] hover:bg-white text-white hover:text-black p-2 rounded-lg hover:shadow-lg flex justify-center duration-500"}><div className="mr-2" onClick={() => signIn("google")}>Sign in with Google</div>  <FontAwesomeIcon size="xl" icon={faGoogle} /></div>
          <div className={lobster.className+" w-[200px] hover:cursor-pointer hover:w-full h-[40px] hover:bg-white text-white hover:text-black p-2 rounded-lg hover:shadow-lg flex justify-center duration-500"}><div className="mr-2" onClick={() => signIn("twitter")}>Sign in with Twitter</div>  <FontAwesomeIcon size="xl" icon={faTwitter} /></div>
        </div>}
        {session?.user && <div className="w-[300px] h-[50vh] rounded-lg absolute md:static -right-10 flex flex-col items-center justify-center gap-2">
          <div className={lobster.className+" w-[200px] h-[40px] text-white text-2xl rounded-lg flex justify-center duration-500"}>Welcome {session.user.name?.split(' ')[0]}!</div>
          <div className="w-[200px] h-[2px] rounded-md bg-white"></div>
          <div className={lobster.className+" w-[250px] hover:cursor-pointer hover:w-full h-[40px] hover:bg-white text-2xl text-white hover:text-black p-1 rounded-lg hover:shadow-lg flex justify-center duration-500"}><div className="mr-2">Create Room to Play</div></div>
          <div className={sixtyfour.className+" w-[100px] hover:cursor-pointer hover:w-full h-[40px] hover:bg-red-700 text-white p-2 rounded-lg hover:shadow-lg flex justify-center duration-500"} onClick={() => signOut()}><div className="mr-2">LOGOUT</div></div>
          
        </div>}
      </div>
    </div>
    </>
  )
  
}
