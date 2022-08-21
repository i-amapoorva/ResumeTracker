import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import Header from "../Components/Header";
import api from "../Components/Api";
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

function CreateUser() {
  const navigate = useNavigate();
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [password_confirmation, setPassword_confirmation] = useState(" ");
  const [roleData, setRoleData] = useState([]);
  const [role, setRole] = useState("");
  // const [valueState,setValueState] = useState("")

  const [form] = Form.useForm();
  // const onRoleChange = (value) => {
  //   switch (value) {
  //     case "admin":
  //       form.setFieldsValue({
  //         note: "Hi",
  //       });
  //       return;

  //     case "manager":
  //       form.setFieldsValue({
  //         note: "Hi",
  //       });
  //       return;

  //     case "associate":
  //       form.setFieldsValue({
  //         note: "Hi ",
  //       });
  //   }
  // };

  const onFinish = (values) => {
    console.log(values);
    usercreate();
  };

  const onReset = () => {
    form.resetFields();
  };

  //   const onFill = () => {
  //     form.setFieldsValue({
  //       note: "Hello world!",
  //       gender: "male",
  //     });
  //   };

  useEffect(() => {
    loadData();
  }, []);

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

  async function usercreate() {
    let item = { name, email, password, password_confirmation, role };
    api("/user", {
      method: "POST",
      data: JSON.stringify(item),
    })
      .then((res) => {
        let result = res.data;
        console.log(result);
        alert(result.message);
        navigate("/manage-user");
      })
      .catch((err) => {
        let error = err.response.data;
        if (error.status === false) {
          alert(error.message);
        }
      });
  }
  const handler = (event) => {
    // const value = event.value
    // setValueState(value);
    console.log(event);
    setRole(event);
  };

  return (
    <div>
      <Header />
      <div className="User_layout">
        <h1 className="userformtitle">Create User</h1>
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
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input onChange={({ target }) => setPassword(target.value)} />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmpassword"
            rules={[
              {
                required: true,
                message: "Please confirm password!",
              },
            ]}
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
          {/* <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("gender") === "other" ? (
                <Form.Item
                  name="customizeGender"
                  label="Customize Gender"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : null
            }
          </Form.Item> */}
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

export default CreateUser;
