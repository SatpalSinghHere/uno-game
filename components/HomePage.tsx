import React from 'react'
import { lobster, sixtyfour } from "@/app/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn, signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { useReportWebVitals } from 'next/web-vitals'
import { Meteors } from "@/components/ui/meteors";

const HomePage = ({session}:{session:any}) => {
    // const router = useRouter()
    // const createRoom = () => {
    //     const uniqueId = crypto.randomUUID();
    //     router.push('/game/waiting/' + uniqueId)
    // }

    return (
        <div className="dark w-full h-[100vh] bg-[#120038] overflow-hidden">
            <Meteors number={50} />
            <div className="fixed top-1/3 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[700px] h-[60%] items-center flex flex-col">
                <div className={lobster.className + ' text-[200px] antialiased font-extrabold text-cyan-500 hover:font-outline-white-glow hover:text-blue-600 duration-300'}>UNO</div>

                {!session?.user ? (<div className="w-[500px] h-[50vh] rounded-lg -right-10 flex flex-col items-center justify-center gap-2">
                    <div className={lobster.className + " w-[400px] hover:cursor-pointer hover:w-full h-[40px] hover:bg-white text-white hover:text-black p-2 rounded-lg hover:shadow-lg flex justify-center duration-500"}><div className="mr-2 flex" onClick={() => signIn("google")}>Sign in with Google</div>  <FontAwesomeIcon size="xl" icon={faGoogle} /></div>
                    <div className={lobster.className + " w-[400px] hover:cursor-pointer hover:w-full h-[40px] hover:bg-white text-white hover:text-black p-2 rounded-lg hover:shadow-lg flex justify-center duration-500"}><div className="mr-2 flex" onClick={() => signIn("github")}>Sign in with Github</div>  <FontAwesomeIcon size="xl" icon={faGithub} /></div>
                </div>) : (
                    <div className="w-[300px] h-[50vh] rounded-lg -right-10 flex flex-col items-center justify-center gap-2">
                        <div className={lobster.className + " w-[200px] h-[40px] text-white text-2xl rounded-lg flex justify-center duration-500"}>Welcome {session.user.name?.split(' ')[0]}!</div>
                        <div className="w-[200px] h-[2px] rounded-md bg-white"></div>
                        <div 
                        // onClick={() => { createRoom() }} 
                        className={lobster.className + " w-[250px] hover:cursor-pointer hover:w-full h-[40px] hover:bg-white text-2xl text-white hover:text-black p-1 rounded-lg hover:shadow-lg flex justify-center duration-500"}><div className="mr-2">Create Room to Play</div></div>
                        <div className={sixtyfour.className + " w-[100px] hover:cursor-pointer hover:w-full h-[40px] hover:bg-red-700 text-white p-2 rounded-lg hover:shadow-lg flex justify-center duration-500"} onClick={() => signOut()}><div className="mr-2">LOGOUT</div></div>

                    </div>
                )}

            </div>
        </div>
    )
}

export default HomePage
