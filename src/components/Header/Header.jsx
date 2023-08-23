import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { motion } from "framer-motion";
import { Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../../redux/slices/cartSlice";
import useAuth from "../../custom-hooks/useAuth";
import Img from "../LazyLoadImage/Img";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { favSelector } from "../../redux/slices/favouriteSlice";
import {fetchUserData} from "../../redux/slices/cartSlice";


const navLinks = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const [show, setShow] = useState("");
  const location = useLocation();
  const menuRef = useRef(null);
  const { totalQuantity } = useSelector(cartSelector);
  const {totalFavQuantity} = useSelector(favSelector)
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const ProfileActionsRef = useRef(null);
  const dispatch = useDispatch();




  const stickyHeaderFunc = () => {
    if (window.scrollY > 70) {
      setShow("sticky");
    } else setShow("");
  };

  const toggleProfileActions = () => {
    ProfileActionsRef.current.classList.toggle("show__ProfileActions");
  };

  useEffect(()=>{
    currentUser && dispatch(fetchUserData(currentUser.uid))
  },[currentUser])

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.info("Logged out");
      })
      .catch((err) => {
        toast.error(err.message);
      });
      dispatch(fetchUserData(false))
      navigate('./home')
  };

  useEffect(() => {
    //to start new page from top
    window.scrollTo(0, 0);
    stickyHeaderFunc();
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", stickyHeaderFunc);

    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, [window.scrollY]);

  const menuToggle = () => {
    menuRef.current.classList.toggle("active__menu");
  };

  const navigateToFav = ()=>{
    navigate("/favourites");
  }
  const navigateToCart = () => {
    navigate("/cart");
  };

  return (
    <header className={`header top ${show}`}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <Link to="/home" className="d-flex gap-1">
                <img src={logo} alt="logo" />
                <div className="mt-1">
                  <h1>BigMart</h1>
                </div>
              </Link>
            </div>

            <div className="right__header-div">
              <div className="navigation" ref={menuRef} onClick={menuToggle}>
                <ul className="menu">
                  {navLinks.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "nav__active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>

              
                  ))}
                        {currentUser &&
                        
                    
                    <li className="nav__item">

<NavLink
                        to='/orders'
                        className={(navClass) =>
                          navClass.isActive ? "nav__active" : ""
                        }
                      >
                        My Orders
                      </NavLink>
                    </li>
                    }
                </ul>
              </div>

              <div className="nav__icons">
                <motion.span className="fav__icon" whileTap={{ scale: 1.2 }} onClick={navigateToFav}>
                  <i className="ri-heart-line"></i>
                  <span className="badge">{totalFavQuantity}</span>
                </motion.span>
                <motion.span
                  whileTap={{ scale: 1.2 }}
                  className="cart__icon"
                  onClick={navigateToCart}
                >
                  <i className="ri-shopping-bag-line"></i>
                  <span className="badge">{totalQuantity}</span>
                </motion.span>
                <div whileTap={{scale:1.2}} className="profile" onClick={toggleProfileActions}>
                  <Img
                    src={currentUser ? currentUser.photoURL : userIcon}
                    alt="user icon"
                  />
                  <div className="profile__actions" ref={ProfileActionsRef}>
                    {currentUser ? (
                      <>
                        <div className="user__info ">
                          <p>{currentUser.displayName}</p>
                        </div>
                        <hr />
                        <div className="user__info">
                          <p>{currentUser.email}</p>
                        </div>
                        <hr />
                        <div className="d-flex gap-2">
                          <span><i className="ri-logout-box-r-line"></i></span>
                          <p onClick={logout}>Logout</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="d-flex gap-2">
                        <span><i className="ri-account-circle-line"></i></span>
                          <p>
                            
                            <Link to="/signup">Singup</Link>
                          </p>
                        </div>
                        <hr />
                        <div className="d-flex gap-2">
                          <span><i className="ri-login-box-line"></i></span>
                          <p>
                            <Link to="/login">Login</Link>
                          </p>
                        </div>
                      
                       
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
