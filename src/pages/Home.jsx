import React,{useState, useEffect} from "react";
import Helmet from "../components/Helmet/Helmet";
import "../styles/home.css"
import { Container, Row, Col } from "reactstrap";
import Img from "../components/LazyLoadImage/Img";
import heroImg from "../assets/images/hero-img.png"
import { Link } from "react-router-dom";
import {motion} from "framer-motion";
import products from "../assets/data/products";
import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";
import counterImg from "../assets/images/counter-timer-img.png"
import Clock from "../components/UI/Clock";



const Home = () => {

  const [trendingProducts, setTrendingProducts] = useState([])
  const [bestSalesProducts, setBestSalesProducts] = useState([])
  const [mobileProducts, setMobileProducts] = useState([])
  const [wirelessProducts,setWirelessProducts]= useState([])
  const [popularProducts,setPopularProducts]= useState([])

  

  const year = new Date().getFullYear()

  useEffect(()=>{

    const filterTrendingProducts = products.filter(item=>item.category === 'chair');
    const filterBestSalesProducts = products.filter(item=>item.category === 'sofa');
    const filterMobileProducts = products.filter(item=>item.category === 'mobile');
    const filterWirelessProducts = products.filter(item=>item.category === 'wireless');
    const filterPopularProducts = products.filter(item=>item.category === 'watch');

    setTrendingProducts(filterTrendingProducts);
    setBestSalesProducts(filterBestSalesProducts);
    setMobileProducts(filterMobileProducts);
    setWirelessProducts(filterWirelessProducts);
    setPopularProducts(filterPopularProducts);
   
  },[]);
  return (
    <div>
      <Helmet title={"Home"}>
        <section className="hero__section">
          <Container>
            <Row>
              <Col lg='6' md='6'>
                <div className="hero__content">
                  <p className="hero__subtitle">Trending Product in {year}</p>
                  <h2>Make Your Interior more Minimalistic & Mordern </h2>
                  <p>Explore home interior design collection by expert for your home to complement your style. The latest inspiring designs and trends for Bedroom, Living room, study room and more.</p>

                  <motion.button whileTap={{scale:1.2}} className="buy__btn"><Link to="/shop">SHOP NOW</Link></motion.button>
                </div>
              </Col>
              <Col lg='6' md='6' className="d-flex align-items-center">
                <div className="hero__img">
              <Img src={heroImg}/>
                </div>
              </Col>
           
            </Row>
          </Container>
        </section>
        <Services/>
        <section className="trending__products">
          <Container>
            <Row>
              <Col lg='12' className="text-center">
                <h2 className="section__title mb-5"> Trending Products </h2>
              </Col>
              <ProductsList data={trendingProducts}/>
            </Row>
          </Container>
        </section>

        <section className="best__sales">
          <Container>
            <Row>
              <Col lg='12' className="text-center">
              <h2 className="section__title mb-5"> Best Sales </h2>
              </Col>
              <ProductsList data={bestSalesProducts}/>
              

            </Row>
          </Container>
        </section>


        <section className="timer__count">
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="clock__top-content">
                  <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                  <h3 className="text-white fs-5">Quality Armchair</h3>
                </div>
                <Clock/>
                <motion.button whileTap={{scale:1.1}}   className="buy__btn store__btn"><Link to='/shop'>Visit Store</Link></motion.button>
              </Col>
              <Col lg="6" md="6"  className="text-end">
                <Img src={counterImg}/>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="new__arrivals">
          <Container>
            <Row>
              <Col lg='12' className="text-center  mb-5">
              <h2 className="section__title mb-3"> New Arrivals </h2>
              </Col>
              <ProductsList data={mobileProducts}/>
              <ProductsList data={wirelessProducts}/>

            </Row>
          </Container>
        </section>

        <section className="popular__category">
          <Container>
            <Row>
              <Col lg='12' className="text-center mb-5">
              <h2 className="section__title mb-3"> Popular in Category </h2>
              </Col>
              <ProductsList data={popularProducts}/>
            </Row>
          </Container>
        </section>


      </Helmet>
    </div>
  );
};

export default Home;
