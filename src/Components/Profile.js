import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./Api";
import {
  UserOutlined,
  UploadOutlined,
  FileSearchOutlined,
  OrderedListOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined
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

  const menu = () => {
    return (
      <Menu
        items={[
          {
            key: "1",
            label: (
              <Link className="link " to={"/manage-user"}>
              <UserSwitchOutlined />  Manage User
              </Link>
            ),
          },
          {
            key: "2",
            label: (
              <Link className="link" to={"/manage-Role"}>
                <UsergroupAddOutlined />  Manage Role
              </Link>
            ),
          },
          {
            key: "3",
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
