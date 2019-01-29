import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";
import { API_KEY } from "../../settings";
import "./index.css";
import Loading from "./loading.svg";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      redirect: false,
      userStatus: "",
      userName: "",
      isLoading: false,
      error: ""
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.isLoggedIn();
    this.setState({ isLoading: true });
  }

  handleChange(e) {
    this.setState({ userName: e.target.value.toUpperCase() });
  }

  renderRedirect = () => {
    return <Redirect to="/dashboard" />;
  };

  isLoggedIn() {
    CometChat.login(this.state.userName, API_KEY).then(
      User => {
        console.log("Login Successful:", { User });
        this.setState({ redirect: true });
      },
      error => {
        console.log("Login failed with exception:", { error });
        // this.setState({ error: "Login failed", isLoading:false });
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="login">
          <h3>Welcome to Your React Chat App | Log in to start chatting</h3>
          {!this.state.redirect ? "" : this.renderRedirect()}
          <div>
            <form onSubmit={this.onSubmit}>
              <div>
                <input
                  className="groupname"
                  placeholder="Enter Your Username"
                  onChange={this.handleChange}
                />
              </div>
              <button className="button modalbutton">Login</button>
            </form>
            <div>{this.state.error}</div>
            <div>
              {this.state.isLoading ? (
                <p className="loading">
                  <img alt="loading" src={Loading} />
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
