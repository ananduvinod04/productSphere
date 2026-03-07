import { useEffect,useState } from "react"
import API from "../services/api"

export default function Products(){

const [products,setProducts] = useState([])
const [search,setSearch] = useState("")

useEffect(()=>{
fetchProducts()
},[])

const fetchProducts = async ()=>{
const res = await API.get("/products")
setProducts(res.data)
}

const filtered = products.filter(p =>
p.name.toLowerCase().includes(search.toLowerCase())
)

return(

<div>

<div className="flex justify-between mb-6">

<h1 className="text-2xl font-bold">
Products
</h1>

<input
placeholder="Search..."
className="border p-2 rounded"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

{filtered.map((p)=>(
<div key={p._id} className="border p-4 rounded">

<h2 className="font-bold">
{p.name}
</h2>

<p>{p.description}</p>

<p>₹{p.price}</p>

</div>
))}

</div>

</div>

)

}