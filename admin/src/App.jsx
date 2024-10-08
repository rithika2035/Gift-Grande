import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import Login from "./pages/Login"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout"

export default function App() {
  const url = "http://localhost:4000";
  
  return (
    <BrowserRouter>
    <ToastContainer/>
        <Routes>
          <Route path="/" element={<Login url={url}/>}/>
          <Route path="/add" element={<Layout><Add url={url}/></Layout>}/>
          <Route path="/list" element={<Layout><List url={url}/></Layout>}/>
          <Route path="/orders" element={<Layout><Orders url={url}/></Layout>}/>
        </Routes>
    </BrowserRouter>
  )
}

