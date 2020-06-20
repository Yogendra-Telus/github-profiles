import React, { useEffect, useState } from "react";
import { getUserDetails } from "../api/GitHubApi";

const GitHubUserProfile = (props) => {
  const [userDetails, setUserDetails] = useState([]);
  const { match } = props;
  useEffect(() => {
    if (match && match.params && match.params.userName)
      getUserDetails(match.params.userName).then((respone) => {
        if (respone.data) {
          setUserDetails(respone.data);
        }
      });
  }, []);
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
          <div class="well profile">
            <div class="col-sm-12">
              <div class="col-xs-12 col-sm-8">
                <h2>{userDetails.name || ""}</h2>
                <p>
                  <strong>User Name: </strong> {userDetails.login || ""}{" "}
                </p>
                <p>
                  <strong>Email: </strong> {userDetails.email || ""}
                </p>
                <p>
                  <strong>Location: </strong> {userDetails.location || ""}
                </p>
                <p>
                  <strong>Bio: </strong> {userDetails.bio || ""}
                </p>
                <p>
                  <strong>company: </strong> {userDetails.company || ""}
                </p>
              </div>
              <div class="col-xs-12 col-sm-4 text-center">
                <figure>
                  <div class="card">
                    <img
                      class="card-img-top"
                      src={props.avatar_url}
                      alt="Card image cap"
                    />
                  </div>
                </figure>
              </div>
            </div>
            <div class="col-xs-12 divider text-center">
              <div class="col-xs-12 col-sm-4 emphasis">
                <h2>
                  <strong> {userDetails.followers} </strong>
                </h2>
                <p>
                  <small>Followers</small>
                </p>
                <button class="btn btn-success btn-block">
                  <span class="fa fa-plus-circle"></span> Follow{" "}
                </button>
              </div>
              <div class="col-xs-12 col-sm-4 emphasis">
                <h2>
                  <strong>{userDetails.following}</strong>
                </h2>
                <p>
                  <small>Following</small>
                </p>
                <button class="btn btn-info btn-block">
                  <span class="fa fa-user"></span> View Profile{" "}
                </button>
              </div>
            </div>
            <div class="col-xs-12 col-sm-8">
              <p>
                <strong>Social Account: </strong>
                <span class="tags">
                  Twitter: {userDetails.twitter_username || "NA"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubUserProfile;
