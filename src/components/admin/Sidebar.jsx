import React, { useState } from "react";
import "../../styles/sidebar.css";
import Img from "../LazyLoadImage/Img";
import Item from "../UI/Item";
import { motion } from "framer-motion";
import useAuth from "../../custom-hooks/useAuth";
import { Outlet } from "react-router-dom";

const navLinks = [
  {
    path: "/dashboard",
    display: "Dashboard",
    icon: "ri-dashboard-fill",
  },
  {
    path: "/dashboard/all-products",
    display: "All Products",
    icon: "ri-shopping-bag-3-fill",
  },
  {
    path: "/dashboard/add-product",
    display: "Add Products",
    icon: "ri-shopping-bag-3-fill",
  },
  {
    path: "/dashboard/orders",
    display: "Orders",
    icon: "ri-shopping-bag-fill",
  },
  {
    path: "/dashboard/users",
    display: "Users",
    icon: "ri-group-fill",
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const sideContainerVariants = {
    true: {
      width: "15rem",
    },
    false: {
      width: "5rem",
      transition: {
        delay: 0.6,
      },
    },
  };

  const sidebarVariants = {
    true: {
      width: "15rem",
    },
    false: {
      width: "5rem",
      transition: {
        delay: 0.4,
      },
    },
  };

  const profileVariants = {
    true: {
      alignSelf: "center",
      width: "4rem",
    },
    false: {
      alignSelf: "center",
      marginTop: "1rem",
      width: "3rem",
    },
  };

  const sidebarBodyVariants = {
    true: {
      marginLeft: "15rem",
    },
    false: {
      marginLeft: "5rem",
      transition: {
        delay: 0.4,
      },
    },
  };

  const menuIconVariant = {
    true: {
      scale: 1.2,
      rotate: 180,
      transition: {
        delay: 0.1,
        duration: 0.4,
      },
    },
    false: {
      scale: 1.2,
      rotate: 360,
      transition: {
        delay: 0.1,
        duration: 0.4,
      },
    },
  };

  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div className="admin__navbar">
      <motion.div
        data-Open={open}
        variants={sideContainerVariants}
        initial={`${open}`}
        animate={`${open}`}
        className="sidebar__container"
      >
        <motion.div
          variants={sidebarVariants}
          initial={`${open}`}
          animate={`${open}`}
          className="sidebar"
        >
          <motion.div
            initial={`${open}`}
            animate={`${open}`}
            variants={menuIconVariant}
            onClick={handleToggle}
            className="sidebar_menu__icon"
            whileHover={{scale:1.5}}
          >
            <i className="ri-arrow-right-s-line"></i>
          </motion.div>

          <motion.div
            layout
            initial={`${open}`}
            animate={`${open}`}
            variants={profileVariants}
            className="sidebar_profile"
            transition={{ duration: 0.4 }}
          >
            <Img src={currentUser.photoURL} />
          </motion.div>

          <div className="d-flex flex-column justify-content-center align-self-center mt-2">
            <Item data={navLinks} />
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={`${open}`}
        animate={`${open}`}
        variants={sidebarBodyVariants}
        className="sidebar__body__container"
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default Sidebar;
