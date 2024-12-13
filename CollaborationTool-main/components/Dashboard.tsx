import { Account, Client, Databases, ID, Models, Query } from 'appwrite'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useQueries, useQuery, useQueryClient } from 'react-query'
import DashboardNav from './DashboardNav'
import Projects from './Projects'
import { AiOutlineArrowRight } from 'react-icons/ai'
import getProjects from '@/helpers/db_functions'
import AddProject from './AddProject'
import getClient from '@/helpers/getUser'
import getInitialClient from '@/helpers/getClient'
import Loading from './Loading'
import AddProjectModal from './AddProjectModal'
import { error } from 'console'




const Dashboard = () => {
    const router = useRouter()
    // const [show, setShow] = useState<boolean>(false)
    let [isOpen, setIsOpen] = useState<boolean>(false)

    const queryClient = useQueryClient()
    // const projects : any= queryClient.getQueryData("projects")
    const { client, account, databases } = getInitialClient()
    const [projectNumber, setProjectNumber] = useState<number>(0)

    //get user data
    const { data, isError, isLoading } = useQuery<any>("userData", () => getClient(), {
       
        onError: () => router.push("/login"),
        onSuccess: async (data) => {
            if (data !== "undefined") {
                // console.log(data)
                const res = await getProjects(databases, data["$id"])
                // console.log("res",res);
                setProjectNumber(res.length)
            }

        }
    })
// console.log("user data in Dashboard",data)



    if (isLoading) {
        return (
            <div className='h-screen w-full flex items-center justify-center flex-col'>
                <Loading />
            </div>
        )
    }


    return (
        <main className='bg-black relative text-white min-h-screen w-full'>
            <DashboardNav />
            <section className='max-w-[1200px] w-full min-h-screen relative mx-auto pt-[120px] px-5 xl:px-0 '>
                <div className='flex flex-col md:flex-row items-center justify-between gap-10 xl:gap-none'>
                    <div className='xl:p-6 first:col-span-2'><span className='text-xl leading-2 font-semibold text-white/70 bg-clip-text primary-gradient text-transparent'>Hello</span><span className='text-white text-[3rem] font-semibold block'>{data?.name} 👋</span></div>
                    <div className="flex items-center justify-center w-full md:w-[300px]  h-[130px] rounded-lg primary-gradient">
                        <p className='text-[3rem] font-semibold  text-black'>{projectNumber}<span className='text-sm'>Projects</span></p>
                    </div>

                </div>

                <Projects show={isOpen} setShow={setIsOpen} />
                {/* <AddProject show = {show} setShow = {setShow} /> */}
                <AddProjectModal setIsOpen={setIsOpen} isOpen={isOpen} />

            </section>
        </main>
    )
}

export default Dashboard