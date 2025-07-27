import React from 'react'
import Link from 'next/link'
import Logo from '../../../../public/personal-account-account-svgrepo-com.svg'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

function AdminNav({session}) {
  return (
    <nav className='shadow-xl'>
        <div className='container mx-auto'>
            <div className='flex justify-between items-center p-4'>
                <div className='flex justify-start items-center'>
                    <div>
                    <Link href="/">
                        <Image src={Logo} alt="Logo" width={100} height={100} />
                    </Link>
                    </div>
                    <div className='place-content-start text-2xl'>Admin Page</div>
                </div>
                
                <ul className='flex'>
                   {!session? (
                        <>
                        <li className='mx-3 text-xl'><Link href="/login">Login</Link></li>
                        <li className='mx-3 text-xl'><Link href="/register">Register</Link></li>
                        </>
                    ): (
                        <>
                        <li className='mx-3 text-xl'>
                        {/* <Link href='/welcome' className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2 cursor-pointer'>Profile</Link> */}
                        <a onClick={()=>signOut()} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2 cursor-pointer'>Sign Out</a></li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default AdminNav