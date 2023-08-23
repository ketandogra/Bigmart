import {Routes, Route, Navigate} from "react-router-dom";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Shop from "../pages/Shop";
import Checkout from "../pages/Checkout";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Favourites from "../pages/Favourites";
import AddProducts from "../components/admin/AddProducts";
import AllProducts from "../components/admin/AllProducts";
import Dashboard from "../components/admin/Dashboard"
import Sidebar from "../components/admin/Sidebar";
import Users from "../components/admin/Users";
import NoFound from "../pages/NoFound";
import AdminLogin from "../components/admin/AdminLogin";
import AdminSignup from "../components/admin/AdminSignup";
import Orders from "../pages/Orders";

const Routers = () => {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
          <Route path="dashboard" element={<Sidebar/>}>
          <Route path="" element={<Dashboard/>}/>
            <Route path="all-products" element={<AllProducts />}/>
            <Route path="add-product" element={<AddProducts />}/>
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="orders" element={<Orders/>}/>
        </Route>
      
      <Route path="favourites" element={<Favourites />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="admin-signup" element={<AdminSignup />} />
      <Route path="admin-login" element={<AdminLogin />} />
      
      <Route path="/404" element={<NoFound/>} />
      <Route path="*" element={<Navigate to='/404'/>}/>

    </Routes>
  );
};

export default Routers;
