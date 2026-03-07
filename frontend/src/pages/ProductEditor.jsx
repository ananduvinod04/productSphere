import { useState, useEffect } from "react";
import API from "../services/api";

import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle
} from "@/src/components/ui/dialog";

export default function ProductEditor(){

const [products,setProducts] = useState([]);

const [addForm,setAddForm] = useState({
name:"",
description:"",
price:"",
category:""
});

const [editForm,setEditForm] = useState({
name:"",
description:"",
price:"",
category:""
});

const [editProduct,setEditProduct] = useState(null);
const [open,setOpen] = useState(false);

const [search,setSearch] = useState("");

useEffect(()=>{
loadProducts();
},[]);

const loadProducts = async()=>{
const res = await API.get("/products");
setProducts(res.data);
};

const addProduct = async()=>{
await API.post("/products",addForm);

setAddForm({
name:"",
description:"",
price:"",
category:""
});

loadProducts();
};

const deleteProduct = async(id)=>{
await API.delete(`/products/${id}`);
loadProducts();
};

const startEdit = (product)=>{
setEditProduct(product);

setEditForm({
name:product.name,
description:product.description,
price:product.price,
category:product.category
});

setOpen(true);
};

const updateProduct = async()=>{
await API.put(`/products/${editProduct._id}`,editForm);

setEditForm({
name:"",
description:"",
price:"",
category:""
});

setOpen(false);

loadProducts();
};

const filteredProducts = products.filter((product)=>
product.name.toLowerCase().includes(search.toLowerCase())
);

return(

<div className="p-6 max-w-6xl mx-auto">

<h1 className="text-2xl font-bold mb-6">
Manage Products
</h1>

{/* Add Product Form */}

<div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">

<input
className="border rounded p-2"
placeholder="Name"
value={addForm.name}
onChange={(e)=>setAddForm({...addForm,name:e.target.value})}
/>

<input
className="border rounded p-2"
placeholder="Description"
value={addForm.description}
onChange={(e)=>setAddForm({...addForm,description:e.target.value})}
/>

<input
className="border rounded p-2"
placeholder="Price"
value={addForm.price}
onChange={(e)=>setAddForm({...addForm,price:e.target.value})}
/>

<input
className="border rounded p-2"
placeholder="Category"
value={addForm.category}
onChange={(e)=>setAddForm({...addForm,category:e.target.value})}
/>

<button
onClick={addProduct}
className="bg-black text-white rounded p-2 hover:bg-gray-800"
>
Add
</button>

</div>

{/* Search */}

<div className="mb-6">

<input
className="border rounded p-2 w-full md:w-80"
placeholder="Search product..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

{/* Product List */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

{filteredProducts.map((p)=>(
<div
key={p._id}
className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2"
>

<h2 className="font-semibold text-lg">
{p.name}
</h2>

<p className="text-gray-600 text-sm">
{p.description}
</p>

<p className="font-medium">
${Number(p.price).toFixed(2)}
</p>

<p className="text-sm text-gray-500">
{p.category}
</p>

<div className="flex gap-3 mt-2">

<button
onClick={()=>startEdit(p)}
className="text-blue-500"
>
Edit
</button>

<button
onClick={()=>deleteProduct(p._id)}
className="text-red-500"
>
Delete
</button>

</div>

</div>
))}

</div>

{/* Edit Dialog */}

<Dialog open={open} onOpenChange={setOpen}>

<DialogContent>

<DialogHeader>
<DialogTitle>Edit Product</DialogTitle>
</DialogHeader>

<div className="flex flex-col gap-3">

<input
className="border p-2 rounded"
value={editForm.name}
onChange={(e)=>setEditForm({...editForm,name:e.target.value})}
/>

<input
className="border p-2 rounded"
value={editForm.description}
onChange={(e)=>setEditForm({...editForm,description:e.target.value})}
/>

<input
className="border p-2 rounded"
value={editForm.price}
onChange={(e)=>setEditForm({...editForm,price:e.target.value})}
/>

<input
className="border p-2 rounded"
value={editForm.category}
onChange={(e)=>setEditForm({...editForm,category:e.target.value})}
/>

<button
onClick={updateProduct}
className="bg-black text-white p-2 rounded"
>
Save
</button>

</div>

</DialogContent>

</Dialog>

</div>

);

}