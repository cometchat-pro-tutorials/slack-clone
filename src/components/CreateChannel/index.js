import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";
import "./index.css";
export default class CreateChannel extends Component {
  constructor(props) {
    super(props);

    this.groupType = CometChat.GROUP_TYPE.PUBLIC;
    this.password = "";

    this.handleChannelName = this.handleChannelName.bind(this);
    this.handleChannelUID = this.handleChannelUID.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createChannel = this.createChannel.bind(this);

    this.state = {
      channelUID: "",
      channelName: "",
      isCreated: false,
      error: false
    };
  }

  handleChannelName(e) {
    this.setState({ channelName: e.target.value });
    console.log(e.target.value);
  }

  handleChannelUID(e) {
    this.setState({ channelUID: e.target.value });
    console.log(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.createChannel();
  }

  renderRedirect = () => {
    return <Redirect to="/dashboard" />;
  };

  createChannel() {
    this.channel = new CometChat.Group(
      this.state.channelUID,
      this.state.channelName,
      this.groupType,
      this.password
    );

    CometChat.createGroup(this.channel).then(
      channel => {
        console.log("channel created successfully:", channel);
        this.setState({ isCreated: true });
      },
      error => {
        console.log("channel creation failed with exception:", error);
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
              <h1>Enter Channel Name</h1>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <input
                    className="groupname"
                    onChange={this.handleChannelName}
                    placeholder="Channel Name"
                  />
                </div>
                <div>
                  <input
                    className="groupname"
                    onChange={this.handleChannelUID}
                    placeholder="Channel UID"
                  />
                </div>
                <button className="button modal-button">Create Channel</button>
              </form>
              <p>{this.state.isCreated ? this.renderRedirect() : ""}</p>
              <p>{this.state.error ? "Channel creation failed" : ""}</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
