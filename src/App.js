import React from "react";
import "antd/dist/antd.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GitHubUserProfile from "./components/GitHubUserProfile";
import GithubUsersList from "./components/GithubUsersList";
import "./css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={GithubUsersList} />
          <Route path="/user/:userName" component={GitHubUserProfile} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
