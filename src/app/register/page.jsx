"use client"

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

function RegisterPage() {

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [conPassword,setconPassword] = useState("")
    const [error,setError] = useState("")
    const [success,setSuccess] = useState("")

    const router = useRouter();

    const {data: session} = useSession();
    if (session) redirect("/welcome");

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (password != conPassword) {
            setError("Password not MATCH!!")
            return;
        }

        if (!name || !email || !password || !conPassword) {
            setError("Please fill all inputs!!")
            return;
        }
        try{

            const resUserExits = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/userexist`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email})
            })

            const {user} = await resUserExits.json();
            if (user) {
                setError("User already exits")
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            if (res.ok) {
                const form = e.target;
                setError("");
                setSuccess("Success!!");
                form.reset();
                router.replace("login");
            } else {
                console.log("User regis failed")
            }

        } catch(error) {
            console.log("Error Registration: ", error)
        }
    }


    return (
    <Container>
        <Navbar />
          <div className='flex-grow'>
            <div className='flex justify-center items-center'>
                <div className='w-[400px] shadow-xl p-10 mt-5 rounded-xl'>
                    <h3 className='text-3xl'>Register</h3>
                    <hr className='my-3' />
                    <form onSubmit={handleSubmit}>

                        {error && (
                            <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className='bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                                {success}
                            </div>
                        )}

                        <input type='text' onChange={(e) => setName(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter Name' />
                        <input type='email' onChange={(e) => setEmail(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter Email' />
                        <input type='password' onChange={(e) => setPassword(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter Password' />
                        <input type='password' onChange={(e) => setconPassword(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Confirm Password' />
                        <button className='bg-green-800 text-white border py-2 px-3 rounded text-lg my-2 cursor-pointer' type="submit">Sign up</button>
                        <hr className='my-3' />
                        <p>
                            Already have an account? <Link href="/login" className='text-blue-500 hover:underline'>Login</Link> Page
                        </p>
                    </form>
                </div>
            </div>
          </div>
        <Footer />
    </Container>
  )
}


export default RegisterPage