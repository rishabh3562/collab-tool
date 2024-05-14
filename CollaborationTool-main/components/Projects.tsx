import getProjects from '@/helpers/db_functions'
import deleteProject from '@/helpers/deleteProjects'
import getInitialClient from '@/helpers/getClient'
import { Account, Client, Databases, Models, Query } from 'appwrite'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsFillTrash2Fill } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import { useQuery, useQueryClient } from 'react-query'

type propTypes = {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

type projectType = {
    name: string;
    users?: (string)[] | null;
    admin: string;
    edited_by: string;
    data: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions?: (string)[] | null;
    $collectionId: string;
    $databaseId: string;
}


const Projects = ({ show, setShow }: propTypes) => {
    const { client, account, databases } = getInitialClient()
    const queryClient = useQueryClient()
    const userData: any = queryClient.getQueryData("userData")


    const { data: projects, error, isLoading } = useQuery<(Models.Document)[]>("projects", () => getProjects(databases, userData["$id"]))

    if(isLoading){
        return(
            <section className='my-[3rem] bg-white/10 p-6  h-[170px] rounded-lg drop-shadow-xl animate-pulse'></section>    
        )
    }
    return (
        <section className='my-[3rem] pb-[1.75rem] bg-white/10 p-6 bg-[url("/wave.svg")] bg-cover bg-no-repeat  rounded-lg drop-shadow-xl'>
            <div className=" absolute z-[-999] bg-black/20 inset-0"></div>
            <h2 className='text-xl font-semibold'>Your Drawing Boards</h2>
            <div className='flex flex-wrap items-center gap-6 mt-8'>
                {!error && projects?.map((x) =>
                    <div key={x["$id"]} className='relative group'>
                        <div onClick={() => deleteProject(x,userData,queryClient)} className='hover:text-red-500 cursor-pointer text-xl trans absolute top-2 right-2 hidden group-hover:block z-[100]'>
                            <RxCross2 />
                        </div>

                        <Link href={`/projects/${x["$id"]}`}  className={`h-[130px] trans relative  hover:scale-110  rounded-tr-lg rounded-tl-lg bg-black group border-b-2 border-green-300 w-[130px]  text-white grid place-items-center  cursor-pointer font-bold`}>
                            <div className='w-full h-full relative group overflow-hidden'>

                                <div className='absolute z-10 text-sm absolute-center opacity-0 group-hover:opacity-100 trans'>{x.name}</div>
                                <img src={x?.data} className='relative group-hover:opacity-25 trans' />
                            </div>
                        </Link>
                    </div>)}

                <div onClick={() => setShow(!show)} className={`h-[130px] trans relative  hover:scale-110  rounded-lg bg-black group bg-green-400/80 w-[130px]  text-white grid place-items-center  cursor-pointer font-bold`}>
                    <p className='text-[3rem]'>+</p>

                </div>

            </div>

        </section>
    )
}

export default Projects