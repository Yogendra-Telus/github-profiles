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
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  useEffect(() => {
    setLoading(true);
    getAllGithubUserList(pageNumber, PAGE_SIZE)
      .then((respone) => {
        if (respone.data) {
          setUserList(respone.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const Pagination = ({ current, ...props }) => {
    let since = 0;
    if (current !== 1) {
      since = PAGE_SIZE * (current - 1);
    }
    setLoading(true);
    getAllGithubUserList(since, PAGE_SIZE)
      .then((respone) => {
        if (respone.data) {
          setUserList(respone.data);
          setPageNumber(current);
        }
      })
      .finally(() => {
        setLoading(false);
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
      <div className="heading-style-github">Github User list</div>
      <div style={{ height: "90%", width: "90%" }}>
        <Table
          loading={loading}
          pagination={
            ({ defaultCurrent: pageNumber }, { total: TOTAL_USER_COUNT })
          }
          footer={null}
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
