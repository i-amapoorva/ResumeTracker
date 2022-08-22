import React from "react";
import Header from "../Components/Header";
import { Button, Space, Table, Tag } from "antd";

const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "1",
    num: "1",
    name: "John",
  },
  {
    key: "2",
    num: "2",
    name: "Jim",
  },
  {
    key: "3",
    num: "3",
    name: "Joe",
    // lastName: "Black",
    // email: "joe@mail.com",
    // role: "Manager",
    // tags: ["cool", "teacher"],
  },
];

const ManageRole = () => (
  <div>
    <Header />
    <div className="table_btn_layout">
      <Button type="primary" className="table_create_button"
      onClick={() => (window.location.href = "/create-role")}
      >Create New Role</Button>
    </div>
    <div  className="table_layout">
      <Table dataSource={data}
      pagination={false}>
        {/* <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
      </ColumnGroup> */}
        <Column title="No" dataIndex="num" key="num" />
        <Column title="Name" dataIndex="name" key="name" />
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
              <Button>Show</Button>
              {/* <a>
                Edit
                {record.lastName}
              </a> */}
              <Button>Edit</Button>
              {/* <a>Delete</a> */}
              <Button>Delete</Button>
            </Space>
          )}
        />
      </Table>
    </div>
  </div>
);

export default ManageRole;
