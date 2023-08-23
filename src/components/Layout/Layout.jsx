import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import AdminNav from "../../components/admin/AdminNav";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <>
    {
      location.pathname.startsWith('/dashboard')?<AdminNav/>:<Header />
    }
 
      <div className="route__content">
        <Routers/>
      </div>
      { location.pathname.startsWith('/dashboard')?"":<Footer />}
      
    </>
  );
};

export default Layout;
