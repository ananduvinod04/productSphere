import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"

export default function Layout(){

const [open,setOpen] = useState(false)

return(

<div className="flex flex-col min-h-screen">

<Navbar toggle={()=>setOpen(!open)}/>

<div className="flex flex-1">

<Sidebar open={open} setOpen={setOpen}/>

<main className="flex-1 p-6 bg-gray-50">
<Outlet/>
</main>

</div>

<Footer/>

</div>

)

}