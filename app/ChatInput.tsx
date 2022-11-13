'use client'
import React, { FormEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Message } from '../typings'
import useSWR from 'swr'

import fetcher from '../utils/fetchMessages'

function ChatInput() {

    const [input, setInput] = useState('')
    const { data: messages, error, mutate} = useSWR("/api/getMessages", fetcher)

    console.log(messages)

    const addMessage = async (e: FormEvent<HTMLFormElement>) => { 
      e.preventDefault()
      if (!input) return
       const messageToSend = input
         setInput('')


         const id = uuid()

         const message: Message = {
            id,
            message: messageToSend,
            created_at: Date.now(),
            username: 'User',
            profilePic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/313859012_5460004174115326_8143758335296193475_n.jpg?stp=dst-jpg_p480x480&_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_ohc=Ti42RnVf2tIAX-kVk2R&_nc_ht=scontent-lga3-1.xx&oh=00_AfBerrI1A3kyWKEF1SksQWZrxJ5MH8pZfEDAd7LFiV1qOQ&oe=63748338',
            email: 'nicobazzoni@gmail.com',

         }

         const uploadMessageToUpstash = async () => {
            const data = await fetch('/api/addMessage', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            message,
         }),
         }).then(res => res.json())

         return [data.message, ...messages!]

    }

    await mutate(uploadMessageToUpstash), {
        optomisticData: [message, ...messages!],
    }


   
}
  
  
     return (
    
    <form 

    onSubmit={addMessage}
    
        className=' bg-white fixed bottom-0 z-50 w-full px-10 py-5 space-x-2 border-t border-gray-100 flex'>
        <input 
        className='flex-1 rounded border border-gray-300 
        focus:outline-none focus:ring-2 focus:ring-blue-600 
        focus:border-transparent px-5 py-3 disbaled:opacity-50 
        disabled:cursor-not-allowed' 
        onChange={(e) => setInput(e.target.value)}
        type='text' 
        placeholder='Type a message...' />
        
        <button 
        disabled={!input}
        className='bg-blue-500 hover:blue-700 text-white font-bold py-2 px-4 
        rounded disabled:opacity-50 disabled:cursor-not-allowed'
        type='submit'>
            Send
        </button>
    </form>
  )
}

export default ChatInput
