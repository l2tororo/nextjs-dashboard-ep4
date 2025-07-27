import React from 'react'
import {FaUsers , FaRegNewspaper} from 'react-icons/fa6'

function Content({totalUsers,totalPosts}) {
  return (
    <div className='px-10 rounded-lg'>
        <div className='flex'>
            <div className='shadow-lg w-[300px] m-3 p-10 rounded-lg'>
                <h3 className='flex items-center'><FaUsers className='mr-2' />Total Users</h3>
                <p className='text-5xl mt-10'>{totalUsers?.length}</p>
            </div>
            <div className='shadow-lg w-[300px] m-3 p-10 rounded-lg'>
                <h3 className='flex items-center'><FaRegNewspaper className='mr-2' />Total Posts</h3>
                <p className='text-5xl mt-10'>{totalPosts?.length}</p>
            </div>
        </div>
        <p className='m-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore ducimus quaerat eaque provident suscipit doloremque voluptatem placeat. Quisquam, deleniti. Aperiam, doloremque dolorem enim delectus nostrum explicabo aliquam magni ratione qui?</p>
    </div>
  )
}

export default Content

// npm i react-icons ใช้โหลดไอคอน