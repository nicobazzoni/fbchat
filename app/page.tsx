
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { Message } from '../typings'
import { unstable_getServerSession } from 'next-auth/next'
import { Providers } from './providers'

async function HomePage() {
 
    const data = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`).then((res) => res.json())
    console.log(data)

    const messages: Message[] = data.messages
    const session = await unstable_getServerSession()
  return ( 

    <Providers session={session}>
    <main >
        <MessageList initialMessages={messages} />
        <ChatInput session={session}/>
    </main>
    </Providers>
  )
}

export default HomePage