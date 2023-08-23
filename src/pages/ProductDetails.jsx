import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import products from "../assets/data/products";
import CommonSection from "../components/UI/CommonSection";
import Img from "../components/LazyLoadImage/Img";
import { cartActions } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "../styles/product-details.css";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/ProductsList";


const ProductDetails = () => {
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(1);
  const reviewUser = useRef('')
  const reviewMsg = useRef('')
  const { id } = useParams();
  const { addItem } = cartActions;
  const dispatch = useDispatch();
  const product = products.find((item) => item.id === id);
  const {
    imgUrl,
    category,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
  } = product;

  const addToCart = () => {
    dispatch(
      addItem({
        id,
        productName,
        imgUrl,
        price,
      })
    );
    toast.success("Product added successfully");
  };



  const relatedProducts = products.filter(
    (item) => item.category === category && item.id !== product.id
  );


  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;
    const reviewObj = {
      author:reviewUserName,
      text:reviewUserMsg,
      rating,
    }
    console.log(reviewObj);
    toast.success('Review submitted')
  };
  

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <Img src={imgUrl} />
            </Col>
            <Col lg="6">
              <div className="product_details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex gap-1 align-item-center mb-3">
                  <div>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-half-s-line"></i>
                    </span>
                  </div>
                  <p>
                    (<span>{avgRating}</span> ratings)
                  </p>
                </div>
                <div className="d-flex flex-column gap-1">
                <span className="product__price">${price}</span>
                <span>Category: {category.toUpperCase()}</span>

                </div>
                <p className="mt-3">{shortDesc}</p>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "reviews" ? "active__tab" : ""}`}
                  onClick={() => setTab("reviews")}
                >
                  Reviews ({reviews.length})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {reviews.map((item, index) => (
                        <li key={index}>
                          <h6>Ketan Dogra</h6>
                          <span>{item.rating} (rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form onSubmit={submitHandler}>
                        <div className="form__group">
                          <input type="text" placeholder="Enter name" ref={reviewUser} required />
                        </div>

                        <div className="form__group d-flex align-items-center gap-5 rating ">
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(1)}>
                            1 <i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(2)}>
                            2 <i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(3)}>
                            3 <i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(4)}>
                            4 <i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(5)}>
                            5 <i class="ri-star-s-fill"></i>
                          </motion.span>
                        </div>
                        <div className="form__group">
                          <textarea
                            rows={5}
                            type="text"
                            placeholder="Review Message..."
                            ref={reviewMsg}
                            required
                          />
                        </div>
                        <motion.button
                          type="submit"
                          whileTap={{ scale: 1.2 }}
                          className="buy__btn"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
