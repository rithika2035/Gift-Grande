import React, { useContext, useState, useEffect } from "react"
import { ShopContext } from "../Context/ShopContext";
import axios from "axios"
import Header from "../components/Header";

const Login = ({setShowLogin}) => {

  const {url, setToken} = useContext(ShopContext)
  const [state, setState] = useState("Login"); 
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  };

  const login = async (event)=>{
    let newUrl = url;
    if(state==="Login"){
      newUrl += "/api/user/login"
    }

    const response = await axios.post(newUrl,data);
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      window.location.replace('/')
    }else{
      alert(response.data.message)
    }
  }

  const signup = async (event)=>{
    let newUrl = url;
    if(state==="Sign Up"){
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl,data);
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      window.location.replace('/')
    }else{
      alert(response.data.message)
    }
  }
  
    

  return (
    <section className="flexCenter flex-col pt-32">
      <div className="max-w-[555px] h-[600px] bg-white m-auto px-14 py-10 rounded-md">
        <h3 className="h3">{state}</h3>
        <div className="flex flex-col gap-4 mt-7">
          {state==="Sign Up" && (
          <input name="name" value={data.name} onChange={onChangeHandler} type="text" placeholder="Your Name" required className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"/>)}
          <input name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email Address" required className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"/>
          <input name="password" value={data.password} onChange={onChangeHandler} type="password" placeholder="Password" required className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"/>
        </div>
        <button type="submit" onClick={()=>{state==="Login"?login():signup()}} className="btn_dark_rounded my-5 w-full !rounded-md">Continue</button>
        {state==="Sign Up"?(
          <p className="text-black font-bold">
            Already have an account?{" "} <span onClick={()=> {setState("Login")}} className="text-secondary underline cursor-pointer">Login</span>
          </p> 
        ):( 
          <p className="text-black font-bold">
            Create an account?{" "} <span onClick={()=> {setState("Sign Up")}} className="text-secondary underline cursor-pointer">Click here</span>
          </p>
        )}       
        <div className="flexCenter mt-6 gap-3">
          <input type="checkbox" required/>
          <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
      </div>
    </section>
  )
}

export default Login