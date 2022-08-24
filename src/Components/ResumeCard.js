import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

import { Button, Input, Modal, Select, TimePicker, DatePicker } from "antd";
import React, { useState } from "react";
import api from "../Components/Api";
import dateFormat from "dateformat";
import { EditTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ResumeUpdate from "../Pages/ResumeUpdate";
import TokenService from "./TokenService";

const { Option } = Select;

function ResumeCard({ name, skill, id, inMyList, ResumeDetails }) {
  console.log(ResumeDetails);
  const [docs, setDocs] = useState([]);
  const [loader, setLoader] = useState(false);
  const [interview_date, setInterviewDate] = useState("");
  const [inteview_time, setInteview_time] = useState("");
  const [level_of_interview, setLevelofInterview] = useState("");
  const [interviewed_by, setInterviewedBy] = useState("");
  const [status, setStatus] = useState("");
  const [feedback_type, setFeedbackType] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackData, setFeedbackData] = useState([]);
  // const [form, setFeedback_form] = useState("");

  const permission = TokenService.getPermission("permissions");

  const onReset = () => {
    console.log("a");
    document.getElementById("feedback_form").reset();
    // form.resetFields();
  };

  const handleChange = (value) => {
    console.log(value);
    var x = document.getElementById("int_feedbaclfield");
    if (value === "1") {
      x.style.display = "block";
      setFeedbackType("1");
    } else {
      x.style.display = "none";
      setFeedbackType("2");
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    getfeedback(id);
  };

  /*get resume api function */
  const displayModal = (id) => {
    setDisplay(true);
    api("/get-resume-file?id=" + id, {
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
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          alert("error");
        }
      });
  };
  /*get resume api function */

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const formateDateTime = (datetime) => {
    const now = new Date(datetime);
    const formatedDateTime = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM TT");
    return formatedDateTime;
  };

  const downloadResume = (id) => {
    api("/get-resume-file?id=" + id, {
      method: "GET",
    })
      .then((res) => {
        let response = res.data;
        console.log(response);
        const type = response.response._source.type;
        const binary_file = response.response._source.binary_resume;
        const linkSource = `data:` + type + `;base64,` + binary_file;
        const downloadLink = document.createElement("a");
        const fileName = "file.";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          alert("error");
        }
      });
  };

  /* store feedback function */
  const onHandleSumbit = () => {
    setLoader(true);
    const interview_datetime = interview_date + " " + inteview_time;
    let item = {
      interview_datetime,
      level_of_interview,
      interviewed_by,
      status,
      feedback_type,
      feedback,
      resume_id: id,
    };
    console.log(item);
    api("/store-feedback", {
      method: "POST",
      data: JSON.stringify(item),
    })
      .then((res) => {
        let response = res.data;
        alert(response.message);
        setLoader(false);
        setVisible(false);
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          alert("Error submitting form!");
        }
      });
  };
  /* store feedback function end */

  /* get feedback function */
  async function getfeedback(id) {
    api("/get-resume-feedbacks?resume_id=" + id, {
      method: "GET",
    })
      .then((res) => {
        let response = res.data;
        console.log(response);
        setFeedbackData(response?.response?.hits?.hits);
        console.log(feedbackData);
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          alert("error");
        }
      });
  }
  /* get feedback function end */

  /* Add my List api function */
  let item = {
    resume_id: id,
  };

  function addMylist(id) {
    api("/addto-resumeslist", {
      method: "POST",
      data: JSON.stringify(item),
    })
      .then((res) => {
        let response = res.data;
        alert(response.message);
        setVisible(false);
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          alert("error");
        }
      });
  }
  /* Add my List api function end */

  /* remove my List api function  */
  function removeFromMylist(id) {
    api("/removefrom-resumeslist", {
      method: "POST",
      data: JSON.stringify(item),
    })
      .then((res) => {
        let response = res.data;
        console.log(response);
        setIsModalVisible(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          alert("error");
        }
      });
  }
  /* remove my List api function end */

  return (
    <div className="">
      <div className="card_r">
        <h2 className="elementor-cta__title">
          Name : <span>{name}</span>
          <span>
            <Link
              className="link"
              to={`/resume-update/` + id}
              state={{ ResumeDetails }}
              component={<ResumeUpdate props="ResumeDetails" />}
            >
              <EditTwoTone className="ml-1" />
              {/* <EditFilled className="ml-1" /> */}
            </Link>
          </span>
        </h2>
        <p>
          <div class="tooltip">
            {skill.length < 6 ? skill : skill.substring(0, 6) + ".."}
            <span class="tooltiptext">{skill}</span>
          </div>
        </p>
        <button className="card_btn" onClick={() => showModal()}>
          Tracker
        </button>
        <button className="card_btn ml_b" onClick={() => displayModal(id)}>
          Resume
        </button>
      </div>

      <Modal
        title="Tracker"
        visible={isModalVisible}
         onOk={handleOk}
         onCancel={handleCancel}
        footer={null}
      >
        {feedbackData.map((p) =>
          p._source.feedback_type === "1" ? (
            <div className="feedbacklist">
              <p className="tracker_text">
                Interviewed On:{formateDateTime(p._source.interview_datetime)}{" "}
              </p>
              <p className="tracker_text">
                Level of interview: {p._source.level_of_interview}
              </p>
              <p className="tracker_text">
                Interviewed By: {p._source.interviewed_by}
              </p>
              <p className="tracker_text">Feedback:{p._source.feedback} </p>
              <p className="tracker_text">Feedback By:{p._source.feedback_by} </p>
              <br />
            </div>
          ) : (
            <div className="feedbacklist">
              <p className="tracker_text">Feedback:{p._source.feedback} </p>
              <p className="tracker_text">Feedback By:{p._source.feedback_by} </p>
              <br />
            </div>
          )
           
        )}
        {(permission.indexOf("store-feedback") !== -1)?
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
            handleCancel();
          }}
        >
          Add Feedback
        </Button>
         :null }
        {inMyList === 1 ? (
          (permission.indexOf("my-resumes-list") !== -1)?
          <Button type="primary" onClick={removeFromMylist}>
            Remove From Mylist
          </Button>
          :null 
        ) : (
          (permission.indexOf("my-resumes-list") !== -1)?
          <Button type="primary"onClick={() =>{addMylist();
            handleCancel();}
          }>
            Add To Mylist
          </Button>
          :null 
        )}
      </Modal>

      <Modal
        title="Feedback"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        width={1000}
      >
        <form id="feedback_form">
          <Select
            placeholder="Feedback"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="1">Interview Feedback</Option>
            <Option value="2">Genaral Feedback</Option>
          </Select>

          <div id="int_feedbaclfield">
            <div>
              <TimePicker
                className="mt"
                placeholder="Interview Time"
                onChange={(time, timeString) => {
                  setInteview_time(timeString);
                }}
              />
            </div>
            <div>
              <DatePicker
                className="mt"
                placeholder="Interview Date"
                onChange={(date, dateString) => {
                  setInterviewDate(dateString);
                }}
              />
            </div>
            <Input
              placeholder="Level of Interview"
              className="mt"
              onChange={({ target }) => {
                console.log(target.value);
                setLevelofInterview(target.value);
              }}
              required
            />
            <Input
              placeholder="Interviewed By"
              className="mt"
              onChange={({ target }) => setInterviewedBy(target.value)}
            />
            <Select
              placeholder="Status"
              style={{ width: 120 }}
              className="mt"
              onChange={(value) => {
                console.log(value);
                setStatus(value);
              }}
            >
              <Option value="Selected">Selected</Option>
              <Option value="Rejected">Rejected</Option>
              <Option value="On Hold">On Hold</Option>
            </Select>
          </div>
          <Input
            placeholder="Feedback"
            type="textarea"
            className="mt"
            onChange={({ target }) => setFeedback(target.value)}
          />

          <Button
            type="primary"
            className="mt"
            loading={loader}
            onClick={() => {
              onHandleSumbit();
            }}
          >
            Submit
          </Button>
          <Button
            type="button"
            onClick={
              onReset
            }
          >
            Reset
          </Button>
        </form>
      </Modal>

      <Modal
        title="Resume"
        visible={display}
        onOk={() => setDisplay(false)}
        onCancel={() => setDisplay(false)}
        width={1000}
        // bodyStyle={{height: 500}}
        footer={null}
      >
        <h3>Resume</h3>
        <button className="card_btn ml_b" onClick={() => downloadResume(id)}>
          Download
        </button>
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
          // style={{}}
        />
        {/* <WebView blob={blob} linkSource={linkSource}/> */}

        {/* <embed src={linkSource} type="application/pdf" width="100%"></embed> */}
      </Modal>
    </div>
  );
}

export default ResumeCard;
