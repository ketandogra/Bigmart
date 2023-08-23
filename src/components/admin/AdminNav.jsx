import React,{useRef,useState} from "react";
// import { Container, Row, Col } from "reactstrap";
import Img from "../LazyLoadImage/Img";
import useAuth from "../../custom-hooks/useAuth";
import "../../styles/admin-navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const AdminNav = () => {
  const { currentUser } = useAuth();
  const [show, setShow] = useState("");
  const navigate = useNavigate();
  const ProfileActionsRef = useRef(null);

  const toggleProfileActions = () => {
    ProfileActionsRef.current.classList.toggle("show__AdminProfileActions");
  };


  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.info("Logged out");
      })
      .catch((err) => {
        toast.error(err.message);
      });
      navigate('/admin-login')
  };
  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <div className="admin__nav-wrapper-top">
            <div className="logo text-white">
              <i className="ri-shopping-bag-line text-white fs-4"></i>
              <h2 className="fs-4">Bigmart</h2>
            </div>
            <div className="dashboard_search__box">
              <input type="text" placeholder="Search...." />
              <span>
                <i className="ri-search-line"></i>
              </span>
            </div>
            <div className="admin__nav-top-right d-flex">
              <span>
                <i className="ri-notification-line"></i>
              </span>
              <span>
                <i className="ri-settings-2-line"></i>
              </span>

              <div className="admin__profile d-flex flex-column" onClick={toggleProfileActions}>
                <Img src={currentUser.photoURL} />

                <div className="admin__profile__actions" ref={ProfileActionsRef}>

                        <div className="admin__info ">
                          <p>{currentUser.displayName}</p>
                        </div>
                        <hr />
                        <div className="admin__info">
                          <p>{currentUser.email}</p>
                        </div>
                        <hr />
                        <div className="d-flex gap-2 " onClick={logout}>
                          <span><i className="ri-logout-box-r-line"></i></span>
                          <p className="text-white">Logout</p>
                        </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminNav;
