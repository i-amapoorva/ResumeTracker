import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./Api";
import {
  UserOutlined,
  UploadOutlined,
  FileSearchOutlined,
  OrderedListOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, message, Space, Tooltip } from "antd";

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const user = { email, password };
  //   // send the username and password to the server
  //   const response = await axios.post("/login", user);
  //   // set the state of the user
  //   setUser(response.data);
  //   // store the user in localStorage
  //   localStorage.setItem("user", response.data);
  //   console.log(response.data);
  // };
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //   }
  // }, []);

  const menu = () => {
    return (
      <Menu
        items={[
          {
            key: "1",
            label: (
              // <Link className="link " to={"/manage-user"}>
              // <UserSwitchOutlined />User
              // </Link>
              <a className="link">
                <UserOutlined /> User
              </a>
            ),
          },
          {
            key: "2",
            label: (
              <Link className="link " to={"/manage-user"}>
                <UserSwitchOutlined /> Manage User
              </Link>
            ),
          },
          {
            key: "3",
            label: (
              <Link className="link" to={"/manage-Role"}>
                <UsergroupAddOutlined /> Manage Role
              </Link>
            ),
          },
          {
            key: "4",
            label: (
              <a className="link" onClick={logOut}>
                <LogoutOutlined /> Logout
              </a>
            ),
          },
        ]}
      />
    );
  };

  return (
    <div className="ml-2">
      <Dropdown overlay={menu} placement="bottomLeft" arrow>
        {/* <a className="ml-2 link"> */}
        <UserOutlined className="profile " />
        {/* </a> */}
      </Dropdown>
    </div>
  );
}

export default Profile;
