import { Menu, Package } from "lucide-react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

export default function Navbar({toggle}){

const navigate = useNavigate()

const handleLogout = async () => {

await API.post("/auth/logout")

localStorage.removeItem("user")

navigate("/login")

}

return(

<div className="flex justify-between items-center bg-black text-white px-4 py-3">

<div className="flex items-center gap-3">

<button onClick={toggle} className="md:hidden">
<Menu size={24}/>
</button>

<div className="flex items-center gap-2">

<Package size={24}/>

<h1 className="font-bold text-lg">
ProductSphere
</h1>

</div>

</div>

<button
onClick={handleLogout}
className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
>
Logout
</button>

</div>

)

}