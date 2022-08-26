import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import Header from "../Components/Header";
import api from "../Components/Api";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

function EditUser() {
  const Details = useLocation();
  const user_id = useParams();
  const id = user_id.id;
  const UserDetails = Details.state.record;
  console.log(UserDetails);

  const navigate = useNavigate();
  const [name, setName] = useState(UserDetails.name);
  const [email, setEmail] = useState(UserDetails.email);
  const [password, setPassword] = useState(" ");
  const [password_confirmation, setPassword_confirmation] = useState(" ");
  const [role, setRole] = useState(UserDetails.role);
  const [roleData, setRoleData] = useState([UserDetails.role_id]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    // usercreate();
    edituser();
  };

  useEffect(() => {
    loadData();
    form.setFieldsValue({
      name: UserDetails.name,
      email: UserDetails.email,
      //password:UserDetails.password,
      //confirmpassword :UserDetails.password_confirmation,
      role: UserDetails.role_id,
    });
  }, []);

  const onReset = () => {
    form.resetFields();
  };

  async function edituser() {
    let item = {
      user_id: id,
      name,
      email,
      password_confirmation,
      password,
      role,
    };
    api("/user-update", {
      method: "POST",
      data: JSON.stringify(item),
    })
      .then((res) => {
        let response = res.data;
        console.log(response);
        alert(response.message);
        navigate("/manage-user");
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          alert("error");
        }
      });
  }

  const loadData = () => {
    api("/roles", {
      method: "GET",
    })
      .then((res) => {
        let response = res.data.data;

        console.log(response);

        setRoleData(response.data);
      })
      .catch((err) => {
        console.log(err);

        let error = err.response.data;

        if (error.status === false) {
          console.log("error");
        }
      });
  };

  const handler = (event) => {
    console.log(event);
    setRole(event);
  };

  return (
    <div>
      <Header />
      <div className="User_layout">
        <h1 className="userformtitle">Edit User</h1>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input onChange={({ target }) => setName(target.value)} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input onChange={({ target }) => setEmail(target.value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your password!",
            //   },
            // ]}
          >
            <Input onChange={({ target }) => setPassword(target.value)} />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmpassword"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please confirm password!",
            //   },
            // ]}
          >
            <Input
              onChange={({ target }) => setPassword_confirmation(target.value)}
            />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              // onChange={onRoleChange}
              allowClear
              onChange={handler}
            >
              {roleData.map((item, i) => {
                // console.log(item);
                return <Option value={item.id}>{item.name}</Option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default EditUser;
