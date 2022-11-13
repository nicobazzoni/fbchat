"use client"

import React, { FormEvent, useState } from 'react'
import {Message} from "../typings"
import useSWR from 'swr'
import fetcher from '../utils/fetchMessages'

function MessageList() {
    const { data: messages, error, mutate} = useSWR<Message[]>("/api/getMessages", fetcher)

  return (
    <div>
        {messages?.map((message) => (
            <div key={message.id} >
                <p>{message.message}</p>
                </div>
        ))} 
        
    </div>
  )
}

export default MessageList