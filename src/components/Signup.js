import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom';


const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validations
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Paswords must be the same'); // return etme sebebimiz fonksiyon devam etmesin ve submit işlemi bitsin diye...
    }

    try {
      setError('');
      setLoading(true);
      // burada refler ile email ve password değerlerini signup fonk. verdik. bu fonksiyon ile fireabase de user instanceları oluşturulacak...
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/login');
      clearForm();
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  };

  // form input cleanup
  const clearForm = () => {
    emailRef.current.value = '';
    passwordRef.current.value = '';
    passwordConfirmRef.current.value = '';
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account ? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default Signup;
