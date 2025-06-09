// import React, { useEffect,useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { authActions } from "../../store/auth.js";
// import axios from "axios";
// const SideBar = () => {
//     const history = useNavigate();
//     const dispatch = useDispatch();
//     const [Datas,setDatas] = useState()
//     const Data = [
//         {
//             title: "> All Tasks",
//             link : "/"
//         },
//         {
//             title: "> Important Tasks",
//             link : "/Important"
//         },
//         {
//             title: "> Completed Tasks",
//             link : "/Completed"
//         },
//         {
//             title: "> Incomplete Tasks",
//             link : "/Incomplete"
//         },
//     ];
//     const logout =()=>{
//         dispatch(authActions.logout());
//         localStorage.removeItem("userId");
//         localStorage.removeItem("token");
//         history("/Login")
//     }
//     useEffect(() => {
//     const fetch = async () => {
//         const headers = {
//             id: localStorage.getItem("userId"),
//             authorization: `Bearer ${localStorage.getItem("token")}`
            
//         };
//             try {
//             const response = await axios.get(
//                 "http://localhost:5001/api/v2/getallTask",
//                 { headers }
//             );
//             setDatas(response.data.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     fetch();
// }, []);
//     return (
//         <div className="h-screen  text-white flex flex-col justify-between p-4">
//             {/* Top Section */}
//         {Datas &&  <div>
//                 <h1 className="text-amber-500 text-2xl font-bold underline mb-1 ">{Datas.username}</h1>
//                 <a className="text-blue-300 font-bold text-2xl underline " >{Datas.email}</a>
//             </div>}

//             {/* Middle Section */}
//             <div className=" flex  flex-col items-start">
//                 {Data.map((item, i) => (
//                     <Link to={item.link}  className=" text-2xl m-2 rounded-4xl hover:bg-slate-800 hover:p-3" key={i}>
//                         {item.title}
//                     </Link>
//                 ))}
//             </div>

//             {/* Bottom Section */}
//             <div className="flex justify-center">
//                 <button className="bg-blue-400 font-bold text-black text-lg rounded-lg mb-3 p-4 cursor-pointer" onClick={logout}>
//                     Logout{" "}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SideBar;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth.js";
import axios from "axios";

const SideBar = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const [Datas, setDatas] = useState();
    const Data = [
        { title: "> All Tasks", link: "/" },
        { title: "> Important Tasks", link: "/Important" },
        { title: "> Completed Tasks", link: "/Completed" },
        { title: "> Incomplete Tasks", link: "/Incomplete" },
    ];

    const logout = () => {
        dispatch(authActions.logout());
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        history("/Login");
    };

    useEffect(() => {
        const fetch = async () => {
            const headers = {
                id: localStorage.getItem("userId"),
                authorization: `Bearer ${localStorage.getItem("token")}`,
            };
            try {
                const response = await axios.get(
                    "http://localhost:5001/api/v2/getallTask",
                    { headers }
                );
                setDatas(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, []);

    return (
        <div className="min-h-[60vh] md:h-screen text-white flex flex-col justify-between p-4 bg-gray-900 rounded-lg shadow-md">
            {/* Top Section */}
            {Datas && (
                <div className="mb-6">
                    <h1 className="text-amber-500 text-xl sm:text-2xl font-bold underline mb-1 break-all">{Datas.username}</h1>
                    <a className="text-blue-300 font-bold text-base sm:text-xl underline break-all">{Datas.email}</a>
                </div>
            )}

            {/* Middle Section */}
            <div className="flex flex-col items-start w-full">
                {Data.map((item, i) => (
                    <Link
                        to={item.link}
                        className="text-lg sm:text-xl md:text-2xl m-2 w-full rounded-2xl hover:bg-slate-800 hover:p-3 transition-all"
                        key={i}
                    >
                        {item.title}
                    </Link>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="flex justify-center mt-6">
                <button
                    className="bg-blue-400 font-bold text-black text-base sm:text-lg rounded-lg mb-3 p-3 sm:p-4 cursor-pointer w-full"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default SideBar;