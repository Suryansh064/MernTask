import React, { useEffect } from "react"
import Home  from "./pages/home.jsx"
import AllTasks from "./pages/AllTasks.jsx";
import {  Routes ,Route, useNavigate} from "react-router-dom";
import Important from "./pages/Important.jsx";
import Completed from "./pages/Completed.jsx";
import Incomplete from "./pages/Incomplete.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { useSelector,useDispatch } from "react-redux";
import { authActions } from "./store/auth.js";
function App() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem("userId")&& localStorage.getItem("token")){
      dispatch(authActions.login());
    }
    else if(isLoggedIn==false) Navigate("/Login");
  },[])
  return (
      <div className="bg-slate-800 text-white min-h-screen relative px-2 sm:px-4 md:px-8">
          <Routes>
            <Route exact path = "/" element ={ <Home/>}>
              <Route index element = {<AllTasks/>}></Route>
              <Route path="/Important" element ={<Important/>}></Route>
              <Route path="/Completed" element ={<Completed/>}></Route>
              <Route path="/Incomplete" element ={<Incomplete/>}></Route></Route>
              <Route path="/Signup" element={<Signup/>}/>
              <Route path="/Login" element={<Login/>}/>
          </Routes> 
      </div>
  )
}

export default App