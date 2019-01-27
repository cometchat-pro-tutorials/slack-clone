import React, { Component } from "react";
import Chatbox from "../Chatbox";
import Groups from "../Groups";

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Groups />
        <Chatbox />
      </React.Fragment>
    );
  }
}
