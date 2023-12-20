import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import user from "../Images/Avatars/user.png";
import toast from "react-hot-toast";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passwordReg, setPasswordReg] = useState("");
  const [confirmReg, setConfirmReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [seePassword, setSeePassword] = useState("");

  const showPassword = () => {
    setSeePassword(!seePassword);
  };

  const register = async (event) => {
    event.preventDefault();
    if (emailReg === "" || passwordReg === "") {
      toast.error("All fields must be filled out before creating an account.");
      return;
    } else if (passwordReg !== confirmReg) {
      toast.error("The provided passwords do not match. Please try again.");
      return;
    }

    await axios
      .post("/register", {
        email: emailReg,
        password: passwordReg,
        profilePic: user,
      })
      .then(async () => {
        const user = await axios.get("/user");
        dispatch({ type: "Logged In" });
        dispatch({ type: "Active User", payload: user.data.userId });
        navigate("/");
        toast.success("Registration Successful");
      })
      .catch(() => {
        toast.error(
          `Account could not be created. There may already be an account registered to that email.`
        );
      });
  };

  return (
    <>
        <Container fluid>
            <Row className='text-center mb-3 mt-5 light-title'>
                <h3>Welcome to BabelBuddy</h3>
                <h4>Please create an account to get started.</h4>
            </Row>
            <Row className='text-center justify-content-center'>
                <Col xs='auto' lg={4}>
                    <Form
                        onSubmit={(e) => register(e)}
                        className='border p-3 bkg-darker shadow rounded'
                    >
                        <Row className='justify-content-center mb-3'>
                            <Col xs='auto'>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type='email'
                                        className='select'
                                        style={{
                                            backgroundColor: '#F5E0B2',
                                            borderColor: '#000'
                                        }}
                                        onChange={(e) => setEmailReg(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='justify-content-center mb-3'>
                            <Col xs='auto' lg={6}>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type={seePassword ? 'text' : 'password'}
                                        className='select'
                                        style={{
                                            backgroundColor: '#F5E0B2',
                                            borderColor: '#000'
                                        }}
                                        onChange={(e) => setPasswordReg(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs='auto' lg={6}>
                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type={seePassword ? 'text' : 'password'}
                                        className='select'
                                        style={{
                                            backgroundColor: '#F5E0B2',
                                            borderColor: '#000'
                                        }}
                                        onChange={(e) => setConfirmReg(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col xs='auto' className='mb-3'>
                                <Button
                                    type='submit'
                                    variant='primary'
                                    className='ibtn'
                                >
                                Create Account
                                </Button>
                            </Col>
                            <Col xs='auto'>
                                <Button
                                    variant='primary'
                                    onClick={showPassword}
                                    className='ibtn'
                                >
                                Show Passwords
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row className='text-center mt-3 light-title'>
                <p>Already have an account? <NavLink to='/login' className='light-title'>Login here.</NavLink></p>
            </Row>
        </Container>
    </>
  );
};

export default RegistrationForm;
