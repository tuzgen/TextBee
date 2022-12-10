import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./LoginPage.css";
import PropTypes from 'prop-types';


function LoginPage({setToken}) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function loginUser(credentials) {
        return fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(data => data.json())
       }

       const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setToken(token);
      }

    return (

        <div>
        <Form onSubmit={handleSubmit} className='login-form'>
        <h1 className='login-header'> Login to Chat App </h1> 
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={e => setUsername(e.target.value)} type="email" placeholder="Enter email" />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={e => setUsername(e.target.value)} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          </Form.Group>
          <Button  variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </div>
      );
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default LoginPage