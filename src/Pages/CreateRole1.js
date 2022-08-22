import React from "react";
import Header from "../Components/Header";
import { Button, Form, Input, Select, Checkbox, Col, Row } from "antd";

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

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
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
              <Row>
                <Col>
                  <Checkbox
                    value="1"
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                role-list
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Checkbox
                    value="2"
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                role-create
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Checkbox
                    value="3"
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                role-edit
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Checkbox
                    value="4"
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                role-delete
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Checkbox
                    value="5"
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                user-list
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Checkbox
                    value="6"
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                user-create
                  </Checkbox>
                </Col>
              </Row>
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
