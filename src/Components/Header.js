import React from "react";
import logo from "../images/dtc-logo-white.png";
import { Link, useNavigate } from "react-router-dom";
import api from "./Api";
import {
  UserOutlined,
  UploadOutlined,
  FileSearchOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import Profile from "./Profile";
import TokenService from "./TokenService";

function Header() {
  const navigate = useNavigate();

  const role = TokenService.getRole("role");
  const permission = TokenService.getPermission("permissions");

  /* Logout api Function */
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

  // const DropDown = () => {
  //   <div>
  //     <select>
  //       <option>
  //         <Link className="link ml-2" to={"/manage-user"}>
  //           Manage User
  //         </Link>
  //       </option>
  //       <option>
  //         <Link className="link ml-2" to={"/manage-Role"}>
  //           Manage Role
  //         </Link>
  //       </option>
  //       <option>
  //         <a className="ml-2 link" onClick={logOut}>
  //           Logout
  //         </a>
  //       </option>
  //     </select>
  //   </div>;
  // };

  return (
    <div className="header sticky">
      <h1 className="logo" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={50}></img>
        <span className="headname">Resume Tracker</span>
      </h1>
      <div style={{ display: "flex", alignItems: "center" }}>
      {/* {this.state.value == 'news'? <Text>data</Text>: null } */}
        {(permission.indexOf("resume-store") !== -1)?
        
          <Link className="link" to={"/resume-upload"}>
            <UploadOutlined /> Resume Upload
          </Link>
        : null }
        {(permission.indexOf("resume-filter") !== -1)?
        <Link className="link ml-2" to={"/resume-search"}>
          <FileSearchOutlined /> Resume Search
        </Link>
        :null }
        {(permission.indexOf("my-resumes-list") !== -1)?
        <Link className="link ml-2" to={"/my-list"}>
          <OrderedListOutlined /> My List
        </Link>
        :null }
        {/* <Select className="link ml-2">
          <Option></Option>
        </Select> */}
        {/* <Link className="link ml-2" to={"/manage-user"}>
          Manage User
        </Link>
        <Link className="link ml-2" to={"/manage-Role"}>
          Manage Role
        </Link>
        <a className="ml-2 link" onClick={logOut}>
          Logout
        </a> */}
        {/* <a className="ml-2 link"> </a>
        <a className="ml-2 link"> </a> */}
        {/* <Link className="link ml-2" to={""}>
        <UserOutlined /> Profile
        </Link> */}
        {/* <a className="ml-2 link" >
          <UserOutlined className="profile " />
        </a> */}
        {/* <p>hello</p> */}
        <Profile />
      </div>
    </div>
  );
}

export default Header;
