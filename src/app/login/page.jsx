"use client"

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const {data: session} = useSession();
  if (session) router.replace('welcome')

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials",{
        email , password , redirect:false
      })

      if (res.error){
        setError("Invalid Credentials")
        return;
      }

      router.replace("welcome");

    } catch(error){
      console.log(error);
    }
  }

  return (
    <Container>
        <Navbar />
          <div className='flex-grow'>
            <div className='flex justify-center items-center'>
                <div className='w-[400px] shadow-xl p-10 mt-5 rounded-xl'>
                    <h3 className='text-3xl'>Login</h3>
                    <hr className='my-3' />

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                                {error}
                            </div>
                        )}

                        <input type='text' onChange={(e) => setEmail(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter Email' />
                        <input type='password' onChange={(e) => setPass(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter Password' />
                        <button className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2 cursor-pointer' type="submit">Sign in</button>
                        <hr className='my-3' />
                        <p>
                            Do not have an account? <Link href="/register" className='text-blue-500 hover:underline'>Register</Link> Page
                        </p>
                    </form>
                </div>
            </div>
          </div>
        <Footer />
    </Container>
  )
}


export default LoginPage