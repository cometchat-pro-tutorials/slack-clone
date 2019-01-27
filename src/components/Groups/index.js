import React, { Component } from "react";
import { CometChat } from "@cometchat-pro/chat";
import { Link } from "react-router-dom";

export default class Groups extends Component {
  constructor(props) {
    super(props);
    var limit = 30;

    this.groupsRequest = new CometChat.GroupsRequestBuilder()
      .setLimit(limit)
      .build();
  }

  componentDidMount() {
    // console.log(this.props);
  }

  getGroupList() {
    this.groupsRequest.fetchNext().then(
      groupList => {
        /* groupList will be the list of Group class */
        console.log("Groups list fetched successfully", groupList);
        /* you can display the list of groups available using groupList */
      },
      error => {
        console.log("Groups list fetching failed with error", error);
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="group">
          <div className="groupList">
            <ul>
              <li>
                <div>#General</div>
              </li>
              <li>
                <div>#Javascript</div>
              </li>
              <li>
                <div>#Javascript</div>
              </li>
            </ul>
          </div>
          <div className="createGroup">
            <button className="createGroupBtn button">
              <Link className="a" to="/creategroup">
                Create Group
              </Link>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
