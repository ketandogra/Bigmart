import React from 'react'
import Img from '../components/LazyLoadImage/Img'
import { Container,Row,Col } from 'reactstrap'
import PageNotFoundImg  from "../assets/images/page-not-found.jpg"


const NoFound = () => {
  return (
    <section>
        <Container>
            <Row>
                <Col>


                <Img src={PageNotFoundImg}/>
                
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default NoFound