import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { favSelector } from '../redux/slices/favouriteSlice'
import ProductsList from '../components/UI/ProductsList'
import CommonSection from '../components/UI/CommonSection'
import Helmet from "../components/Helmet/Helmet"
import { Container,Row } from 'reactstrap'

const Favourites = () => {
  const {favItems,totalFavQuantity} = useSelector(favSelector)
  return (
    <Helmet title='Wishlist'>
      <CommonSection title='Wishlist'/>
      <section>
        <Container>
          <Row>
          {favItems?.length === 0 ? (
              <h1 className="text-center">No Favourite product found!</h1>
            ) : (
              <ProductsList data={favItems} />
            )}
          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default Favourites