'use client'
import React from 'react'

const Navbar = () => {
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
        <div className='p-2 hover:text-white hover:cursor-pointer'>
          Sign in 
        </div>
        <div className='p-2 hover:text-white hover:cursor-pointer'>
          Sign up 
        </div>
      </div>
    </div>
  )
}

export default Navbar
