import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {

const user = JSON.parse(localStorage.getItem("user") || "{}");

if (user?.role !== "admin") {
  return <Navigate to="/products" replace />;
}

return children;

}