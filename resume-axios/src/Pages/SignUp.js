import React from "react";
import logo from "../images/dtc_logo.png";
import RegistraionForm from "../Components/RegistraionForm";
import LoginForm from "../Components/LoginForm";
import { Link, useNavigate } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function SignUp() {
  // function Registraion(){

  // }
  return (
    <div>
      <RegistraionForm />
    </div>
  );
}

export default SignUp;
