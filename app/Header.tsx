import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logout from './LogoutButton'

function Header() {
    const session = true 
    if (session) return(
        <header className='sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm'>
            <div>
                <Image  
                className='rounded-full mx-2 object-contain' 
                height={10}
                width={10}
                src='https://links.papareact.com/jne'
                layout='fixed'
                alt="Profile Picture"
                
                />

                <div>
                    <p className='text-blue-400'>Logged in as:</p>
                    <p className='font-bold text-lg'>Nico</p>

                </div>
            </div>

            <Logout />
            </header>
        
    )
  return (
    <header className='sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm'>
       <div className='flex flex-col items-center space-y-5 mt-1'>
        <div className='flex space-x-2 items-center'>
            <Image 
           

            src='https://links.papareact.com/jne'
            height={10}
            width={50}
            alt="Logo"
            
            />
            <p className='text-blue-400'>Welcome to Meta Messenger</p>
        </div>

        <Link  href='/auth/signin' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'> 
         Sign In
        
         </Link>
       </div>
    </header>
  )
}

export default Header