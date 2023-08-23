import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/dashboard.css"
import useGetData from "../../custom-hooks/useGetData";

const Dashboard = () => {
  const {data:products} = useGetData('products')
  const {data:users} = useGetData('users')
  return (
    <section>
      <Container>
        <Row>
          <Col lg="3">
            <div className="revenue__box">
              <h5>Toal Sales</h5>
              <span>$7890</span>
            </div>
          </Col>
          <Col lg="3">
            <div className="order__box">
              <h5>Orders</h5>
              <span>7890</span>
            </div>
          </Col>
          <Col lg="3">
            <div className="products__box">
              <h5>Products</h5>
              <span>250</span>
            </div>{" "}
          </Col>
          <Col lg="3">
            <div className="users__box">
              <h5>Total Users</h5>
              <span>235K</span>
            </div>{" "}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
