import React, { useEffect, useState } from 'react'
import { ImCross } from "react-icons/im";
import axios from "axios";
const InputData = ({InputDiv,setInputDiv ,updatedData ,refreshTasks}) => {
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
                `http://localhost:5001/api/v2/updateTask/${updatedData.id}`,
                Data,
                { headers }
            );
        } else {
            await axios.post(
                `http://localhost:5001/api/v2/createTask`,
                Data,
                { headers }
            );
        }
        setData({ title: "", desc: "" });
        setInputDiv("hidden");
        if (refreshTasks) refreshTasks();
    }
    catch (error) {
        console.log(error);
    }
};
    return (
    <>
    <div className={`${InputDiv} fixed bg-gray-700 top-0 left-0 opacity-80 h-screen w-full `}>
    </div>
    <form onSubmit={handlesSubmit} className={`${InputDiv}  top-0 left-0 fixed flex items-center justify-center   h-screen w-full `}>
        <div className='w-1/2 pt-20 flex flex-col  bg-slate-900 h-[50vh] p-3 rounded-4xl'>
        <div className='flex justify-end mb-4 text-2xl mr-4 '>
            <button className='cursor-pointer' onClick={()=>setInputDiv("hidden")}> <ImCross /></button>
        </div>

        <input type="text" placeholder='Enter Title :' name="title" className='rounded-md    bg-gray-700  p-2 w-full'
        value = {Data.title}
        onChange={change}
        />
        <textarea name="desc" cols="30" rows ="10" id="desc" className='rounded-md mt-2 w-full bg-gray-700 p-2 ' 
        value = {Data.desc}
        onChange={change}
        placeholder='Enter Description : '></textarea>

        <button type='submit' className='bg-blue-500 flex justify-center mt-3 ml-50 items-center w-1/2 rounded-4xl p-4 '  
        >Submit</button>
        </div>
    </form>
    </>
    )
}

export default InputData