import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(formData.password, salt);

    const dataToSend = {
      ...formData,
      password: hashedPassword,
    };
    axios
      .post("http://127.0.0.1:5000/create-user", dataToSend)
      .then((response) => {
        console.log(response.data);
        alert("Useradded successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error adding the user!", error);
      });
  };
  return (
    <MDBContainer fluid>
      <div
        className="p-5 bg-image"
        style={{ backgroundImage: "url(https://mdbootstrap.com/img/new/textures/full/171.jpg)", height: "300px" }}
      ></div>

      <MDBCard
        className="mx-5 mb-5 p-5 shadow-5"
        style={{ marginTop: "-100px", background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(30px)" }}
      >
        <MDBCardBody className="p-5 text-center">
          <h2 className="fw-bold mb-5">Sign up now</h2>
          <form onSubmit={handleSubmit}>
            <MDBRow>
              <MDBCol col="6">
                <MDBInput
                  onChange={handleChange}
                  required
                  wrapperClass="mb-4"
                  label="First name"
                  id="form1"
                  name="firstName"
                  type="text"
                />
              </MDBCol>

              <MDBCol col="6">
                <MDBInput
                  onChange={handleChange}
                  required
                  wrapperClass="mb-4"
                  label="Last name"
                  id="form1"
                  name="lastName"
                  type="text"
                />
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol col="6">
                <MDBInput
                  onChange={handleChange}
                  required
                  wrapperClass="mb-4"
                  label="Email"
                  id="form1"
                  name="email"
                  type="email"
                />
              </MDBCol>
              <MDBCol col="6">
                <MDBInput
                  onChange={handleChange}
                  required
                  wrapperClass="mb-4"
                  label="Password"
                  id="form1"
                  name="password"
                  type="password"
                />
              </MDBCol>
            </MDBRow>

            <div className="d-flex justify-content-center mb-4">
              <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Subscribe to our newsletter" />
            </div>

            <MDBBtn className="mb-4 " size="md" type="submit">
              sign up
            </MDBBtn>
          </form>
          <div className="text-center">
            <p>or sign up with:</p>

            <MDBBtn tag="a" color="none" className="mx-3" style={{ color: "#1266f1" }}>
              <MDBIcon fab icon="facebook-f" size="sm" />
            </MDBBtn>

            <MDBBtn tag="a" color="none" className="mx-3" style={{ color: "#1266f1" }}>
              <MDBIcon fab icon="twitter" size="sm" />
            </MDBBtn>

            <MDBBtn tag="a" color="none" className="mx-3" style={{ color: "#1266f1" }}>
              <MDBIcon fab icon="google" size="sm" />
            </MDBBtn>

            <MDBBtn tag="a" color="none" className="mx-3" style={{ color: "#1266f1" }}>
              <MDBIcon fab icon="github" size="sm" />
            </MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Register;
