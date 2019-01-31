import React, { Component } from "react";
import Chatbox from "../Chatbox";
import Groups from "../Groups";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: "supergroup"
    };

    this.updateState = this.updateState.bind(this);
  }

  updateState(group) {
    this.setState({ group: group }, () => {
      console.log("State in parent: " + this.state.group);

      console.log("group in parent: " + group);
      return { group: group };
    });
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
