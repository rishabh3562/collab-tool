import getChats from '@/helpers/getChats'
import { useRouter } from 'next/navigation'
import React, { SetStateAction, useEffect, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs'
import { useQuery } from 'react-query'
import ChatBody from './ChatBody'
import sendChats from '@/helpers/sendChat'
import { chat } from '@/types/chats'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import getInitialClient from '@/helpers/getClient'
import Loading from './Loading'

type props = {
    chats: string[]
    chatId: string
    setChats: React.Dispatch<SetStateAction<string[] | null>>
}

const Chat = ({ id }: { id: string }) => {
    const [minimize, setMinimize] = useState(false)
    const router = useRouter()
    const [chats, setChats] = useState<string[] | null>(null)
    const [chatId, setChatId] = useState<string>("")
    const [msg, setMsg] = useState<string>("")
    const { client } = getInitialClient()
    //working fine (Getchats)
    const { isError, isLoading: chatIsLoading } = useQuery("chats", () => getChats(id as string), {
        onSuccess(data) {
            if (data.documents.length > 0) {
                console.log("data.documents", data.documents);
                console.log("data.documents[0]", data.documents[0]);

                // Now that we know 'chats' exists, access it safely
                const chats = data.documents[0].chats || [];  // Fallback to empty array if 'chats' is not found
                setChats(chats as string[]);

                setChatId(data.documents[0]["$id"]);
            }
        },
    });

    console.log("chats in chat.tsx usestate", chats);
    console.log("chatId in chat.tsx usestate", chatId);
    useEffect(() => {
        if (chatId.length > 0) {
            const unsubscribe = client.subscribe([`databases.${process.env.NEXT_PUBLIC_APPWRITE_DB as string}.collections.${process.env.NEXT_PUBLIC_APPWRITE_DB_CHATS as string}.documents.${chatId}`, 'files'], (response: any) => {
                setChats((chat) => response.payload.chats)
            });
            return () => unsubscribe()
        }

    }, [chatId])

    const sendChatHandler = (e: React.SyntheticEvent) => {
        console.log("clicked")
        e.preventDefault()
        if (msg.length < 1) return;
        sendChats(msg, chats as string[], chatId)
        setMsg("")
    }

    if (chatIsLoading) return (
        <div className='w-screen h-screen'><Loading /></div>
    )
    if (!isError && chats)
        return (
            <div className={`w-[25%] absolute right-2 trans ${minimize ? "bottom-2" : "h-screen"} hidden xl:flex items-center px-5  `}>
                <div className='w-full flex flex-col rounded-md drop-shadow-2xl h-[calc(100%-2rem)] relative overflow-hidden text-white  bg-black/50'>
                    <div className='p-3 h-[50px] flex items-center justify-between text-lg font-semibold border-b-2 border-green-300 sticky bg-black'><p className='text-transparent bg-clip-text primary-gradient'>Team Chat</p>
                        {
                            minimize ?
                                (<IoIosArrowUp onClick={() => setMinimize(false)} className="text-green-400 cursor-pointer" />) :
                                (<IoIosArrowDown onClick={() => setMinimize(true)} className="text-green-400 cursor-pointer" />)
                        }
                    </div>
                    {minimize ? (<></>) : (
                        <>
                            <div className='h-full  pb-[50px] '>
                                <ChatBody chatList={chats as string[]} />
                            </div>
                            <form onSubmit={(e) => sendChatHandler(e)} className='h-[50px] bg-black  text-lg font-semibold text-white fixed bottom-0 w-[100%] '>
                                <input value={msg} onChange={(e) => setMsg(e.target.value)} type="text" className='bg-transparent h-full text-white outline-none w-[90%] px-3' placeholder='Enter Message' />
                                <button type="submit" className=' cursor-pointer relative text-black h-full w-[10%]'>
                                    <BsFillSendFill className='text-2xl text-green-500 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        )

    return (<></>)
}
export default Chat