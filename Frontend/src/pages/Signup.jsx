import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector} from "react-redux";
const Signup = () => {
    const history = useNavigate();
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    if(isLoggedIn==true) history("/");
    const [Data ,setData] = useState({username:"",email:"",password:""});
    const change =(e)=>{
        const {name , value} = e.target;
        setData({...Data,[name]:value});
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(Data.username ==="" || Data.email ==="" || Data.password===""){
            alert("All Fields are Required");
        }else {
            try {
                const response = await axios.post("https://merntask-3b8t.onrender.com/api/v1/Signup",Data);
                setData({username:"",email:"",password:""})
                alert(response.data.message);
                history("/Login");

            } catch (error) {
                alert("Signup failed");
            }
        }

    }

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8">
    <div className="bg-slate-400 text-black font-serif font-semibold p-6 sm:p-8 border-4 border-black rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl underline font-bold mb-6 text-center">
        Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block  text-black font-semibold mb-1">UserName</label>
            <input
                type="text"  name="username"  required className="w-full  border-black  px-4 py-2 border-4  rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={change}
                value={Data.username}
            />
        </div>

        <div>
            <label className="block text-black font-semibold mb-1">Email</label>
        <input
            type="email" name="email" required
            onChange={change}
            value={Data.email}
            className="w-full px-4 py-2 border-4 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <div>
            <label className="block text-black  border-black  font-semibold mb-1">Password</label>
            <input
            type="password"
            name="password"
            required
            value={Data.password}
            onChange={change}
            className="w-full px-4 py-2 border-4  border-black   rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <button
            type="submit"
            
            className="w-full bg-blue-500 border-4  border-black hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition duration-200"
        >
            Sign Up
        </button>

        <div className="text-center mt-4">
            <span className="text-black">
            Already have an account?{" "}
            <Link className="text-blue-600 font-semibold underline" to="/Login">
                Login 
            </Link> here
            </span>
        </div>
        </form>
    </div>
    </div>
);
};

export default Signup;
