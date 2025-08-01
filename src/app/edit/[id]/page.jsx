"use client"

import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Container from '../../components/Container'
import {useState , useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

function EditPage({params}) {

  const {data: session} = useSession();
  if(!session) redirect("/login")

  const {id} = params;
  const [postData , setPostData] = useState("");

  // New update data
  const[newtitle , setNewtitle] = useState("");
  const[newimg , setNewimg] = useState("");
  const[newcontent , setNewcontent] = useState("");

  const router = useRouter();

  const getPostbyID = async (id) => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`,{
        method: "GET",
        cache: "no-store"
      })
      if (!res.ok) {
        throw new Error("Failed to fetch post")
      }

      const data = await res.json();
      console.log("Edit post: ",data);

      setPostData(data);

    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPostbyID(id)
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`,{
        method: "PUT",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          newtitle: newtitle.trim() === "" ? postData.post?.title : newtitle,
          newimg: newimg.trim() === "" ? postData.post?.img : newimg,
          newcontent: newcontent.trim() === "" ? postData.post?.content : newcontent,
        })
      })

      if (!res.ok) {
        throw new Error("failed to update post")
      }

      router.refresh();
      router.push("/welcome");

    } catch(error) {
      console.log(error);
    }
  }

  return (
    <Container>
        <Navbar />
           <div className='flex-grow'>
                <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <Link href='/welcome' className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl mt-5'>Edit Post</h3>
                    <form onSubmit={handleSubmit}>
                        <input type='text' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={postData.post?.title} onChange={(e) => setNewtitle(e.target.value)} value={newtitle}/>
                        <input type='text' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={postData.post?.img} onChange={(e) => setNewimg(e.target.value)} value={newimg}/>
                        <textarea name="" id="" cols="30" rows="10" placeholder={postData.post?.content} className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' onChange={(e) => setNewcontent(e.target.value)} value={newcontent} />
                        <button type="submit" name="create" className='bg-green-600 text-white border hover:bg-purple-200 py-2 px-3 rounded text-lg my-2 cursor-pointer'>Edit Post</button>
                    </form>    
                </div>
            </div>
        <Footer />
    </Container>
  )
}

export default EditPage