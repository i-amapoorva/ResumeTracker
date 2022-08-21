import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./Api";
import { UserOutlined, UploadOutlined, FileSearchOutlined, OrderedListOutlined } from "@ant-design/icons";

function Profile() {
  const navigate = useNavigate();

  async function logOut() {
    api("/logout", {
      method: "GET",
    })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          alert("error");
        }
      });
  }

  const dropDown = () => {
    <div>
      <Link className="link ml-2" to={"/manage-user"}>
        Manage User
      </Link>
      <Link className="link ml-2" to={"/manage-Role"}>
        Manage Role
      </Link>
      <a className="ml-2 link" onClick={logOut}>
        Logout
      </a>
    </div>;
  };

  return(
    <div>
      <div className='profile'>
        <UserOutlined onClick={dropDown} className='user' />
        </div>
    </div>

    
  );
}

export default Profile;
