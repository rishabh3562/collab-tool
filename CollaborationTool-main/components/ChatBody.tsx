import getClient from '@/helpers/getUser'
import { chat } from '@/types/chats'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useQuery } from 'react-query'

type props = {
    chatList : string[]
}

const ChatBody = ({chatList}:props) => {
    const router = useRouter()
    const dummyArray:chat[] = [
        {
            name: "Akash Sharma",
            message: "Hello",
            email: "akashsharma2002@gmail.com"
        },
        {
            name: "ABC",
            message: "By",
            email: "abc@gmail.com"
        }
    ]
    const { data, isLoading } = useQuery<any>("userData", () => getClient(), {
        onError: () => router.push("/login")
    })

    return (
        <div className='w-full pb-[50px] h-full px-5 pt-3 overflow-auto'>
            {chatList.map((x, i) => {
                const msg = JSON.parse(x)   
                return (
                    <div key = {i} className={`flex my-2 flex-col ${msg.email===data.email?"items-end":"items-start"}`}>
                        <p className={`${msg.email===data.email?"primary-gradient bg-clip-text text-transparent":"text-white/30"} font-bold text-sm`}>{msg.name}</p>
                        <div style={{ float: data.email === msg.email ? "right" : "left" }} className={`rounded-lg my-2 clear-both bg-white/10 p-2`}>{msg.message}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default ChatBody