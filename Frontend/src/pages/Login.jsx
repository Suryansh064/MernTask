import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { useSelector , useDispatch } from 'react-redux';
import { authActions } from '../store/auth.js';

const Login = () => {
const [Data ,setData] = useState({username:"",password:""});
        const history = useNavigate();
        const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
        useEffect(() => {
        if(isLoggedIn) {
            history("/");
        }
    }, [isLoggedIn, history]);
        const dispatch = useDispatch();
    const change =(e)=>{
        const {name , value} = e.target;
        setData({...Data,[name]:value});
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(Data.username ==="" || Data.password===""){
            alert("All Fields are Required");
        }else {
            try {
                const response = await axios.post("http://localhost:5001/api/v1/Login",Data);
                setData({username:"",password:""})
                localStorage.setItem("userId", response.data.id);
                localStorage.setItem("token", response.data.token);
                dispatch(authActions.login())
                history("/")
            } catch (error) {
                console.log(error);
                alert("Login failed");
            }
        }

    }
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4 py-8">
    <div className="bg-slate-400 font-serif text-black font-semibold p-6 sm:p-8 border-4  border-black rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl underline sm:text-3xl font-bold mb-6 text-center">SIGN IN</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-black font-bold mb-1">Username</label>
            <input
            type="text"
            name="username"
            onChange={change}
            value={Data.username}
            required
            className="w-full border-4 border-black px-4 py-2  rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
        <div>
            <label className="block text-black font-bold mb-1">Password</label>
            <input
            type="password"
            name="password"
            required
            onChange={change}
            value={Data.password}
            className="w-full px-4 py-2 border-4 border-black rounded-xl   focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 border-4 border-black rounded-xl transition duration-200"
        >
            Login
        </button>
        <div className="text-center mt-4">
            <Link className="text-black" to="/Signup">
            Not Having an Account <b className='text-blue-700 underline'>SignUp</b> here
            </Link>
        </div>
        </form>
    </div>
    </div>
)
}

export default Login
