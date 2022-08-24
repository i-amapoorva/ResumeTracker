import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Button, Pagination, Space, Table, Tag, Modal } from "antd";
import api from "../Components/Api";
// import { Link, Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import EditUser from "./EditUser";
import { EditTwoTone, DeleteTwoTone, PlayCircleTwoTone, InteractionTwoTone } from "@ant-design/icons";
import TokenService from "../Components/TokenService";


const { Column, ColumnGroup } = Table;
// const data = [
//   {
//     key: "1",
//     num: "1",
//     name: "John",
//     lastName: "Brown",
//     email: "john@mail.com",
//     role: "Associate",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     num: "2",
//     name: "Jim",
//     lastName: "Green",
//     email: "jim@mail.com",
//     role: "Admin",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     num: "3",
//     name: "Joe",
//     lastName: "Black",
//     email: "joe@mail.com",
//     role: "Manager",
//     tags: ["cool", "teacher"],
//   },
// ];
// const Createuser = () => {
//    return <Createuser />;
//   navigate("/create-user");
//   window.location =
//   }

const ManageUser = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [pageSize, setpageSize] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState(" ");
  const [role, setRole] = useState(" ");

  const permission = TokenService.getPermission("permissions");

  const onChange = (page) => {
    console.log(page);
    setcurrentPage(page);
    viewuser(page);
  };

  useEffect(() => {
    viewuser();
  }, []);

  async function viewuser(page) {
    const page_no = page ? page : 1;
    api("/users?page=" + page_no, {
      method: "GET",
    })
      .then((res) => {
        let response = res.data;
        console.log(response);
        setUserData(response.data.data);
        setTotalItem(response.data.total);
        setpageSize(response.data.per_page);
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          console.log("error");
        }
      });
  }
  async function showuser(id) {
    api("/user/" + id, {
      method: "GET",
    })
      .then((res) => {
        let response = res.data;
        console.log(response);
        // window.location.href = "/show-user";
        setName(response.user.name);
        setEmail(response.user.email);
        setRole(response.user.role);
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          alert("error");
        }
      });
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // async function edituser() {
  //   api("/user-update", {
  //     method: "POST",
  //   })
  //     .then((res) => {
  //       let response = res.data;
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       let error = err.response.data;
  //       if (error.status === false) {
  //         alert("error");
  //       }
  //     });
  // }

  async function deleteuser(id) {
    api("/delete-user/" + id, {
      method: "Delete",
    })
      .then((res) => {
        let response = res.data;
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          alert("error");
        }
      });
  }

  const changeUserStatus = (id) =>{
    var retVal = window.confirm("Are you Sure, you want to change the status of this role?");
    if(retVal === true){
        api('/user-status-change/'+id,{  
          method: "GET",      
        })  
          .then((res) => { 
            let response = res.data;
            console.log(response);
            alert(response.message);
          }).catch((err) => { 
            console.log(err);
            let error = err.response.data;
            if(error.status===false){
              console.log('error');
            }
        });
    }else{
      return false;
    }
  }

  return (
    <div>
      <Header />
      <div className="table_btn_layout">

      {(permission.indexOf("user-create") !== -1)?
        <Button
          type="primary"
          className="table_create_button"
          onClick={() => (window.location.href = "/create-user")}
        >
          Create New User
        </Button>
         :null }
      </div>
      <div className="table_layout">
        <Table dataSource={userData} pagination={false}>
          {/* <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
      </ColumnGroup> */}
          <Column
            title="Sl No"
            dataIndex="num"
            key="num"
            render={(value, item, index) => index + 1}
          />
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Role" dataIndex="role" key="role" />
          <Column title="Status" render={(_,record) => record.status === 1 ? "Active" : "Inactive "} key="status" />
          {/* <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={(tags) => (
          <>
            {tags.map((tag) => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </>
        )}
      /> */}
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                {/* <Button
                  onClick={() => {
                    showuser(record.id);
                    showModal();
                  }}
                >
                  Show
                </Button> */}
                {/* <a>
                Edit
                {record.lastName}
              </a> */}
                {/* <Button>Edit</Button> */}

                {/* <Button to={`/edit-user/` +record.id} component={<EditUser />}>
                  Edit
                </Button> */}

                <Link
                  className="link"
                  to={`/edit-user/` + record.id}
                  state= {{record}}
                  component={<EditUser/>}
                >
                  {(permission.indexOf("user-edit") !== -1)?
                  <Button><EditTwoTone />Edit</Button>
                  :null }
                </Link>
                {/* <Button
                  onClick={() => {
                    deleteuser(record.id);
                    viewuser();
                  }}
                >
                 <DeleteTwoTone /> Delete
                </Button> */}
                <Button onClick = {() => {changeUserStatus(record.id);
              viewuser();}}><InteractionTwoTone />Change Status</Button>
              </Space>
            )}
          />
        </Table>
        <br />
        <Pagination
          current={currentPage}
          onChange={onChange}
          pageSize={pageSize}
          total={totalItem}
        />
      </div>
      <Modal
        title="User Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          {/* <Button type="primary" onClick={()=> window.location.href='/manage-user'}>Back</Button> */}
          <h3>Name :{name} </h3>
          <h3>Email :{email} </h3>
          <h3>Role : {role}</h3>
        </div>
      </Modal>
    </div>
  );
};

export default ManageUser;
