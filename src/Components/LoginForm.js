import React, { useEffect, useState } from "react";
import logo from "../images/dtc_logo.png";
import { Link, useNavigate } from "react-router-dom";
import api from "./Api";
import TokenService from "./TokenService";
import axios from "axios";

function LoginForm() {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  /*Login api function  */
  async function login() {
    let item = { email, password };
    api("/login", {
      method: "POST",
      data: JSON.stringify(item),
    })
      .then((res) => {
        let result = res.data;
        console.log(result);
        if (result.status === false) {
          alert(result.message);
        } else {
          TokenService.setUser(result["user"]);
          TokenService.updateLocalAccessToken(result["authorisation"]["token"]);
          TokenService.setRole(result["role"][0]["name"]);
          TokenService.setPermission(result["permissions"]);
          //  console.log();
          console.log("in");
          navigate("/resume-upload");
        }
      })
      .catch((err) => {
        let error = err.response.data;
        if (error.status === false) {
          alert(error.message);
        }
      });
  }
  /* Login api function end */

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
      login();
    }
  };
  /* Email & password Validation function end */

  



  const handleSubmit = async e => {
    e.preventDefault();
    const user = { email, password };
    // send the username and password to the server
    const response = await axios.post(
      "/login", 
      user
    );
    // set the state of the user
    setUser(response.data)
    // store the user in localStorage
    localStorage.setItem('user', response.data)
    console.log(response.data)
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      console.log(foundUser);
    }
  }, []);
  return (
    <div className="formlayout">
      <div className="sub_formlayout">
        <div>
          <div className="imgs">
            <div className="container-img">
              <img src={logo} alt="logo" height={50}></img>
            </div>
          </div>
          <form onSubmit={onSubmitHandler}>
            <h1>Login</h1>
            <div>
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
            <div className="login-button">
              <button className="button-lg" type="submit" >
                Login
              </button>
            </div>
            <br></br>
            Don't have an account ? 
            <Link  to={"/signup"}>
              Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
