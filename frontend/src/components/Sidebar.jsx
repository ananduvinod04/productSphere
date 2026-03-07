import { Link } from "react-router-dom"

export default function Sidebar({open,setOpen}){

const user = JSON.parse(localStorage.getItem("user") || "{}")

return(

<>

{/* Overlay */}

{open && (
<div
className="fixed inset-0 bg-black/40 z-40 md:hidden"
onClick={()=>setOpen(false)}
></div>
)}

{/* Sidebar */}

<div
className={`fixed top-0 left-0 h-full w-60 bg-white shadow-lg z-50 transform transition-transform duration-300
${open ? "translate-x-0" : "-translate-x-full"} 
md:translate-x-0 md:static md:shadow-none`}
>

<div className="p-6 flex flex-col gap-4">

<Link
to="/products"
onClick={()=>setOpen(false)}
className="hover:text-blue-500"
>
Products
</Link>

{user?.role === "admin" && (

<Link
to="/editor"
onClick={()=>setOpen(false)}
className="hover:text-blue-500"
>
Product Editor
</Link>

)}

</div>

</div>

</>

)

}