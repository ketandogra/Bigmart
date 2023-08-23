import React, { useEffect } from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import Img from "../components/LazyLoadImage/Img";
import { motion } from "framer-motion";
import { cartActions, cartSelector } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import useAuth from "../custom-hooks/useAuth";
const Cart = () => {
  const { cartItems,totalAmount,totalQuantity} = useSelector(cartSelector);
  const {currentUser} = useAuth()

  useEffect(()=>{
    const deleteFromCart = async()=>{
      try{
        const userRef = doc(db,"users", currentUser.uid);
        await updateDoc(userRef, {
        cartItems,
        totalQuantity,
        });

      }catch(error){
        console.log(error);
      }

    }

    deleteFromCart();

  },[cartItems])

  
  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9" className="mb-5" >
              {cartItems.length === 0 ? (
                <h2 className="text-center ">No item added to the cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <CartItem item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>

            <Col lg="3">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="fs-5 fw-semibold">Subtotal:</h6>
                <span className="fs-4 fw-bold">${totalAmount}</span>
              </div>
              <p className="fs-6 mt-2">taxes and shipping will calculated in checkout </p>
              <div>
                <motion.button   whileTap={{ scale: 1.2 }} className="buy__btn w-100">
                  <Link to='/shop'>Continue Shopping</Link>
                </motion.button>
                <motion.button   whileTap={{ scale: 1.2 }} className="buy__btn w-100 mt-3">
                  <Link to='/checkout'>Checkout</Link>
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const CartItem = ({ item }) => {
  const dispatch = useDispatch()
  const {deleteItem} = cartActions

  const deleteItemFromCart = async()=>{
    dispatch(deleteItem(item.id))
    
  }


  return (
    <tr>
      <td>
        <Img src={item.image} />
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}pc</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          class="ri-delete-bin-line"
          onClick={deleteItemFromCart}
        ></motion.i>
      </td>
    </tr>
  );
};

export default Cart;
