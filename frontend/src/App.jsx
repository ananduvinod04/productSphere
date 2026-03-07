import { BrowserRouter,Routes,Route } from "react-router-dom"


import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Layout from "./pages/Layout"
import Products from "./pages/Product"
import ProductEditor from "./pages/ProductEditor"
import AdminRoute from "./components/AdminRoute"


function App(){

return(

<BrowserRouter>

<Routes>
<Route path="/" element={<Login/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/signup" element={<Signup/>}/>

<Route element={<Layout/>}>

<Route path="/products" element={<Products/>}/>
<Route path="/editor" element={
    <AdminRoute>
      <ProductEditor/>
    </AdminRoute>
    }/>

</Route>

</Routes>

</BrowserRouter>

)

}

export default App