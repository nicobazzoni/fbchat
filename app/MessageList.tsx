"use client"

import React, { FormEvent, useEffect, useState } from 'react'
import {Message} from "../typings"
import useSWR from 'swr'
import fetcher from '../utils/fetchMessages'
import MessageComponent from './MessageComponent'
import { clientPusher } from '../pusher'

type Props = {
    initialMessages: Message[]
}

function MessageList({initialMessages}: Props) {
    const { data: messages, error, mutate} = useSWR<Message[]>("/api/getMessages", fetcher)

    useEffect(() => { 
        const channel = clientPusher.subscribe("messages") 
        channel.bind("new-message", async (data: Message) => { 
            if (messages?.find((message) => message.id === data.id)) return;

            if (!messages) {
                mutate(fetcher)
            } else {
            mutate(fetcher, {
            optomisticData: [data, ...messages!],
            rollbackOnError: true,
            })

            return () => {
                channel.unbind_all()
                channel.unsubscribe()
            }
        }
        })
     
    }, [messages, mutate, clientPusher])

  return (
    <div className='space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-4xl mx-auto'>
        {(messages || initialMessages).map((message) => (
         <MessageComponent key={message.id} message={message} />
                
        ))} 
        
    </div>
  )
}

export default MessageList