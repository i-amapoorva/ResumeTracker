import DocViewer, {
  DocViewerRenderers
} from "@cyntler/react-doc-viewer";

import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Modal } from "antd";
//import axios from "axios";
import Header from "../Components/Header";
import { Option } from "antd/lib/mentions";
import api from '../Components/Api';
import { useLocation, useParams, useNavigate } from "react-router-dom"

//import TokenService from "../Components/TokenService";


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const ResumeUpdate = () => {
  const navigate = useNavigate();
  const Details = useLocation();
  const resume_id = useParams();
  const id = resume_id.id;
  const ResumeDetails = Details.state.ResumeDetails;
  //console.log(ResumeDetails);
  const [form] = Form.useForm();
  const [name, setName] = useState(ResumeDetails.name);
  const [phoneNumber, setPhoneNumber] = useState(ResumeDetails.phone_number);
  const [skill, setSkill] = useState(ResumeDetails.tags);
  //const [resume, setResume] = useState("");
  const [loader, setLoader] = useState(false);

  const [email, setEmail] = useState(ResumeDetails.email);
  const [totalExpYears, setTotalExpYears] = useState(ResumeDetails.total_exp_years);
  const [totalExpMonths, setTotalExpMonths] = useState(ResumeDetails.total_exp_months);
  const [ctc, setCtc] = useState(ResumeDetails.ctc);
  const [noticeperiod, setNoticePeriod] = useState(ResumeDetails.notice_period_in_days);
  const [location, setLocation] = useState(ResumeDetails.location);
  const [additionalInfo, setAdditionalInfo] = useState(ResumeDetails.additional_info);
  const [display, setDisplay] = useState(false);
  const [docs, setDocs] = useState([]);


  useEffect(() => {
    form.setFieldsValue({
      name:ResumeDetails.name,
      phone_number:ResumeDetails.phone_number,
      email:ResumeDetails.email,
      total_exp_years:ResumeDetails.total_exp_years,
      total_exp_months:ResumeDetails.total_exp_months,
      ctc:ResumeDetails.ctc,
      noticePeriod:ResumeDetails.notice_period_in_days,
      location:ResumeDetails.location,
      additionalInfo:ResumeDetails.additional_info,
      select_multiple:ResumeDetails.tags,
   });
  }, []);


  const onReset = () => {
    form.resetFields();
  };


  const displayModal = (id) => {
    setDisplay(true);
    api('/get-resume-file?id=' + id,{  
      method: "GET",      
    })
    .then((res) => { 
      let response = res.data;
      console.log(response);
      const type = response.response._source.type;
      const binary_file = response.response._source.binary_resume;
      const linkSource = `data:` + type + `;base64,` + binary_file;
      var binary = atob(binary_file.replace(/\s/g, ""));
      var len = binary.length;
      var buffer = new ArrayBuffer(len);
      var view = new Uint8Array(buffer);
      for (var i = 0; i < len; i++) {
         view[i] = binary.charCodeAt(i);
       }    
      const docs = [{ uri: linkSource }];
      setDocs(docs);
    }).catch((err) => { 
      console.log(err);
      let error = err.response.data;
      if(error.status===false){
        console.log('error');
      }
    });
  };


  async function onHandleSumbit() {
    //setLoader(true);

    const data = new FormData();
    const resumeData = document.querySelector('input[type="file"]').files[0];
    if(resumeData){
      data.append("resume", resumeData);
    }
    
    data.append("resume_id", id);
    data.append("name", name);
    data.append("phone_no", phoneNumber);
    data.append("tags", skill);    
    data.append("email", email);
    data.append("total_exp_years", totalExpYears);
    data.append("total_exp_months", totalExpMonths);
    data.append("ctc", ctc);
    data.append("notice_period_in_days", noticeperiod);
    data.append("location", location);
    data.append("additional_info", additionalInfo);

    api('/update-resume',{  
      method: "POST",      
      data: data,
    })  
      .then((res) => { 
        let result = res.data;
        console.log(result);
        if (result.status === true) {
          setLoader(false);
          alert("Resume has been updated successsfully");
          setLoader(false);
          navigate("/resume-search");
        } 
      }).catch((err) => { 
        console.log(err);
        let error = err.response.data;
        if(error.status===false){
          console.log('error');
        }
      });      

  }

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
            <span className="ant-form-text">Resume Update</span>
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
          >
            <Input type="file" name="resume"></Input>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
          <button type="button" className="card_btn ml_b" onClick={() => displayModal(id)}>
          View Resume
        </button><br/>
            <Button type="primary" htmlType="submit" loading={loader}>
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Modal
        title="DocViewer"
        visible={display}
        onOk={() => setDisplay(false)}
        onCancel={() => setDisplay(false)}
        width={1000}
      >
        <h3>Resume</h3>
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={docs}
          config={{
            header: {
              disableHeader: true,
              disableFileName: true,
              retainURLParams: false,
            },
          }}
        />
      </Modal>

      
    </div>
  );
};

export default ResumeUpdate;
