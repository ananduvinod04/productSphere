import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Package } from "lucide-react"
import API from "../services/api"

export default function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate()

const handleLogin = async(e)=>{

e.preventDefault()

try{

const res = await API.post("/auth/login",{email,password})

localStorage.setItem("user", JSON.stringify(res.data.user))

navigate("/products")

}catch(err){

alert(err.response?.data?.message)

}

}

return(

<div className="flex items-center justify-center min-h-screen bg-gray-100">

<form
onSubmit={handleLogin}
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

{/* Login Title */}

<h2 className="text-lg font-semibold text-center">
Login
</h2>

<input
placeholder="Email"
className="border p-2 rounded"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="border p-2 rounded"
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="bg-black text-white p-2 rounded hover:bg-gray-800">
Login
</button>

<p className="text-sm text-center">
No account? <a href="/signup" className="text-blue-500">Signup</a>
</p>

</form>

</div>

)

}