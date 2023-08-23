import React, { useState } from "react";
import Helmet from "../../components/Helmet/Helmet"
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const login = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
  
        const user = userCredential.user;
        console.log(user);
        setLoading(false);
        toast.success("Successfully logged in");
        navigate("/dashboard");
      } catch (err) {
        setLoading(false);
        toast.error(err.message);
      }
    };
  
    return (
      <Helmet title="admin-login">
        <section>
          <Container>
            <Row>
              {loading ? (
                <Col lg="12" className="text-center">
                  <h5 className="fw-bold">Loading....</h5>
                </Col>
              ) : (
                <Col lg="6" className="m-auto text-center">
                    <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
                        <span ><i className="ri-admin-line fs-3 fw-bold"></i></span>
                        <h3 className="fw-bold d-flex">Admin Login</h3>
                    </div>

                  <Form className="auth__form" onSubmit={login}>
                    <FormGroup>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <motion.button
                      whileTap={{ scale: 1.2 }}
                      type="submit"
                      className="buy__btn auth__btn"
                    >
                      Login
                    </motion.button>
                    <p>
                      Don't have an account?
                      <Link to="/admin-signup"> Create an account</Link>
                    </p>
                  </Form>
                </Col>
              )}
            </Row>
          </Container>
        </section>
      </Helmet>
    )
}

export default AdminLogin