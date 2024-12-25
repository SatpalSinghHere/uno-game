'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const Navbar = () => {
  const { data: session } = useSession()
  return (
    <div className='w-full dark:bg-black dark:text-slate-400 flex justify-between'>
      {/* //left-side items */}
      <div>
        <div className='flex '>
          <div className='p-2 hover:text-white hover:cursor-pointer'>
            UNO
          </div>
        </div>
      </div>
      <div className='flex '>

        {!session?.user &&
          <div className='p-2 hover:text-white hover:cursor-pointer' onClick={() => signIn("google")}>
            Sign in
          </div>
        }
        {session?.user &&
          <div className='p-2 hover:text-white hover:cursor-pointer' onClick={() => signOut()}>
            Signed in as {session?.user?.name}  
            Sign Out
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar
