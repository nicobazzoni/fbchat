import React from 'react'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { Message } from './MessageList'

async function HomePage() {
    const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`).then((res) => res.json())
    console.log(data)

    const messages: Message[] = data.messages
  return (
    <main >
        <MessageList initialMessages={messages} />
        <ChatInput />
    </main>
  )
}

export default HomePage