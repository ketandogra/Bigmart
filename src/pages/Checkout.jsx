import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/checkout.css";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../redux/slices/cartSlice";
import useAuth from "../custom-hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import {addressSelector, fetchUserAddresses } from "../redux/slices/addressSlice";

const Checkout = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const {addresses} = useSelector(addressSelector)
  const [address, setAddress] = useState({
    userName: currentUser?.displayName,
    email: currentUser?.email,
    phoneNumber: "",
    city: "",
    postalCode: "",
    country: "",
    streetAddress: "",
  });
  
  useEffect(() => {
    console.log(currentUser.uid);
    dispatch(fetchUserAddresses(currentUser.uid));
  }, []);
  const [savedAddress, setSavedADdress] = useState(addresses);
  console.log(savedAddress);
  const { cartItems, totalQuantity, totalAmount } = useSelector(cartSelector);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    address[e.target.name] = e.target.value;
  };

  const placeOrder = async () => {};


  const submitHandler = async (e) => {
    e.preventDefault();
    setSavedADdress(address);
    await updateDoc(doc(db, "users", currentUser.uid), {
      address: arrayUnion({
        address,
      }),
    });
  };

  const ClickHandler = () => {
   
    if (currentUser && cartItems.length > 0) {
      placeOrder();
      navigate("/orders");
    } else {
      navigate("/shop");
    } 
  };
  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              {savedAddress ? (
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    {savedAddress.userName}
                  </span>
                  <span>{savedAddress.email}</span>
                  <span>
                    {savedAddress.streetAddress} {savedAddress.postalCode}
                  </span>
                  <span>{savedAddress.phoneNumber}</span>
                </div>
              ) : (
                <Form className="billing__form" onSubmit={submitHandler}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      name="userName"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="number"
                      placeholder="Phone number"
                      name="phoneNumber"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Street address"
                      name="streetAddress"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Postal code"
                      name="postalCode"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Country"
                      name="country"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 1.1 }}
                      className="buy__btn"
                    >
                      Save Address
                    </motion.button>
                  </FormGroup>
                </Form>
              )}
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Qty: <span>{totalQuantity}</span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  Shipping: <span>(Free shipping) $0 </span>
                </h6>
                <h4>
                  Total Cost: <span>${totalAmount}</span>
                </h4>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 1.1 }}
                  className="buy__btn auth__btn w-100"
                  onClick={ClickHandler}
                >
                  Place an order
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
