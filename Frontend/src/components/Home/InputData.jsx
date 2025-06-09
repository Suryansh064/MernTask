import React, { useEffect, useState } from 'react'
import { ImCross } from "react-icons/im";
import axios from "axios";
const InputData = ({InputDiv,setInputDiv ,updatedData ,setUpdatedData ,refreshTasks}) => {
    const [Data , setData] = useState({title:"" , desc:""});
    const change =(e)=>{
        const {name , value} = e.target;
        setData({...Data , [name]:value});
    }
    useEffect(() => {
        setData({title:updatedData.title , desc:updatedData.desc})
    }, [updatedData])
    
    const handlesSubmit = async (e) => {
        e.preventDefault();
        if (Data.title === "" || Data.desc === "") {
            alert("All Fields are Required");
            return;
        }
        try {
            const headers = {
                id: localStorage.getItem("userId"),
                authorization: `Bearer ${localStorage.getItem("token")}`
            };
            if (updatedData && updatedData.id) {
                await axios.put(
                    `https://merntask-3b8t.onrender.com/api/v2/updateTask/${updatedData.id}`,
                    Data,
                    { headers }
                );
            } else {
                await axios.post(
                    `https://merntask-3b8t.onrender.com/api/v2/createTask`,
                    Data,
                    { headers }
                );
            }
            setData({ title: "", desc: "" });
            setInputDiv("hidden");
            if (refreshTasks) refreshTasks();
            if (typeof setUpdatedData === "function") setUpdatedData({ id: "", title: "", desc: "" });
        }
        catch (error) {
            console.log(error);
        }
    };
    return (
    <>
    <div className={`${InputDiv} fixed bg-gray-700 top-0 left-0 opacity-80 h-screen w-full z-40`}></div>
    <form onSubmit={handlesSubmit} className={`${InputDiv} fixed top-0 left-0 flex items-center justify-center h-screen w-full z-50`}>
        <div className='w-full max-w-lg sm:w-3/4 md:w-1/2 pt-10 sm:pt-20 flex flex-col bg-slate-900 min-h-[350px] p-3 sm:p-6 rounded-3xl relative'>
            <div className='flex justify-center items-center mb-6 relative'>
                <h1 className='text-2xl sm:text-4xl font-bold text-blue-500 mx-auto'>
                    {updatedData && updatedData.id ? "Update" : "New"} Task
                </h1>
                <button
                onClick={() => {
                        setInputDiv && setInputDiv("hidden");
                        }}
    type="button"
                >
                    <ImCross />
                </button>
            </div>
            <input
                type="text"
                placeholder='Enter Title :'
                name="title"
                className='rounded-md bg-gray-700 p-2 w-full text-base sm:text-lg'
                value={Data.title}
                onChange={change}
            />
            <textarea
                name="desc"
                cols="30"
                rows="5"
                id="desc"
                className='rounded-md mt-2 w-full bg-gray-700 p-2 text-base sm:text-lg'
                value={Data.desc}
                onChange={change}
                placeholder='Enter Description : '
            ></textarea>
            <div className='flex flex-row gap-4 mt-3'>
                <button
                    type='submit'
                    className='bg-blue-500 flex justify-center items-center w-full rounded-3xl p-3 sm:p-4 m-2 font-semibold text-white hover:bg-blue-600 transition'
                >
                    {updatedData && updatedData.id ? "Update" : "Submit"}
                </button>
            </div>
        </div>
    </form>
    </>
    )
}

export default InputData
