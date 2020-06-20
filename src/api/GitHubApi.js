import axios from "axios";

let config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export const getUserDetails = (username) =>
         axios.get(`https://api.github.com/users/${username}`);

export const getAllGithubUserList = (pageNumber, pageSize) =>
  axios.get(
    `https://api.github.com/users?since=${
      pageNumber 
    }&per_page=${pageSize}`
  );
