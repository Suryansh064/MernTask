import React from 'react'
import SideBar from '../components/Home/SideBar';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row min-h-screen gap-4 px-2 sm:px-4 py-2">
                <div className="w-full md:w-1/5 bg-gray-900 border-black border-4 rounded-lg p-5 text-white mb-4 md:mb-0">
                    <SideBar />
                </div>
                <div className="w-full md:w-4/5 bg-gray-900 border-4 border-black rounded-lg ">
                    <Outlet />
                </div>
            </div>
            <footer className="w-full bg-gray-900 border-black border-4 text-white text-center py-4  rounded-t-lg shadow-inner">
                &copy; {new Date().getFullYear()} MERN Task App &mdash; Made with ❤️ by Suryansh Singh
                <div>
                    Connect With me @
                    <a  className="text-blue-800 " href="https://www.suryanshsingh.me/">PortFolio</a>
                </div>
            
            </footer>
        </>
    )
}

export default Home;