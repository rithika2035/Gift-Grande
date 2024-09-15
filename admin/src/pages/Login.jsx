import React, { useContext, useState, useEffect } from "react"
import { ShopContext } from "../Context/ShopContext";
import axios from "axios"


const Login = ({url}) => {
    const [token, setToken] = useState("");
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
      newUrl += "/api/admin/login"
    }

    const response = await axios.post(newUrl,data);
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      window.location.replace('/add')
    }else{
      alert(response.data.message)
    }
  }
  return (
    <section className="flexCenter flex-col pt-32">
      <div className="max-w-[555px] h-[600px] bg-white m-auto px-14 py-10 rounded-md">
        <h1 className="h3">Login</h1>
        <div className="flex flex-col gap-4 mt-7">
          <input name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email Address" required className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"/>
          <input name="password" value={data.password} onChange={onChangeHandler} type="password" placeholder="Password" required className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"/>
        </div>
        <button type="submit" onClick={login} className="btn_dark_rounded my-5 w-full !rounded-md">Continue</button>
      </div>
    </section>
  )
}

export default Login