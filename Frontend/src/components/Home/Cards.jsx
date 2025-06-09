import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";

const Cards = ({home, setInputDiv, data, setData, setUpdatedData, refreshTasks ,  handleImportant: parentHandleImportant,
    handleComplete: parentHandleComplete,
    deleteTask: parentDeleteTask }) => {
    // Define headers once
    const headers = {
        id: localStorage.getItem("userId"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };

    const handleComplete = async (id) => {
        if (parentHandleComplete) return parentHandleComplete(id);
        try {
            await axios.put(
                `http://localhost:5001/api/v2/updateCompleteTask/${id}`,
                {},
                { headers }
            );
            if (refreshTasks) refreshTasks();
        } catch (error) {
            console.log(error);
        }
    };
    const handleImportant = async (id) => {
        if (parentHandleImportant) return parentHandleImportant(id);
        try {
            await axios.put(
                `http://localhost:5001/api/v2/updateImpTask/${id}`,
                {},
                { headers }
            );
            if (refreshTasks) refreshTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const DeleteTask = async (id) => {
        if (parentDeleteTask) return parentDeleteTask(id);
        try {
            await axios.delete(
                `http://localhost:5001/api/v2/deleteTask/${id}`,
                { headers }
            );
            if (refreshTasks) refreshTasks();
        } catch (error) {
            console.log(error);
        }
    };
    const updateTask = (id, title, desc) => {
        setInputDiv("fixed");
        setUpdatedData({ id, title, desc });
    };

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                {data && data.map((items, i) => (
                    <div key={i} className="bg-slate-700 rounded-lg p-6 flex flex-col justify-between ">
                        <h3 className="text-lg font-semibold mb-2">{items.title}</h3>
                        <p>{items.desc}</p>
                        <div className="mt-6 w-full flex items-center ">
                            <button className={`${items.complete === false ? "bg-amber-400" : "bg-green-400"} cursor-pointer text-black p-3 w-1/2 font-semibold rounded-4xl`} onClick={() => handleComplete(items._id, items.complete)}>
                                {items.complete === true ? "Completed" : "Incomplete"}
                            </button>
                            <div className="bg-green-200 w-1/2 p-3 rounded-4xl flex justify-around text-black text-2xl">
                                <button onClick={() => handleImportant(items._id, items.important)}>
                                    {items.important === false ? <CiHeart /> : <FaHeart />}
                                </button>
                                {home === "true" &&  <button onClick={() => updateTask(items._id, items.title, items.desc)}>
                                    <FaEdit />
                                </button>}
                                <button onClick={() => DeleteTask(items._id)}>
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {home === "true" && (
                    <button className="bg-slate-700 rounded-lg p-4 justify-center items-center flex flex-col text-3xl cursor-pointer " onClick={() => setInputDiv("fixed")}>
                        <IoIosAddCircleOutline className="text-5xl" />
                        <h2>Add Task</h2>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Cards;
// import React from "react";
// import { CiHeart } from "react-icons/ci";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { FaHeart } from "react-icons/fa";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import axios from "axios";
// const Cards = ({home,setInputDiv ,data ,setData ,setUpdatedData ,refreshTasks }) => {
//     const handleComplete = async(id )=>{
//         try {
//         const headers = {
//             id: localStorage.getItem("userId"),
//             authorization: `Bearer ${localStorage.getItem("token")}`
//         };
//         await axios.put(
//                 `http://localhost:5001/api/v2/updateCompleteTask/${id}`,
//                 {},
//                 { headers }
//             );
//         if (refreshTasks) refreshTasks();
//         }
//         catch (error) {
//             console.log(error);
//         }
//     }
//     const handleImportant = async(id , currentStatus)=>{
//         try {
//         const headers = {
//             id: localStorage.getItem("userId"),
//             authorization: `Bearer ${localStorage.getItem("token")}`
//         };
//         await axios.put(
//                 `http://localhost:5001/api/v2/updateImpTask/${id}`,
//                 {},
//                 { headers }
//             );
//           //  fetchTasks(); 
//         if (refreshTasks) refreshTasks();
//         }
//         catch (error) {
//             console.log(error);
//         }
//     }
//     const DeleteTask = async(id )=>{
//         try {
//         const headers = {
//             id: localStorage.getItem("userId"),
//             authorization: `Bearer ${localStorage.getItem("token")}`
//         };
//         await axios.delete(
//                 `http://localhost:5001/api/v2/deleteTask/${id}`,
//                 { headers }
//             );
//        // fetchTasks();
//         if (refreshTasks) refreshTasks();
//         }
//         catch (error) {
//             console.log(error);
//         }
//     }

//     const updateTask = (id ,title ,desc)=>{
//         setInputDiv("fixed");
//         setUpdatedData({id:id , title : title , desc :desc});
//     }
//     return (
//         <div  >
//             <div className="grid  grid-cols-3 gap-4  ">
//                 {data && data.map((items, i) => (
//                 <div key={i} className="bg-slate-700 rounded-lg p-6 flex flex-col justify-between ">
//                     <h3  className="text-lg  font-semibold  mb-2">{items.title}</h3>
//                     <p>{items.desc}</p> 
//                     <div className="mt-6 w-full flex items-center ">
//                 <button className={`${items.complete===false ? "bg-amber-400":"bg-green-400"} cursor-pointer text-black p-3 w-1/2 font-semibold rounded-4xl`}  onClick={()=>handleComplete(items._id , items.complete)}
//                 >{items.complete === true ?"Completed" :"Incomplete"}</button>
//                 <div className="bg-green-200 w-1/2 p-3 rounded-4xl flex justify-around  text-black text-2xl">
//                     <button onClick={()=>handleImportant(items._id , items.important)}
//                     >{items.important === false ?<CiHeart /> :<FaHeart /> }</button>
//                     <button  onClick={()=>updateTask(items._id ,items.title , items.desc)}
//                     > <FaEdit /></button>
//                     <button onClick={()=>DeleteTask(items._id)}
//                     ><MdDelete /></button>
//                 </div>
//                 </div>
//             </div>
//                 ))}
//                 {home === "true" && ( <button className="bg-slate-700 rounded-lg p-4 justify-center items-center flex flex-col text-3xl cursor-pointer " onClick={()=>setInputDiv("fixed")}>
//                     <IoIosAddCircleOutline  className="text-5xl" />
//             <h2>Add Task</h2>
//             </button>)}
//             </div>
//         </div>
//     );
// };

// export default Cards