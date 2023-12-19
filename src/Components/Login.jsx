import { useState } from "react";
import { NavLink } from "react-router-dom";
import React from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  
  
    const myPassword = () => {
      setPasswordShown(!passwordShown);
    };

  return (
    <>
        <Container fluid>
            <Row className='text-center mb-3 mt-5 light-title'>
                <h3>Welcome to [APP NAME]</h3>
                <h4>Please login to get started.</h4>
            </Row>
            <Row className='text-center justify-content-center'>
                <Col xs='auto' lg={3}>
                    <Form
                        onSubmit={(e) => {
                            login(e, {
                                email: email,
                                password: password
                            })
                        }}
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
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='justify-content-center mb-3'>
                            <Col xs='auto'>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type={passwordShown ? 'text' : 'password'}
                                        className='select'
                                        style={{
                                            backgroundColor: '#F5E0B2',
                                            borderColor: '#000'
                                        }}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='justify-content-center mb-3'>
                            <Col xs='auto'>
                                <Button type='submit' variant='primary'>Login</Button>
                            </Col>
                            <Col xs='auto'>
                                <Button variant='primary' onClick={myPassword}>Show Password</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row className='text-center mt-3 light-title'>
                <p>Don't have an account? <NavLink to='/register' className='light-title'>Register for one here.</NavLink></p>
                
            </Row>
        </Container>
    </>
  );
};

export default Login;

