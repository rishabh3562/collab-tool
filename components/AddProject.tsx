import getInitialClient from '@/helpers/getClient'
import getClient from '@/helpers/getUser'
import { Databases, ID, Query } from 'appwrite'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'

type propTypes = {
    show: boolean
    setShow : React.Dispatch<React.SetStateAction<boolean>>
}

type inviationType = {
    name: string,
    email: string
}


type document = {
    email: string;
    name: string;
    uid: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions?: (null)[] | null;
    $collectionId: string;
    $databaseId: string;
}

const AddProject = ({ show, setShow }: propTypes) => {
    const [invitations, setInvitations] = useState<inviationType[]>([])
    const [input, setInput] = useState<string>("")
    const [projectId, setProjectId] = useState<string>("")
    const [projectName, setProjectName] = useState<string>("")
    const [searchResult, setSearchResult] = useState<any>([])
    const queryClient = useQueryClient()
    const { databases } = getInitialClient()
    const router = useRouter()

    //get user data
    const { data, isLoading } = useQuery<any>("userData", () => getClient(), {
        onError: () => router.push("/login")
    })

    const clearData = () => {
        setProjectId("")
        setProjectName("")
        setShow(!show)
    }


    const searchUser = (email: string) => {
        setInput(email)
       
        databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_USERS_COLLN as string, [Query.search("email", email)])
        .then(d => setSearchResult(d.documents))
        .catch(err => console.log(err))
      

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });
    
}


    const addProject = () => {
        if (projectName.length > 0) {
            const project_id = ID.unique()
            // console.log("project_id",projectId)
            databases.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_PROJECTS_COLLN as string, project_id, {
                admin: data?.email,
                users: [data["$id"]],
                name: projectName
            })
                .then(d => {
                    databases.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_CHATS as string, ID.unique(), {
                        project_id : d["$id"]
                    })
                    queryClient.invalidateQueries("projects")
                    setProjectId(d["$id"])
                })
                .catch(err => console.log(err))
        }
    }

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
                setInvitations(((invitations) => [...invitations, { name, email }]))
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {show ? (
                <>

                    <section className={`trans ${show ? "" : "h-0 overflow-hidden mt-0"} bg-white/10 flex flex-col gap-6 p-6 rounded-md`}>
                        <div className="flex items-center justify-between">
                            <h2 className='text-xl font-semibold'>Add Drawing Boards</h2>
                            <button onClick={()=>clearData()} className='p-2'>Close</button>
                        </div>

                        <div className='flex items-center gap-3'>
                            <input value={projectName} onChange={(e) => setProjectName(e.target.value)} type="text" placeholder='Project name' className='primary-input p-3' />
                            <button onClick={() => addProject()} className=' text-green-500 text-sm font-semibold border-[1px] border-green-400 rounded-lg p-3'>Add Project</button>
                        </div>
                        {projectId ? (
                            <div className="flex gap-3">
                                <input value={input} placeholder='Collaborator email' onChange={(e) => searchUser(e.target.value)} type="text" className='primary-input p-3' />
                                {
                                    invitations.map((x: { name: string, email: string }) => {
                                        return (
                                            <div key = {x.email} className='bg-white flex items-center rounded-md p-2 text-black font-semibold '>{x.email} <p className='ml-2 text-sm font-normal'>(Invitaion sent)</p></div>
                                        )
                                    })
                                }
                            </div>

                        ) : (<></>)}

                        {searchResult.length !== 0 ? <div className='w-[500px] rounded-xl bg-white/20 max-h-[300px] p-1  mt-3 overflow-auto'>
                            {searchResult.map((x: document, i: number) => {
                                return (
                                    <div onClick={() => sendInvitation(x.email, x.name)} key={i} className=' flex p-4 trans hover:primary-gradient  hover:text-black rounded-xl cursor-pointer items-center justify-between'>
                                        <p>{x.email}</p>
                                        <p className='font-semibold'>{x.name}</p>
                                    </div>
                                )
                            })}
                        </div> : (<></>)
                        }
                    </section>
                </>





            ) : (<></>)}
        </>
    )
}

export default AddProject