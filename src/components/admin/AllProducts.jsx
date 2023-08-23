import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Img from "../LazyLoadImage/Img";
import useGetData from "../../custom-hooks/useGetData";
import {doc,deleteDoc} from "firebase/firestore"
import { db } from "../../firebase.config";
import { motion } from "framer-motion";
import { toast } from "react-toastify";



const AllProducts = () => {
  const {data: productsData,loading} = useGetData("products")

  const deleteProduct = async(id)=>{
    await deleteDoc(doc(db,'products',id))
    toast.info("Product deleted successfully!")
  }
  

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">

          {
                  loading?<div className="d-flex justify-content-center align-items-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                  </div>
                </div>:(<>

                  <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>

           


                {
                  productsData.map((item)=>
                    <tr key={item.id}>
                    <td><Img src={item.imgUrl}/></td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>${item.price}</td>
                    <td>
                      <motion.button whileTap={{scale:1.2}} className="btn btn-danger" onClick={()=>deleteProduct(item.id)}>Delete</motion.button></td>
                  </tr>
                  )
                }
               
              </tbody>
            </table>
                </>)
                }
           
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
