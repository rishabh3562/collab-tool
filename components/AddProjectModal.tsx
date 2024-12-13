import { addProject } from '@/helpers/addProject'
import getInitialClient from '@/helpers/getClient'
import getClient from '@/helpers/getUser'
import { setStateBoolean } from '@/types/canvasTypes'
import { Dialog, Transition } from '@headlessui/react'
import { ID, Models, Query } from 'appwrite'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'

type props = {
    isOpen: boolean
    setIsOpen: setStateBoolean
}


type inviationType = {
    name: string,
    email: string
}


export default function MyModal({ isOpen, setIsOpen }: props) {
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState<boolean>(false)
    const [invitations, setInvitations] = useState<inviationType[]>([])
    const [input, setInput] = useState<string>("")
    const [projectId, setProjectId] = useState<string>("")
    const [projectName, setProjectName] = useState<string>("")
    const [searchResult, setSearchResult] = useState<any>([])
    const queryClient = useQueryClient()
    const { databases } = getInitialClient()
    const [mode, setMode] = useState<"solo" | "collab">("solo")
    const router = useRouter()
    const closeModal = () => {
        setProjectId("")
        setInput("")
        setInvitations([])
        setIsOpen(false)
    }



    const { data } = useQuery("userData", () => getClient(), {
        onError: () => router.push("/login"),
    })

    const handleSubmission = async () => {
        setLoading(true)
        const res: { success: boolean, id?: string } = await addProject(projectName, data as Models.User<Models.Preferences>, mode)
        if (res.success) {
            if (mode === "solo") router.push(`projects/${res.id}`)
            else {
                setLoading(false)
                setShow(true)
                setProjectId(res.id as string)
                setLoading(false)
            }
            queryClient.invalidateQueries('projects')
        }
        else alert("Some Error Occured")


    }

    const searchUser = (email: string) => {
        setInput(email)
        databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_USERS_COLLN as string, [Query.search("email", email)])
            .then(d => setSearchResult(d.documents))
            .catch(err => console.log(err))

    }
    // const searchUser = (email: string) => {
    //     setInput(email);

    //     databases.listDocuments(
    //         process.env.NEXT_PUBLIC_APPWRITE_DB as string,
    //         process.env.NEXT_PUBLIC_APPWRITE_DB_USERS_COLLN as string,
    //         [Query.equal("email", email)] // Use exact match
    //     )
    //         .then(d => setSearchResult(d.documents))
    //         .catch(err => console.log(err));
    // };


    const sendInvitation = (email: string, name: string) => {
        databases.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_INVITATIONS_COLLN as string, ID.unique(), {
            from: data?.email,
            to: email,
            from_name: data?.name,
            project_name: projectName,
            project_id: projectId
        })
            .then(d => {
                // console.log(d)
                setSearchResult([])
                setInput("")
                setInvitations(((invitations) => [...invitations, { name, email }]))
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed bg-black/30 inset-0 drop-shadow-xl overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md trans transform overflow-hidden rounded-2xl bg-[#252525] text-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div>
                                        <div className="grid w-full h-[200px] rounded-xl bg-white/20 grid-cols-2 overflow-hidden p-1 gap-2 ">
                                            <div onClick={() => setMode("solo")} className={`h-full ${mode === "solo" ? "primary-gradient" : ""} selection-box`}>
                                                <p>Solo</p>
                                                <Image src="/solo.png" height={170} width={170} className="absolute bottom-0 right-0 z-0" alt={"human"} />

                                            </div>
                                            <div onClick={() => setMode("collab")} className={`h-full ${mode === "collab" ? "primary-gradient" : ""} selection-box`}>
                                                <p>Collab</p>
                                                <Image src="/collab2.png" height={150} width={150} className="absolute bottom-0 right-0 z-0" alt={"humans"} />

                                            </div>

                                        </div>
                                    </div>

                                    {mode === "solo" ? (
                                        <>

                                            <input value={projectName} onChange={(e) => setProjectName(e.target.value)} type="text" className='p-2 text-lg px-3 font-medium bg-black/10 w-full my-4 rounded-md' placeholder='Project Name' />
                                            <button onClick={() => handleSubmission()} disabled={projectName.length === 0} className='bg-black/10 rounded-md p-3 grid place-items-center  w-full font-medium hover:bg-white trans text-white hover:text-black'>
                                                {loading ? (<img src="/loading.gif" className='w-7 h-7' alt="loading" />) : "Get Started"}
                                            </button>
                                        </>
                                    ) : (
                                        <>

                                            <input disabled={show} value={projectName} onChange={(e) => setProjectName(e.target.value)} type="text" className='p-2 text-lg px-3 font-medium bg-black/10 w-full my-4 rounded-md' placeholder='Project Name' />
                                            <button onClick={() => handleSubmission()} disabled={projectName.length === 0} className={`bg-black/10 rounded-md p-3 grid place-items-center  w-full font-medium hover:bg-white trans text-white hover:text-black ${show ? "hidden" : ""}`}>
                                                {loading ? (<img src="/loading.gif" className='w-7 h-7' alt="loading" />) : "Get Started"}
                                            </button>
                                            {show ? (
                                                <>

                                                    <input value={input} onChange={(e) => searchUser(e.target.value)} type="text" className='p-2 text-lg px-3 font-medium bg-black/10 w-full mb-2 rounded-md' placeholder='Collaborator Email' />



                                                    {searchResult.length !== 0 ? <div className='w-full rounded-xl bg-white/20 max-h-[300px] p-1  mt-3 overflow-auto'>
                                                        {searchResult.map((x: any, i: number) => {
                                                            return (
                                                                <div onClick={() => sendInvitation(x.email, x.name)} key={i} className='my-2 flex p-4 trans hover:primary-gradient  hover:text-black rounded-xl cursor-pointer items-center justify-between'>
                                                                    <p>{x.email}</p>
                                                                    <p className='font-semibold'>{x.name}</p>
                                                                </div>
                                                            )
                                                        })}
                                                    </div> : (<></>)
                                                    }

                                                    {
                                                        invitations.map((x: { name: string, email: string }) => {
                                                            return (
                                                                <div key={x.email} className='bg-white w-[98%] flex items-center my-2 rounded-md p-2 py-[0.75rem] text-black font-semibold '>{x.email} <p className='ml-auto text-sm font-normal'>(Invitaion sent)</p></div>
                                                            )
                                                        })
                                                    }

                                                    <button onClick={() => router.push(`projects/${projectId}`)} className='bg-black/10 rounded-md mt-2 p-3 grid place-items-center  w-full font-medium hover:bg-white trans text-white hover:text-black'>
                                                        {loading ? (<img src="/loading.gif" className='w-7 h-7' alt="loading" />) : "Get Started"}
                                                    </button>

                                                </>
                                            ) : (<></>)}
                                        </>
                                    )}

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
