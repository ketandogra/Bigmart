import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";



const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" className="p-2">
            <div className="logo d-flex justify-content-start">
             
                <h1 className="text-white ">BigMart</h1>
              
            </div>
            <p className="footer__text mt-4">
            Bigmart is one of the leading e-commerce platforms in India, offering a wide range of products and services to its customers. You can shop online for mobiles, electronics, fashion, home appliances, books, and more at Bigmart
            </p>
          </Col>
          <Col lg="3" className="p-2">
            <div className="footer__quick-links">
              <h4 className="quick__links-title text-white">Top Categories</h4>
              <ListGroup className="mt-2">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Mobile Phones</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Mordern Sofa</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Arm Chair</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3" className="p-2">
            <div className="footer__quick-links">
              <h4 className="quick__links-title text-white">Useful Links</h4>
              <ListGroup className="mt-2">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/login">Login</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3" className="p-2">
            <div className="footer__quick-links">
              <h4 className="quick__links-title text-white">Contact</h4>
              <ListGroup className="footer__contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  <p>123 Shimla, Himachal Pradesh, India</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                  <i className="ri-phone-line"></i>
                  </span>
                  <p>+91-8645053575</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <span>
                <i className="ri-mail-line"></i>
                  </span>
                  <p>support@bigmart.com</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 ">
                  <p>Follow us on</p>
                  <Link to="#" className="me-2"><i className="ri-twitter-line fs-3"></i></Link>
                  <Link to="#"><i className="ri-instagram-line fs-3"></i></Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='12'>
            <p className="footer__copyright text-center">Copyright {year} developed by Ketan Dogra. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
