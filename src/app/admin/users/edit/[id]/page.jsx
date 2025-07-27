"use client"

import React from 'react'
import AdminNav from '../../../components/AdminNav'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import Container from '../../../components/Container'
import {useState , useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

function AdminEditUserspage({params}) {

    const {data: session} = useSession();
        if (!session) redirect("/login");
        if (!session?.user?.role === "admin") redirect("/welcome")
        
    const {id} = params;
    const [userOldData, setUserOlddata] = useState([]);

    //New user update edit
    const [newName,setNewname] = useState("");
    const [newEmail,setNewemail] = useState("");
    const [newPass,setNewpass] = useState("");

    const router = useRouter();

    const getUserbyID = async (id) => {
      try{
        const res = await fetch(`http://localhost:3000/api/totalusers/${id}`,{
          method: "GET",
          cache: "no-store"
        })

        if (!res.ok){
          throw new Error("can't fetch")
        }

        const data = await res.json();
        setUserOlddata(data.user);

      } catch(error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getUserbyID(id);
    }, [])

    const handleSubmit = async (e) => {
      e.preventDefault();

      try{

        const res = await fetch(`http://localhost:3000/api/totalusers/${id}`,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ 
            newName: newName.trim() === "" ? userOldData?.name : newName,
            newEmail: newEmail.trim() === "" ? userOldData?.email : newEmail,
            newPass: newPass.trim() === "" ? userOldData?.password : newPass,
           })
        })

        if (!res.ok) {
          throw new Error("Failed updated users")  
          }

        router.refresh();
        router.push("/admin/users");

      } catch(error) {
        console.log(error);
      }
    }

  return (
    <Container>
        <AdminNav session={session}/>
        <div className='flex-grow'>
             <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <Link href='/admin/users' className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl mt-5'>Admin Edit Users Page</h3>
                    <form onSubmit={handleSubmit}>
                        <input type='text' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={userOldData?.name} onChange={(e) => setNewname(e.target.value)} value={newName} />
                        <input type='email' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={userOldData?.email} onChange={(e) => setNewemail(e.target.value)} value={newEmail} />                       
                        <input type='password' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={userOldData?.password} onChange={(e) => setNewpass(e.target.value)} value={newPass} />                       

                        <button type="submit" name="update" className='bg-green-600 text-white border hover:bg-purple-200 py-2 px-3 rounded text-lg my-2 cursor-pointer'>Edit Post</button>
                    </form>    
                </div>
        </div>
        <Footer/>
    </Container>
  )
}

export default AdminEditUserspage