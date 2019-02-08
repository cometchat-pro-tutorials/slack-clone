import React, { Component } from "react";
import Chatbox from "../Chatbox";
import Channels from "../Channels";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelUID: "supergroup",
      isShowMessages: false
    };

    this.updateState = this.updateState.bind(this);
  }

  // recieve event from props and update the state with the data
  updateState(channel) {
    this.setState({ channelUID: channel, isShowMessages: true }, () => {
      return { channelUID: channel, isShowMessages: true };
    });
  }

  render() {
    return (
      <React.Fragment>
        <Channels updateState={this.updateState} />
        <Chatbox state={this.state} />
      </React.Fragment>
    );
  }
}
