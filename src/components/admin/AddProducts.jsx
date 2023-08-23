import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import {db,storage} from '../../firebase.config'
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import {addDoc,collection} from 'firebase/firestore'

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);


      //added product to the firebase database
      try{
        const storageRef =  ref(storage,`productImages/${Date.now() + enterProductImg.name}`)
        const uploadTask =  uploadBytesResumable(storageRef,enterProductImg);

        uploadTask.on((error)=>{
            console.log(error);
            toast.error("image not uploaded!")
        },async ()=>{
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const docRef = collection(db,"products");
            await addDoc(docRef,{
              title: enterTitle,
              shortDesc: enterShortDesc,
              description: enterDescription,
              category: enterCategory,
              price: enterPrice,
              imgUrl: downloadURL,
            })
        })

        
        setLoading(false);
        toast.success("Product successfully added!");
      }catch(err){
        setLoading(false);
        toast.error("Product not added!");
      }


    clearFormField();
  };

  const clearFormField = () => {
    setEnterTitle("");
    setEnterShortDesc("")
    setEnterDescription("")
    setEnterCategory("")
    setEnterPrice("")
    setEnterProductImg('')
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12"className="p-4">
            {
            loading?<div class="spinner-border text-secondary" role="status">
              <span class="sr-only">Loading...</span>
            </div>:(<>
            
              <h4 className="mb-5 fw-bold">Add Product</h4>
            <Form onSubmit={addProduct}>
              <FormGroup className="form__group">
                <span>Product Title *</span>
                <input
                  type="text"
                  name="title"
                  placeholder="Doule sofa"
                  onChange={(e) => setEnterTitle(e.target.value)}
                  value={enterTitle}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <span>Short Description *</span>
                <input
                  type="text"
                  name="shortDesc"
                  placeholder="Short Description......"
                  onChange={(e) => setEnterShortDesc(e.target.value)}
                  value={enterShortDesc}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <span>Description *</span>
                <input
                  type="text"
                  name="description"
                  placeholder="Description....."
                  onChange={(e) => setEnterDescription(e.target.value)}
                  value={enterDescription}
                  required
                />
              </FormGroup>
              <div className="d-flex align-items-center jutify-content-between gap-5">
                <FormGroup className="form__group w-50">
                  <span>Price *</span>
                  <input
                    type="number"
                    name="price"
                    placeholder="$100.20"
                    min="0"
                    step="0.01"
                    onChange={(e) => setEnterPrice(e.target.value)}
                    value={enterPrice}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group w-50"
                >
                  <span>Category *</span>
                  <select
                    className="w-100"
                    name="category"
                    onChange={(e) => setEnterCategory(e.target.value)}
                    value={enterCategory}
                    required
                    style={{borderRadius:'5px',padding:'8px 20px',height:'42px',border:'1px solid var(--primary-color)',outline:'none'}}
                  >
                    <option  className="text-center" value='' label selected>------  Select Category  -----</option>
                    <option  value="chair">Chair</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Headphone</option>
                  </select>
                </FormGroup>
              </div>

              <FormGroup className="form__group">
                <span>Product Image *</span>
                <input
                  type="file"
                  name="imgUrl"
                  onChange={(e) => setEnterProductImg(e.target.files[0])}
                  required
                />
              </FormGroup>

              <motion.button
                whileTap={{ scale: 1.2 }}
                type="submit"
                className="buy__btn"
              >
                {" "}
                Add Product
              </motion.button>
            </Form>
            </>)
            
           
          
}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
