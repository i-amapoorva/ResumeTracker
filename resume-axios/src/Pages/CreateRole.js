import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Button, Form, Input, Select, Checkbox, Col, Row } from "antd";
import api from '../Components/Api';

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
const checkboxLayout ={
    wrappercol :{
        offset: 8,
        span: 4,
    },
}

function CreateRole() {
  const [form] = Form.useForm();
  const[permissions, setPermissions] = useState([]);
  const[permission, setPermission] = useState('');
  const onFinish = (values) => {
    console.log(values);
    let item = {
      name : values["name"],
      permission : values['permission'].toString()
    }
    console.log(item);
    api('/create-role',{  
      method: "POST",      
      data: JSON.stringify(item),
    })  
      .then((res) => { 
        let response = res.data;
        console.log(response);
        alert(response.message);
        onReset();
      }).catch((err) => { 
        console.log(err);
        let error = err.response.data;
        if(error.status===false){
          console.log('error');
        }
    });

  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = (page) => {
    api('/get-permissions', {  
      method: "GET",      
    })  
      .then((res) => { 
        let response = res.data.data;
        console.log(response);      
        setPermissions(response);  
      }).catch((err) => { 
        console.log(err);
        let error = err.response.data;
        if(error.status===false){
           console.log('error');
        }
    });
  };

  
  return (
    <div>
      <Header />
      <div className="User_layout">
        <h1 className="userformtitle">Create Role</h1>
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
            <Checkbox.Group>
            {permissions.map((item, i) => {
                return (
                  <Row>
                    <Col>
                      <Checkbox
                        value={item.id}
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
            </Checkbox.Group>
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

export default CreateRole;
