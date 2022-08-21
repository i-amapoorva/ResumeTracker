import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import Header from "../Components/Header";
import { Option } from "antd/lib/mentions";
import api from '../Components/Api';



const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const ResumeUpload = () => {
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [skill, setSkill] = useState("");
  const [loader, setLoader] = useState(false);

  const [email, setEmail] = useState("");
  const [totalExpYears, setTotalExpYears] = useState(" ");
  const [totalExpMonths, setTotalExpMonths] = useState(" ");
  const [ctc, setCtc] = useState("");
  const [noticeperiod, setNoticePeriod] = useState("");
  const [location, setLocation] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const onReset = () => {
    form.resetFields();
  };
/* Resume upload post api function */
  async function onHandleSumbit() {
    setLoader(true);

    const resumeData = document.querySelector('input[type="file"]').files[0];

    const data = new FormData();

    data.append("name", name);
    data.append("phone_no", phoneNumber);
    data.append("tags", skill);
    data.append("resume", resumeData);
    data.append("email", email);
    data.append("total_exp_years", totalExpYears);
    data.append("total_exp_months", totalExpMonths);
    data.append("ctc", ctc);
    data.append("notice_period_in_days", noticeperiod);
    data.append("location", location);
    data.append("additional_info", additionalInfo);

    
    api('/store-resume',{  
      method: "POST",      
      data: data,
    })  
      .then((res) => { 
        let result = res.data;
        console.log(result);
        if (result.status === true) {
          setLoader(false);
          alert("Resume has been stored successsfully");
          setLoader(false);
          form.resetFields();
        } 
      }).catch((err) => { 
        console.log(err);
        let error = err.response.data;
        if(error.status===false){
          alert('error');
        }
      });
  }
/* Resume upload post api function */

  return (
    <div>
      <Header />
      <div className="upload_container">
        <Form
          className="upld"
          {...formItemLayout}
          form={form}
          name="validate_other"
          onFinish={() => {
            onHandleSumbit();
          }}
        >
          <Form.Item className="txt">
            <span className="ant-form-text">Resume Upload</span>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter the name !",
              },
            ]}
          >
            <Input
              value={""}
              onChange={({ target }) => setName(target.value)}
            />
          </Form.Item>

          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please enter the phone number !",
              },
            ]}
          >
            <Input
              value={phoneNumber}
              onChange={({ target }) => setPhoneNumber(target.value)}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please enter the name !",
            //   },
            // ]}
          >
            <Input
              value={""}
              onChange={({ target }) => setEmail(target.value)}
            />
          </Form.Item>
          <Form.Item label="Total Experience">
            <Input.Group compact>
              <Form.Item
                name={["total_exp_years"]}
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Province is required",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "50%",
                  }}
                  placeholder="In years"
                  value={""}
                  onChange={({ target }) => setTotalExpYears(target.value)}
                />
              </Form.Item>
              <Form.Item
                name={["total_exp_months"]}
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Street is required",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "50%",
                  }}
                  placeholder="In months"
                  value={""}
                  onChange={({ target }) => setTotalExpMonths(target.value)}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item
            name="ctc"
            label="CTC"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please enter the name !",
            //   },
            // ]}
          >
            <Input value={""} onChange={({ target }) => setCtc(target.value)} />
          </Form.Item>

          <Form.Item
            name="noticePeriod"
            label="Notice Period"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please enter the name !",
            //   },
            // ]}
          >
            <Input
              value={""}
              placeholder="In days"
              onChange={({ target }) => setNoticePeriod(target.value)}
            />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please enter the name !",
            //   },
            // ]}
          >
            <Input
              value={""}
              onChange={({ target }) => setLocation(target.value)}
            />
          </Form.Item>

          <Form.Item
            name="select_multiple"
            label="Key Skills"
            rules={[
              {
                required: true,
                message: "Please select your skills!",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Please select your skills"
              onChange={(e) => {
                setSkill(e.join());
              }}
            >
              <Option value="java">Java</Option>
              <Option value="php">PHP</Option>
              <Option value="node js">Node Js</Option>
              <Option value="react js">React Js</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="additionalInfo"
            label="Additional Info"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please enter the name !",
            //   },
            // ]}
          >
            <Input
              value={""}
              onChange={({ target }) => setAdditionalInfo(target.value)}
            />
          </Form.Item>

          <Form.Item
            name="upload"
            label="Resume"
            valuePropName="fileList"
            extra="Upload Resume"
            rules={[
              {
                required: true,
                message: "Please upload resume!",
              },
            ]}
          >
            <Input type="file" name="resume"></Input>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit" loading={loader}>
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
};

export default ResumeUpload;
