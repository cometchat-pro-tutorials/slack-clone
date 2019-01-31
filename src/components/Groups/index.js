import React, { Component } from "react";
import { CometChat } from "@cometchat-pro/chat";
import { Link } from "react-router-dom";
import "./index.css";

export default class Groups extends Component {
  constructor(props) {
    super(props);
    this.limit = 30;

    this.state = {
      groupList: [],
      activeGroup: ""
    };
  }

  componentDidMount() {
    this.groupsRequest = new CometChat.GroupsRequestBuilder()
      .setLimit(this.limit)
      .build();

    this.groupsRequest.fetchNext().then(
      groupList => {
        /* groupList will be the list of Group class */
        console.log("Groups list fetched successfully", groupList);
        this.setState({ groupList });
        /* you can display the list of groups available using groupList */
      },
      error => {
        console.log("Groups list fetching failed with error", error);
      }
    );
  }

  selectGroup(GUID) {
    this.password = "";
    this.groupType = CometChat.GROUP_TYPE.PUBLIC;
    this.props.updateState(GUID);
    CometChat.joinGroup(GUID, this.groupType, this.password).then(
      group => {
        console.log("Group joined successfully:", group);
      },
      error => {
        console.log("Group joining failed with exception:", error.code);
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="group">
          <div className="groupList">
            <ul>
              {this.state.groupList.map(groups => (
                <li
                  key={groups.guid}
                  onClick={this.selectGroup.bind(this, groups.guid)}
                >
                  <div className="groupName"> # {groups.name}</div>
                </li>
              ))}
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
