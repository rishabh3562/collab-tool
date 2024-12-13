import React, { useState } from 'react'
import Canvas from './Canvas'
import { BsPenFill } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import getClient from '@/helpers/getUser'
import { getProject } from '@/helpers/getProject'
import Loading from './Loading'

type props =  {
    id :string
}

const CanvasContainer = ({id}:props) => {
    const router = useRouter()
    // const {id} = router.query
    const list: string[] = ["tomato", "lightseagreen", "white", "grey", "hotpink", "red"]
    const { data: projectData, isError, isLoading } = useQuery("project", () => getProject(id as string), {
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchInterval: false
    })

    const { data } = useQuery<any>("userData", () => getClient(), {
        onError: () => router.push("/login"),
    })


    const [color, setColor] = useState<string>("white")
    if(!isLoading && !isError)
    return (
        <div className=' relative h-screen w-full'>
            <div className='absolute bg-black/20 left-4 rounded-xl top-[50%] -translate-y-[50%] flex flex-col items-center gap-2 p-4'>
                <BsPenFill className="text-white my-2 " />
                {list.map((x: string, i: number) => {
                    return (
                        <div onClick={() => setColor(x)} key={x} style={{ background: x }} className={`cursor-pointer ${color === "x" ? "border-2 border-black" : ""} hover:scale-110  rounded-md h-5 w-5`}>
                        </div>
                    )
                })}
            </div>



            <Canvas projectData= {projectData} data = {data} color={color} />
        </div>
    )
    return(
        <div className='w-screen h-screen'>
            <Loading />
        </div>
    )
}

export default CanvasContainer