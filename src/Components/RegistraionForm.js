import React, { useState } from "react";
import logo from "../images/dtc_logo.png";
import { Link, useNavigate } from "react-router-dom";
import api from "../Components/Api";
import TokenService from "../Components/TokenService";

function RegistraionForm() {
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [password_confirmation, setPassword_confirmation] = useState(" ");

  const navigate = useNavigate();

  /*Register api function  */
  async function register() {
    let item = { email, password, password_confirmation, name };
    api("/register", {
      method: "POST",
      data: JSON.stringify(item),
    })
      .then((res) => {
        let result = res.data;
        console.log(result);
        if (result.status === false) {
          alert(result.message);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        let error = err.response.data;
        if (error.status === false) {
          alert(error.message);
        }
      });
  }
  /* Register api function end */

  /* Email Validation function  */
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  /* Email Validation function end */

  /* Email & password Validation function end */
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      alert("required both field");
      return false;
    } else if (!isValidEmail(email)) {
      alert("Email is invalid");
    } else {
      register();
    }
  };
  /* Email & password Validation function end */
  return (
    <div className="formlayout">
      <div className="sub_formlayout_Registraion">
        <div>
          <div className="imgs">
            <div className="container-img">
              <img src={logo} alt="logo" height={50}></img>
            </div>
          </div>
          <form onSubmit={onSubmitHandler}>
            <h1>Sign Up</h1>
            <div>
              <input
                type="text"
                placeholder="Name"
                required
                className="name1"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="second-input">
              <input
                type="text"
                placeholder="E-Mail Id"
                required
                className="name1"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="second-input">
              <input
                type="password"
                placeholder="Password"
                className="name1"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="second-input">
              <input
                type="password"
                placeholder="Confirm Password"
                className="name1"
                onChange={(e) => setPassword_confirmation(e.target.value)}
                required
              />
            </div>
            <div className="login-button">
              <button className="button-lg" type="submit">
                Sign Up
              </button>
            </div>
            <br></br>
             have an account !
            <Link  to={"/"}>
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistraionForm;
