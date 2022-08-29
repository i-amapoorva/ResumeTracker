// import { Pagination } from "antd";
// import { Col, Input, Row } from "antd";
// import React, { useEffect, useState } from "react";
// import Header from "../Components/Header";
// import ResumeCard from "../Components/ResumeCard";
// import api from "../Components/Api";
// import RefinedSearch from "../Components/RefinedSearch";

// const { Search } = Input;

// function searchComb() {
//   const [isLoaded, setisLoaded] = useState(false);
//   const [currentPage, setcurrentPage] = useState(1);
//   const [totalItem, setTotalItem] = useState(0);
//   const [pageSize, setpageSize] = useState(0);
//   const [selectedSkill, setSelectedSkill] = useState([]);
//   const [filteredResumeData, setFilteredResumeData] = useState([]);

//   const onChange = (page) => {
//     console.log(page);
//     setcurrentPage(page);
//     onSearch(selectedSkill, page);
//   };

//   /*search api function */
//   const onSearch = (value, pageNo) => {
//     setSelectedSkill(value);
//     const data = new FormData();
//     data.append("tags", value);
//     data.append("page_no", pageNo);
//     api("/filter-resume", {
//       method: "POST",
//       data: data,
//     })
//       .then((res) => {
//         let response = res.data;
//         console.log(response);
//         setFilteredResumeData(response?.response?.hits?.hits);
//         setTotalItem(response?.response?.hits?.total.value);
//         console.log(totalItem);
//         setpageSize(response.page_size);
//         setisLoaded(true);
//       })
//       .catch((err) => {
//         console.log(err);
//         let error = err.response.data;
//         if (error.status === false) {
//           alert("error");
//         }
//       });
//   };
//   /*search api function */

//   useEffect(() => {
//     onSearch("", 1);
//   }, []);

//   return (
//     <div>
//       <Header />
//       <div></div>
//       <RefinedSearch />
      
//       <div className="ml">
//         <Search
//           placeholder="Skills"
//           style={{ width: 500 }}
//           onSearch={(value) => onSearch(value, 1)}
//           enterButton
//         />
//         <div
//           className="ml d-flex justify-content-center"
//           style={{ minHeight: "60vh" }}
//         >
//           {isLoaded ? (
//             <Row
//               justify="space-around"
//               style={{
//                 gap: "30px",
//                 justifyContent: "flex-start",
//                 marginLeft: "150px",
//               }}
//             >
//               {filteredResumeData.map((item, i) => {
//                 return (
//                   <Col span={5}>
//                     <ResumeCard
//                       name={item?._source?.name}
//                       skill={item._source.tags.toString()}
//                       id={item?._id}
//                       key={i}
//                       ResumeDetails={item?._source}
//                     />
//                   </Col>
//                 );
//               })}
//             </Row>
//           ) : (
//             <div></div>
//           )}
//         </div>

//         <Pagination
//           current={currentPage}
//           onChange={onChange}
//           pageSize={pageSize}
//           total={totalItem}
//         />
//       </div>
//     </div>
//   );
// }

// export default searchComb;
