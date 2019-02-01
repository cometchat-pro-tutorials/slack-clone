import React, { Component } from "react";
import Chatbox from "../Chatbox";
import Groups from "../Groups";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: "supergroup",
      startChatStatus: false
    };

    this.updateState = this.updateState.bind(this);
  }

  // recieve event from props and update the state with the data
  updateState(group) {
    this.setState({ group: group }, () => {
      console.log("State in parent: " + this.state.group);

      console.log("group in parent: " + group);
      return { group: group };
    });

    this.setState({ startChatStatus: true });
  }

  render() {
    return (
      <React.Fragment>
        <Groups updateState={this.updateState} />
        <Chatbox state={this.state} />
      </React.Fragment>
    );
  }
}
