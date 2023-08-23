import React from 'react'
import ProductCard from './ProductCard'

const ProductsList = ({data}) => {




  return (
    <>
      {data?.map((item,index)=><ProductCard data={data} item={item} key={index}/>)}
       
    </>
  )
}

export default ProductsList