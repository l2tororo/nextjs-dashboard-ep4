"use client"

import React from 'react'
import AdminNav from '../../../components/AdminNav'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import Container from '../../../components/Container'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'

function AdminEditPostsPage({params}) {

  const {data: session} = useSession();
  if (!session) redirect("/login");
  if (!session?.user?.role === "admin") redirect("/welcome")

  const {id} = params;

  const[oldPostData , setOldPostData] = useState([]);

  // Edit DATA
  const [newTitle , setNewtitle] = useState("");
  const [newImg , setNewimg] = useState("");
  const [newContent , setNewcontent] = useState("");

  const router = useRouter();

  const getPostbyID = async (id) => {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts/${id}`,{
          method: "GET",
          cache: "no-store"
        })

        if (!res.ok){
          throw new Error("can't fetch")
        }

        const data = await res.json();
        setOldPostData(data.post);

      } catch(error) {
        console.log(error);
      }
    }

    useEffect(() => {
          getPostbyID(id);
    }, [])


  const handleSubmit = async (e) => {
      e.preventDefault();

      try{

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts/${id}`,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ 
            newTitle: newTitle.trim() === "" ? oldPostData?.title : newTitle,
            newImg: newImg.trim() === "" ? oldPostData?.img : newImg,
            newContent: newContent.trim() === "" ? oldPostData?.content : newContent,
           })
        })

        if (!res.ok) {
          throw new Error("Failed updated posts")  
          }

        router.refresh();
        router.push("/admin/posts");

      } catch(error) {
        console.log(error);
      }
    }

  return (
    <Container>
        <AdminNav session={session}/>
        <div className='flex-grow'>
             <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <Link href='/admin/posts' className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl mt-5'>Admin Edit Posts Page</h3>
                    <form onSubmit={handleSubmit}>
                        <input type='text' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={oldPostData?.title} onChange={(e)=>setNewtitle(e.target.value)} value={newTitle} />
                        <input type='text' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={oldPostData?.img} onChange={(e)=>setNewimg(e.target.value)} value={newImg}  />
                        <textarea name="" id="" cols="30" rows="10" placeholder={oldPostData?.content} className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' onChange={(e)=>setNewcontent(e.target.value)} value={newContent} />
                        <button type="submit" name="create" className='bg-green-600 text-white border hover:bg-purple-200 py-2 px-3 rounded text-lg my-2 cursor-pointer'>Edit Post</button> 
                    </form>    
                </div>
        </div>
        <Footer/>
    </Container>
  )
}

export default AdminEditPostsPage