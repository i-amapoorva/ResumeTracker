import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import ResumeCard from "../Components/ResumeCard";
import { Pagination } from "antd";
import api from '../Components/Api';

function MyList() {
  const [isLoaded, setisLoaded] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [myResumeData, setMyResumeData] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [pageSize, setpageSize] = useState(0);

  const getAllData = async (page_no) => {
    let page = isNaN(page_no) ? "" : "?page_no=" + page_no;
    api('/my-resumeslist'+page,{  
      method: "GET",      
    })
    .then((res) => { 
      let response = res.data;
      console.log(response);
      setMyResumeData(response?.response?.hits?.hits);
      setTotalItem(response?.response?.hits?.total.value);
      setpageSize(response.page_size);
      setisLoaded(true);
      return myResumeData;
    }).catch((err) => { 
      console.log(err);
      let error = err.response.data;
      if(error.status===false){
        alert('error');
      }
    });    
  };

  useEffect(() => {
    getAllData();
  },[]);

  const onChange = (page) => {
    console.log(page);
    setcurrentPage(page);
    getAllData(page);
  };

  return (
    <div>
      <Header />
      <div className="ml">
        <div
          className="ml d-flex justify-content-center"
          style={{ minHeight: "70vh" }}
        >
          {isLoaded ? (
            <Row
              justify="space-around"
              style={{
                gap: "10px",
                justifyContent: "flex-start",
                marginLeft: "200px",
              }}
            >
              {myResumeData.map((item, i) => {
                return (
                  <Col span={5}>
                    <ResumeCard
                      name={item?._source?.name}
                      skill={item._source.tags.toString()}
                      id={item?._id}
                      key={i}
                      inMyList={1}
                    />
                  </Col>
                );
              })}
            </Row>
          ) : (
            <div></div>
          )}
        </div>

        <Pagination
          current={currentPage}
          onChange={onChange}
          pageSize={pageSize}
          total={totalItem}
        />
      </div>
    </div>
  );
}

export default MyList;
