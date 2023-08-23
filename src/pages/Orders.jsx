import React from "react";
import { Container, Row, Col } from "reactstrap";

const Orders = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h3 className="text-center">No Order placed</h3>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Orders;
