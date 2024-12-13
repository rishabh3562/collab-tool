import React, { useState } from 'react'
import { MdHandshake } from 'react-icons/md'
import { BiBell } from 'react-icons/bi'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { Account, Client, Databases, Query } from 'appwrite'
import { useRouter } from 'next/navigation'
import { TiTick } from 'react-icons/ti'
import { RxCross2 } from 'react-icons/rx'
import { useQuery, useQueryClient } from 'react-query'
import getInitialClient from '@/helpers/getClient'

const DashboardNav = () => {
    const [show, setShow] = useState<boolean>(false)
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    const account = new Account(client)
    const databases = new Databases(client)
    const router = useRouter()
    const queryClient = useQueryClient()
    const userdata:any = queryClient.getQueryData("userData")
    // console.log("userdata",userdata)

    const handleLogOut = () => {
        const promise = account.deleteSessions();

        promise.then(function (response) {
            router.push("/login")
        }, function (error) {
            alert(error) // Failure
        });
    }

    const getInvitations = async () => {
        if (userdata) {
            try {
                const data = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_INVITATIONS_COLLN as string, [Query.equal("to", [userdata?.email])])
                return data.documents
            } catch (error) {
                return new Error()
            }
        }
    }


    const { data: invitations, error, isLoading } = useQuery<any>("invitations", getInvitations)
    // console.log(invitations)


    return (
        <nav className='h-[80px] fixed w-full bg-black z-[1000] border-b border-white/20'>
            <div className='h-full mx-auto px-3 xl:px-0 max-w-[1200px] flex items-center justify-between'>
                <div className="flex items-center gap-2">
                    <MdHandshake className='text-3xl' />
                    <h3 className='font-bold primary-gradient text-transparent bg-clip-text'>CollabWrite</h3>
                </div>
                <div className='flex text-xl trans text-white/50 items-center cursor-pointer  gap-2'>
                    <div onClick={() => setShow(!show)} className='trans hover:bg-white/20 p-2 rounded-full relative'>
                        {invitations?.length>0 && <div className='bg-red-500 h-1 rounded-full w-1 absolute right-2'></div>}
                        <BiBell  className='hover:text-white trans' />
                        <div className={`${show ? "flex" : "hidden"} flex-col p-2 rounded-xl w-[320px] left-[-13rem]  absolute md:w-[500px] min-h-[100px] bg-black border-[1px] border-white/20 md:left-[-25rem] xl:left-[-15rem] top-10`}>
                            {!isLoading && !error &&invitations.length>0 ?
                                invitations?.map((x: any, i: number) => <NotificationBox key={i} data={x} />) : 
                                (<div className='grid place-items-center text-md font-bold h-[100px] text-white/50'>No new notifications</div>)}

                        </div>
                    </div>
                    {/* <div className='trans hover:bg-white/20 p-2 rounded-full'>
                        <FiSettings className='hover:text-white trans' />
                    </div> */}
                    <div onClick={handleLogOut} className='trans hover:bg-white/20 p-2 rounded-full'>
                        <FiLogOut  className='hover:text-red-400 trans' />
                    </div>

                </div>
            </div>
        </nav>
    )
}


const NotificationBox = ({ data }: any) => {
    // console.log(data)
    const queryClient = useQueryClient()
    const userData:any = queryClient.getQueryData("userData")
    const {databases} = getInitialClient()
    const deleteInvitaion = (id: string) => {
        databases.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_INVITATIONS_COLLN as string, id).then((e) => queryClient.invalidateQueries("invitations"))
    }

    const acceptInvitation = async (id: string, invitation_id: string,useremail:string) => {
        databases.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_PROJECTS_COLLN as string, id).then((d) => {
            const arr = [...d.users, userData["$id"]]
            databases.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_PROJECTS_COLLN as string, id, {
                users: arr
            }).then(e => {
                deleteInvitaion(invitation_id)
            }).catch(err => console.log(err))
        }).then(e => queryClient.invalidateQueries("projects")).catch(err => console.log(err))
    }

    return (
        <div className='flex flex-col last:border-none  border-b-[.75px]  border-white/20 p-2 items-start gap-3'>
            <div className='px-3 py-1 rounded-xl bg-white/20 text-sm text-white font-semibold '>{data.from}</div>
            <div className='flex gap-3 '>
                <p className='text-[1rem] flex-[.8] text-white'><b>{data.from_name}</b> invited you to collaborate in <b>{data.project_name}</b></p>
                <div className='flex-[.2] grid grid-cols-2 items-center gap-3'>
                    <div onClick={() => acceptInvitation(data.project_id, data["$id"], data.to)} className='rounded-md text-green-400 p-2 border-[.75px] border-green-400'>
                        <TiTick />
                    </div>
                    <div onClick={() => deleteInvitaion(data["$id"])} className='rounded-md text-red-400 p-2  border-[.75px] border-red-400 '>
                        <RxCross2 />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardNav