import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Button, Space, Table, Pagination, Modal } from "antd";
import api from '../Components/Api';
import { Link } from "react-router-dom";
import EditRole from "./EditRole";
import { EditTwoTone, DeleteTwoTone, PlayCircleTwoTone, InteractionTwoTone } from "@ant-design/icons";


const { Column, ColumnGroup } = Table;

const ManageRole = () => {

  const [roleData, setRoleData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [pageSize, setpageSize] = useState(0);
  const [display, setDisplay] = useState(false);
  const [rolename, setRolename] = useState(" ");
  const [selectedpermissions, setSelectedPermissions] = useState([]);

  const onChange = (page) => {
    console.log(page);
    setcurrentPage(page);
    loadData(page);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = (page) => {
    const page_no = page ? page : 1;
    api('/roles?page='+page_no,{  
      method: "GET",      
    })  
      .then((res) => { 
        let response = res.data.data;
        console.log(response.data);
        setRoleData(response.data);   
        setTotalItem(response.total);
        setpageSize(response.per_page);     
      }).catch((err) => { 
        console.log(err);
        let error = err.response.data;
        if(error.status===false){
           console.log('error');
        }
    });
  };

  const displayRole = (id) => {
    setDisplay(true);
    api('/role/'+id,{  
      method: "GET",      
    })  
      .then((res) => { 
        let response = res.data;
        console.log(response);
        setRolename(response.role.name);
        setSelectedPermissions(response.rolePermissions);
      }).catch((err) => { 
        console.log(err);
        let error = err.response.data;
        if(error.status===false){
           console.log('error');
        }
    });
  }

  const deleteRole = (id) =>{
    var retVal = window.confirm("Are you Sure, you want to delete this role?");
    if(retVal === true){
        api('/delete-role/'+id,{  
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

  const changeRoleStatus = (id) =>{
    var retVal = window.confirm("Are you Sure, you want to change the status of this role?");
    if(retVal === true){
        api('/role-status-change/'+id,{  
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

  return(
  <div>
    <Header />
    <div className="table_btn_layout">
      <Button type="primary" className="table_create_button"
      onClick={() => (window.location.href = "/create-role")}
      >Create New Role</Button>
    </div>
    <div  className="table_layout">
      <Table pagination={false} dataSource={roleData}>
        {/* <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
      </ColumnGroup> */}
        <Column title="S.No" key="index" render={(value, item, index) =>  index+1}/>
        <Column title="Name" dataIndex="name" key="name" />
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
              <Button onClick = {() => {displayRole(record.id);}}><PlayCircleTwoTone />Show</Button>
              {/* <a>
                Edit
                {record.lastName}
              </a> */}
              <Link
                  className="link"
                  to={`/edit-role/` + record.id}
                  state= {{record}}
                  component={<EditRole/>}
                >
                  <Button><EditTwoTone />Edit</Button>
                </Link>
              {/* <a>Delete</a> */}
              <Button onClick = {() => {deleteRole(record.id);
              loadData();}}><DeleteTwoTone />Delete</Button>
              <Button onClick = {() => {changeRoleStatus(record.id);
              loadData();}}><InteractionTwoTone />Change Status</Button>
            </Space>
          )}
        />
      </Table><br/>
      <Pagination
          current={currentPage}
          onChange={onChange}
          pageSize={pageSize}
          total={totalItem}
        />
    </div>


    <Modal
        title="Role Details"
        visible={display}
        onOk={() => setDisplay(false)}
        onCancel={() => setDisplay(false)}
        width={1000}
      >
        <h3>Role : {rolename} </h3>
        <h3>Permissions : {selectedpermissions.map((item, i) => {
                var separater = i+1 < selectedpermissions.length ? ', ':'';
                return (
                        <span>{item.name}{separater}</span>                      
                );
              })}   </h3>
      </Modal>


  </div>
  );

}

export default ManageRole;
