"use client"

import React , {useState , useEffect} from 'react'
import AdminNav from '../components/AdminNav'
import Footer from '../components/Footer'
import SideNav from '../components/SideNav'
import Link from 'next/link'
import Container from '../components/Container'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DeleteBtn from './DeleteBtn'

function UsersPage() {

    const {data: session} = useSession();
      if (!session) redirect("/login");
      if (!session?.user?.role === "admin") redirect("/welcome")

    const [allUsersdata,setAllusersdata] = useState([]);

    const getAllUsersData = async () => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers`,{
                cache: "no-store"
            })
            if (!res.ok){
                throw new Error("failed to fetch user")
            }
            const data = await res.json();
            setAllusersdata(data.totalUsers)

        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUsersData();
    },[])

  return (
    <Container>
        <AdminNav session={session}/>
            <div className='flex-grow'>
                <div className='container mx-auto'>
                    <div className='flex mt-10'>
                        <SideNav/>
                        <div className='p-10'>
                            <h3 className='text-3xl mb-3'>Manage Users</h3>
                            <p>List of Users from MongoDB</p>

                            <div className='shadow-lg overflow-x-auto'>
                                <table className='text-left rounded-md mt-3 table-fixed w-full'>
                                    <thead>
                                        <tr className='bg-green-800 text-white sticky top-0 z-10'>
                                            <th className='p-5'>ID</th>
                                            <th className='p-5'>Username</th>
                                            <th className='p-5'>Email</th>
                                            <th className='p-5'>Role</th>
                                            <th className='p-5'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allUsersdata?.map(val => (

                                            <tr key={val._id}>
                                                <td className='p-5 relative group'>
                                                    <span>{val._id.slice(0, 15)}...</span>
                                                    <span className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition">
                                                        {val._id}
                                                    </span>
                                                </td>
                                                <td className='p-5'>{val.name}</td>
                                                <td className='p-5'>{val.email}</td>
                                                <td className='p-5'>{val.role}</td>
                                                <td className='p-5'>
                                                    <Link className='bg-gray-500 text-white border py-2 px-3 rounded text-lg my-2' href={`/admin/users/edit/${val._id}`}>Edit</Link>
                                                    <DeleteBtn id={val._id}/>
                                                </td>
                                            </tr>

                                        ))}
                                       
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        <Footer/>
    </Container>
  )
}

export default UsersPage