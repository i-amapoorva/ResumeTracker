import { Button } from "antd";
import React from "react";
import Header from "./Header";

function ShowUser() {
  return (
    <div>
      <Header />
      <div>
        <h1 className="userformtitle">Show User</h1>
      </div>
      <div>
        <Button type="primary" onClick={()=> window.location.href='/manage-user'}>Back</Button>
        <h3>Name : </h3>
        <h3>Email : </h3>
        <h3>Role : </h3>
      </div>
    </div>
  );
}

export default ShowUser;
