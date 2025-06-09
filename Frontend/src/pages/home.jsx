import React from 'react'
import SideBar from '../components/Home/SideBar';
import { Outlet } from 'react-router-dom';
const Home = () => 
    {
    return (
    
    <div className='flex h-screen gap-4 '>
        <div className='w-1/5  bg-gray-900 border-black border-4 ml-2 rounded-lg p-5 text-white '>
        <SideBar/>
        </div>
        <div className='w-4/5 bg-gray-900 border-4 border-black rounded-lg p-3'>
        <Outlet/>
        </div>
    </div>

    )
}
export default Home;