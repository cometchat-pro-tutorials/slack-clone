import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";
import "./index.css";
export default class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.groupType = CometChat.GROUP_TYPE.PUBLIC;
    this.password = "";

    this.onGetGroupName = this.onGetGroupName.bind(this);
    this.onGetGUID = this.onGetGUID.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.createGroup = this.createGroup.bind(this);

    this.state = {
      GUID: "",
      groupName: "",
      createdStatus: false,
      error: false
    };
  }

  onGetGroupName(e) {
    this.setState({ groupName: e.target.value });
    console.log(e.target.value);
  }

  onGetGUID(e) {
    this.setState({ GUID: e.target.value });
    console.log(e.target.value);
  }

  onSubmit(e) {
    e.preventDefault();
    this.createGroup();
  }

  renderRedirect = () => {
    return <Redirect to="/dashboard" />;
  };

  createGroup() {
    this.group = new CometChat.Group(
      this.state.GUID,
      this.state.groupName,
      this.groupType,
      this.password
    );

    CometChat.createGroup(this.group).then(
      group => {
        console.log("Group created successfully:", group);
        this.setState({ createdStatus: true });
      },
      error => {
        console.log("Group creation failed with exception:", error);
        this.setState({ error: true });
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="modalcreate">
          <div id="open-modal" className="modal-window">
            <div>
              <Link to="#" title="Close" className="modal-close">
                Close
              </Link>
              <h1>Enter Group Name</h1>
              <form onSubmit={this.onSubmit}>
                <div>
                  <input
                    className="groupname"
                    onChange={this.onGetGroupName}
                    placeholder="Group Name"
                  />
                </div>
                <div>
                  <input
                    className="groupname"
                    onChange={this.onGetGUID}
                    placeholder="GUID"
                  />
                </div>
                <button className="button modalbutton">Create Group</button>
              </form>
              <p>{this.state.createdStatus ? this.renderRedirect() : ""}</p>
              <p>{this.state.error ? "Group creation failed" : ""}</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
