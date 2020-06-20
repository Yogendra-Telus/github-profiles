import React, { useEffect, useState } from "react";
import { Table, Tag, Modal, Button } from "antd";
import { withRouter } from "react-router";
import { getAllGithubUserList } from "../api/GitHubApi";

const columns = [
  {
    title: "ID #",
    dataIndex: "id",
    sorter: false,
    className: "Width-5",
    render: (id) => <span className="btn btn-link">{id}</span>,
  },
  {
    title: "Login",
    dataIndex: "login",
    sorter: true,
    className: "Width-5",
  },
  {
    title: "UserType",
    dataIndex: "type",
    sorter: false,
    className: "Width-5",
  },
];
const PAGE_SIZE = 10;
const TOTAL_USER_COUNT = 24486303; // this data copied from github
const GithubUsersList = (props) => {
  const [userList, setUserList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  useEffect(() => {
    getAllGithubUserList(pageNumber, PAGE_SIZE).then((respone) => {
      if (respone.data) {
        setUserList(respone.data);
      }
    });
  }, []);

  const Pagination = ({ current, ...props }) => {
    let since = 0;
    if (current !== 1) {
      since = PAGE_SIZE * (current - 1);
    }
    getAllGithubUserList(since, PAGE_SIZE).then((respone) => {
      if (respone.data) {
        setUserList(respone.data);
        setPageNumber(current);
      }
    });
  };

  const handleUserClick = ({ history }, row) => {
    if (row.id) {
      history.push({
        pathname: `/user/${row.login}`,
      });
    }
  };

  return (
    <div className="form-group">
      <div>User list</div>
      <div style={{ height: "90%", width: "90%" }}>
        <Table
          pagination={
            ({ defaultCurrent: pageNumber }, { total: TOTAL_USER_COUNT })
          }
          footer={null}
          scroll={{ x: 1600 }}
          columns={columns}
          onChange={Pagination}
          onRowClick={handleUserClick.bind(this, props)}
          dataSource={
            userList &&
            userList.map((item, id) => ({
              ...item,
              key: id,
            }))
          }
        />
      </div>
    </div>
  );
};

export default withRouter(GithubUsersList);
