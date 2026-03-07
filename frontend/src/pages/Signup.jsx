import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"
import { Package } from "lucide-react"

export default function Signup(){

const [form,setForm] = useState({
name:"",
email:"",
password:""
})

const navigate = useNavigate()

const handleSignup = async(e)=>{

e.preventDefault()

try{

await API.post("/auth/register",form)

navigate("/login")

}catch(err){

alert(err.response?.data?.message)

}

}

return(

<div className="flex items-center justify-center min-h-screen bg-gray-100">

<form
onSubmit={handleSignup}
className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col gap-4"
>

{/* Logo + Site Name */}

<div className="flex flex-col items-center gap-2 mb-2">

<Package size={40} className="text-black"/>

<h1 className="text-2xl font-bold">
ProductSphere
</h1>

<p className="text-gray-500 text-sm">
Product Management System
</p>

</div>

{/* Signup Title */}

<h2 className="text-lg font-semibold text-center">
Signup
</h2>

<input
placeholder="Name"
onChange={(e)=>setForm({...form,name:e.target.value})}
className="border p-2 rounded"
/>

<input
placeholder="Email"
onChange={(e)=>setForm({...form,email:e.target.value})}
className="border p-2 rounded"
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setForm({...form,password:e.target.value})}
className="border p-2 rounded"
/>

<button className="bg-black text-white p-2 rounded hover:bg-gray-800">
Signup
</button>

<p className="text-sm text-center">
Already have an account? 
<a href="/login" className="text-blue-500 ml-1">
Login
</a>
</p>

</form>

</div>

)

}