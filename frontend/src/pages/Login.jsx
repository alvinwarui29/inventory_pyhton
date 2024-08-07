import React, { useState } from 'react';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBRow,
    MDBCol
  }
  from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
 const navigate = useNavigate();
  const [formData,setFormData] = useState({
    email:'',
    password:'',
  });
  const handleChange=(e)=>{
    const {name,value}= e.target;
    setFormData({
      ...formData,
      [name]:value,
    })
  }

  const handleLogin = (e)=>{
      e.preventDefault();
      axios.post('http://127.0.0.1:5000/login-user', formData)
      .then(response => {
        const token = response.data.access_token;
            localStorage.setItem('token', token);
        alert('Login successfully!');
        navigate("/")
      })
      .catch(error => {
        if (error.response) {
          const errorMessage = error.response.data.message;
          alert(errorMessage);
        } else {
          console.error('There was an error logging in!', error);
        }
      });
      
  }

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

    <MDBRow>

      <MDBCol col='10' md='6'>
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample" />
      </MDBCol>

      <MDBCol col='4' md='6'>

        <div className="d-flex flex-row align-items-center justify-content-center">

          <p className="lead fw-normal mb-0 me-3">Sign in with</p>

          <MDBBtn floating size='md' tag='a' className='me-2'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn floating size='md' tag='a'  className='me-2'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn floating size='md' tag='a'  className='me-2'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

        </div>

        <div className="divider d-flex align-items-center my-4">
          <p className="text-center fw-bold mx-3 mb-0">Or</p>
        </div>

        <form onSubmit={handleLogin}>
        <MDBInput 
        name='email'
        required
        onChange={handleChange}
         wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
        <MDBInput 
        name='password'
        required
        onChange={handleChange}
         wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>

        <div className="d-flex justify-content-between mb-4">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
          <a href="!#">Forgot password?</a>
        </div>

        <div className='text-center text-md-start mt-4 pt-2'>
          <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
          <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
        </div>
        </form>
      </MDBCol>

    </MDBRow>

    

  </MDBContainer>
  );
}

export default Login;
