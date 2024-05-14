import getInitialClient from '@/helpers/getClient'
import { Account, Client, Databases, ID } from 'appwrite'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type SignInDetails = {
    email: string
    password: string
}

type SignUpDetails = SignInDetails & {
    fname: string
    lname: string

}

const Login = () => {
    const router = useRouter()
    const { client, account, databases } = getInitialClient()
    const [loading, setLoading] = useState(false)
    const { register: signUpRegister, handleSubmit, getValues } = useForm<SignUpDetails>()
    const { register: signInRegister, handleSubmit: loginHandleSubmit } = useForm<SignInDetails>()


    useEffect(() => {
        account.get().then(() => { router.push('/dashboard') }).catch(() => console.log("No users"))
    }, [])

    const handleSignUp = (data: SignUpDetails) => {
        setLoading(true)
        account.create(
            ID.unique(),
            data.email,
            data.password,
            data.fname.charAt(0).toUpperCase() + data.fname.slice(1) + " " + data.lname.charAt(0).toUpperCase() + data.lname.slice(1)
        )    
            .then((d) => {
                databases.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_USERS_COLLN as string, ID.unique(), {
                    email: data.email,
                    uid: d["$id"],
                    name: d["name"]
                })
                    .then(d => {
                        // alert("Account Created Successfully")
                        const {email,password} = getValues()
                        handleSignIn({email, password})
                        // handleSignIn({})
                    })
                    .catch(err => console.log(err))
            })
            .catch((err) => console.log(err))
        setLoading(false)
    }

    const handleSignIn = (data: SignInDetails) => {

        setLoading(true)
        const promise = account.createEmailSession(data.email, data.password);

        promise.then(function (response) {
            router.push("/dashboard")
        }, function (error) {
            alert(error)
            setLoading(false)
        });
    }

    return (
        <section className='min-h-screen w-full flex items-center justify-center flex-col gap-2 bg-[#121212] text-white'>
            <h2 className='text-center text-[2.5rem] font-[700]'>Login to Your Account</h2>
            <p className='text-lg md:w-[500px] text-white/40 text-center'>Drag your way into an extraordinary experience and unleash the possibilities within our platform </p>
            <div className='flex flex-col lg:flex-row gap-5 items-center mt-5 justify-center xl:justify-evenly w-full max-w-[700px]'>

                <form onSubmit={loginHandleSubmit(handleSignIn)} className='p-4 flex flex-col gap-3'>
                    <p className='text-sm font-semibold'>Sign In</p>
                    <input required {...signInRegister("email")} type="text" placeholder='email' className='primary-input' />
                    <input required {...signInRegister("password")} type="password" placeholder='password' className='primary-input' />
                    <button type="submit" value="Sign In" className='primary-input primary-gradient grid place-items-center text-snc text-black font-semibold cursor-pointer '>
                        {loading ? (<img src="/loading2.gif" className='w-7 h-7' alt="loading" />) : "Log in"}
                    </button>
                </form>

                <p className='text-2xl font-bold'>/</p>

                <form onSubmit={handleSubmit(handleSignUp)} className='p-4 flex flex-col gap-3'>
                    <p className='text-sm font-semibold'>Sign Up</p>
                    <div className='flex gap-3'>
                        <input required type="text" {...signUpRegister("fname")} placeholder='first name' className='primary-input w-[calc(185px-.375rem)]' />
                        <input required type="text" {...signUpRegister("lname")} placeholder='last name' className='primary-input w-[calc(185px-.375rem)]' />
                    </div>
                    <input required type="email" {...signUpRegister("email")} placeholder='email' className='primary-input' />
                    <div className='flex gap-3'>
                        <input required type="password" {...signUpRegister("password")} placeholder='password' className='primary-input w-[calc(270px-0.9rem)]' />
                        <button type="submit" value="Sign In" className='primary-input primary-gradient grid place-items-center text-black text-sm font-semibold cursor-pointer w-[calc(100px)]'>
                        {loading ? (<img src="/loading2.gif" className='w-7 h-7' alt="loading" />) : (<p>Sign Up</p>)}
                    </button>
                    </div>

                </form>
            </div>
        </section>

    )
}

export default Login