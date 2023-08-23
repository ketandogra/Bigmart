import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../../styles/product-card.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import Img from "../LazyLoadImage/Img";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { favActions, favSelector } from "../../redux/slices/favouriteSlice";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import useAuth from "../../custom-hooks/useAuth";
import { cartSelector } from "../../redux/slices/cartSlice";
import { v4 as uuid } from "uuid";

const ProductCard = ({ item, data }) => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { addItem } = cartActions;
  const { addFavItem, removeFavItem } = favActions;
  const { favItems } = useSelector(favSelector);
  const { cartItems,totalQuantity } = useSelector(cartSelector);
  const [isFav, setIsFav] = useState(false);
  const [cartItem,setCartItem] = useState(cartItems)
  

  useEffect(() => {
    setIsFav(favItems.find((i) => i.id === item.id));
  }, [item, favItems]);

  const addToCart = (item) => {
    dispatch(
      addItem({
        id: item.id,
        productName: item.productName,
        image: item.imgUrl,
        price: item.price,
      })
    );
    toast.success("Product added successfully");
  };

  useEffect(()=>{
    const addItemToCart = async()=>{
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

    addItemToCart();

  },[cartItems])

  const addToFav = (item) => {
    dispatch(
      addFavItem({
        id: item.id,
        productName: item.productName,
        image: item.imgUrl,
        price: item.price,
      })
    );
    toast.success("Product added to whistlist successfully");
  };

  const removeFav = (items) => {
    dispatch(
      removeFavItem({
        id: item.id,
      })
    );
    toast.success("Product removed from whistlist successfully");
  };

  return (
    <Col lg="3" md="4" sm="6" xs="6" className="mb-2">
      <div className="shadow p-1 mb-5 bg-white rounded card">
        <div className="product__item">
          <motion.div whileHover={{ scale: 0.9 }} className="product__img">
            <Img src={item.imgUrl} alt="" />
          </motion.div>
          <div className="p-2 product__info">
            <h3 className="product__name">
              <Link to={`/shop/${item.id}`}>{item.productName}</Link>
            </h3>
            <span>{item.category}</span>
          </div>
        </div>

        <div className="product__card-bottom p-2 d-flex align-items-center justify-content-between product__price-div">
          <span className="price">${item.price}</span>
          <div className="d-flex gap-3">
            {isFav ? (
              <motion.span
                className="fav__btn"
                whileTap={{ scale: 1.2 }}
                onClick={() => removeFav(item)}
              >
                <i className="ri-heart-fill"></i>
              </motion.span>
            ) : (
              <motion.span
                className="fav__btn"
                whileTap={{ scale: 1.2 }}
                onClick={() => addToFav(item)}
              >
                <i className="ri-heart-line"></i>
              </motion.span>
            )}
            <motion.span
              className="add__btn"
              whileTap={{ scale: 1.2 }}
              onClick={() => addToCart(item)}
            >
              <i className="ri-add-line"></i>
            </motion.span>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
