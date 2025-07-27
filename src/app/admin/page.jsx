"use client"

import React, { useEffect, useState } from 'react'
import AdminNav from './components/AdminNav'
import Container from './components/Container'
import Footer from './components/Footer'
import SideNav from './components/SideNav'
import Content from './components/Content'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function AdminPage() {
  const {data: session} = useSession();
  if (!session) redirect("/login");
  if (!session?.user?.role === "admin") redirect("/welcome")

    const [totalUsers,setTotalusers] = useState([]);
    const [totalPosts,setTotalposts] = useState([]);
    
    const getTotalusers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers`,{
          cache: "no-store"
        })

        if(!res.ok) {
          throw new Error("Failed to fetch users")
        }

        const data = await res.json();
        setTotalusers(data.totalUsers);

      } catch(error) {
        console.log(error);
      }
    }

      const getTotalposts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts`,{
          cache: "no-store"
        })

        if(!res.ok) {
          throw new Error("Failed to fetch posts")
        }

        const data = await res.json();
        setTotalposts(data.totalPosts);

      } catch(error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      getTotalusers();
      getTotalposts();
    },[])

  return (
    <Container>
        <AdminNav session={session} />
        <div className='flex-grow'>
            <div className='container mx-auto'>
                <div className='flex justify-between mt-10'>
                    <SideNav />
                    <Content totalUsers = {totalUsers} totalPosts = {totalPosts} />
                </div>
            </div>
        </div>
        
        <Footer />
    </Container>
  )
}

export default AdminPage