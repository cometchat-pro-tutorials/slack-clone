import React, { Component } from "react";
import Chatbox from "../Chatbox";
import Groups from "../Groups";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    return (
      <React.Fragment>
        <Groups />
        <Chatbox />
      </React.Fragment>
    );
  }
}
