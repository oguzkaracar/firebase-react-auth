import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const emailRef = useRef();

  const { resetPassword } = useAuth(); // login page'de farklı bir fonksiyon gerekebilir...
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions...');
      clearForm();
    } catch {
      setError('Failed to reset password.!!');
    }
    setLoading(false);
  };

  // form input cleanup
  const clearForm = () => {
    emailRef.current.value = '';
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success"> {message} </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        You don't have an account ? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
