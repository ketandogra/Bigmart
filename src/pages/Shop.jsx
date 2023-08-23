import React, { useEffect, useState } from "react";
import products from "../assets/data/products";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import "../styles/shop.css";
import ProductsList from "../components/UI/ProductsList";

const Shop = () => {
  const [productsData, setProductsData] = useState(products);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const priceFilterHandler = (data = products) => {
    let priceFilterdProducts = {};
    if (priceFilter === 1000) {
      priceFilterdProducts = data.filter(
        (item) => parseInt(item.price) >= parseInt(priceFilter.slice(0, 4))
      );
    } else if (priceFilter?.length > 4) {
      priceFilterdProducts = data.filter(
        (item) =>
          parseInt(item.price) > parseInt(priceFilter.slice(0, 3)) &&
          parseInt(item.price) <= parseInt(priceFilter.slice(4, 7))
      );
    } else {
      priceFilterdProducts = data.filter(
        (item) => parseInt(item.price) <= parseInt(priceFilter.slice(0,3))
      );
    }

    return priceFilterdProducts;
  };


  const categoryFilterHandler = () => {
    const categoryFilteredProducts = products.filter(
      (item) => item.category === categoryFilter
    );

    return categoryFilteredProducts;
  };

  useEffect(() => {
    let data = {};
    let result = {};


    if (categoryFilter === "all" && priceFilter === "all") {
      result  = products;
    } else if (categoryFilter === "all" && priceFilter !== "all") {
      result = priceFilterHandler();
    } else if (categoryFilter !== "all" && priceFilter == "all") {
      result  = categoryFilterHandler();
    } else {
      data = categoryFilterHandler();
      result = priceFilterHandler(data);
    }

    setProductsData(result);
  }, [priceFilter, categoryFilter]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const searchedProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductsData(searchedProducts);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />

      <section>
        <Container>
          <Row>
            <Col xl="6" lg="12">
              <div className="search__box">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search....."
                  onChange={handleSearch}
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col xl="3" lg="6" className="first__filter">
              <div className="filter__widget">
                <select onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="all">
                    --- Filter By Category ---
                  </option>
                  <option value="sofa">Sofa</option>
                  <option value="chair">Chair</option>
                  <option value="mobile">Mobile</option>
                  <option value="wireless">HeadPhone</option>
                  <option value="watch">Watch</option>
                  <option value="all">All Product</option>
                </select>
              </div>
            </Col>
            <Col xl="3" lg="6" className="second__filter">
              <div className="filter__widget">
                <select onChange={(e) => setPriceFilter(e.target.value)}>
                  <option value="all">
                    --- Sort By Price ---
                  </option>
                  <option value="100">$100 and below</option>
                  <option value="100-200">$100 to $200</option>
                  <option value="200-500">$300 to $500</option>
                  <option value="500-999">$500 and $1000</option>
                  <option value="1000">$1000 and above</option>
                </select>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {productsData?.length === 0 ? (
              <h1 className="text-center">No products are found!</h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
