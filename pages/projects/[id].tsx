import Image from 'next/image'
import { Inter } from 'next/font/google'
import Canvas from '@/components/Canvas'
import { useState } from 'react'
import CanvasContainer from '@/components/CanvasContainer'
import { useRouter } from 'next/navigation'
import { Account, Client, Databases, Models } from 'appwrite'
import { useQuery, useQueryClient } from 'react-query'
import Chat from '@/components/Chat'
import getChats from '@/helpers/getChats'
import Loading from '@/components/Loading'
import { getProject } from '@/helpers/getProject'

type props = {
  id: string
}

export default function Home({id}:props) {
  const router = useRouter()
  const [chats,setChats] = useState<string[] | null>(null)
  const [chatId, setChatId] = useState<string>("")
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  const account = new Account(client)
  const databases = new Databases(client)

console.log("ide in home is:",id)

  return (
    <div className='flex relative bg-[url("/pattern.png")] bg-repeat bg-contain'>
      <CanvasContainer id = {id} />
      <Chat id = {id} />
    </div>
  )
}


export async function getServerSideProps({params}:{params:{id:string}}){
  const id = params.id
  return{
    props:{
      id
    }
  }
}
