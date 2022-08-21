import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Button, Form, Input, Select, Checkbox, Col, Row } from "antd";
import api from "../Components/Api";
import { useLocation, useParams, useNavigate } from "react-router-dom";

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
const checkboxLayout = {
  wrappercol: {
    offset: 8,
    span: 4,
  },
};

function EditRole() {
  const navigate = useNavigate();
  const Details = useLocation();
  const role_id = useParams();
  const id = role_id.id;
  const RoleDetails = Details.state.record;

  console.log(RoleDetails);

  const [form] = Form.useForm();
  const [permissions, setPermissions] = useState([]);
  const [permission, setPermission] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const onFinish = (values) => {
    console.log(values);
    let permissionIds = "";
    permissionList.forEach((item) => {
      if (item.isCheck) permissionIds += item.id + ",";
    });

    console.log("IDS", permissionIds);
    let item = {
      name: values["name"],
      permission: permissionIds,
      role_id: id,
    };
    console.log(item);
    api("/update-role", {
      method: "POST",
      data: JSON.stringify(item),
    })
      .then((res) => {
        let response = res.data;
        console.log(response);
        alert(response.message);
        onReset();
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          console.log("error");
        }
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    loadData();
    selectCheckedData(id);
    form.setFieldsValue({
      name: RoleDetails.name,
      //permission:RoleDetails.phone_number,
    });
  }, []);

  const loadData = (page) => {
    api("/get-permissions", {
      method: "GET",
    })
      .then((res) => {
        let response = res.data.data;
        console.log(response);
        setPermissions(response);
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          console.log("error");
        }
      });
  };

  const selectCheckedData = (id) => {
    api("/role/" + id, {
      method: "GET",
    })
      .then((res) => {
        let response = res.data;
        console.log(response);
        setPermission(response.rolePermissions);
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          console.log("error");
        }
      });
  };

  const handleChange = (id) => {
    // let isChecked = e.target.checked;
    console.log(id);
    const updatedList = permissionList.map((item, index) => {
      if (id === item.id)
        return {
          ...item,
          isCheck: !item.isCheck,
        };

      return item;
    });

    console.log(updatedList);
    setPermissionList(updatedList);
  };

  useEffect(() => {
    if (permissions.length > 0 && permission.length > 0) {
      let permissionArray = [];
      permissions.forEach((item, index) => {
        let isPermissionChecked = false;
        const permissionValue = permission?.filter((element, index) => {
          return element.id === item.id;
        });

        if (permissionValue.length > 0) {
          isPermissionChecked = true;
        }

        permissionArray.push({ ...item, isCheck: isPermissionChecked });
      });

      setPermissionList(permissionArray);
      console.log("permissionArray", permissionArray);
    }

    return () => {};
  }, [permissions, permission]);

  return (
    <div>
      <Header />
      <div className="User_layout">
        <h1 className="userformtitle">Edit Role</h1>
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
            <Input />
          </Form.Item>
          <Form.Item {...checkboxLayout} name="permission" label="Permission">
            {/* <Checkbox.Group> */}
            {permissionList.map((item, i) => {
              return (
                <Row>
                  <Col>
                    <Checkbox
                      value={item.id}
                      checked={item.isCheck}
                      // indeterminate={isPermissionChecked}
                      // autoFocus={isPermissionChecked}
                      // defaultChecked={isPermissionChecked}
                      onChange={() => handleChange(item.id)}
                      style={{
                        lineHeight: "32px",
                      }}
                    >
                      {item.name}
                    </Checkbox>
                  </Col>
                </Row>
              );
            })}
            {/* </Checkbox.Group> */}
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            {/* <Button htmlType="button" onClick={onReset}>
              Reset
            </Button> */}
            {/* <Button type="link" htmlType="button" onClick={onFill}>
              Fill form
            </Button> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default EditRole;
