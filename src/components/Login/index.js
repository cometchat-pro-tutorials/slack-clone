import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";
import { API_KEY } from "../../config.js";
import "./index.css";
import Loading from "./loading.svg";

export default class Login extends Component {
  constructor() {
    super();

    this.login = this.login.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      redirect: false,
      userName: "",
      isLoading: false,
      error: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.login();
    this.setState({ isLoading: true, error: "" });
  }

  handleUserInput(e) {
    this.setState({ userName: e.target.value.toUpperCase() });
  }

  renderRedirect = () => {
    return <Redirect to="/dashboard" />;
  };

  login() {
    // Becareful of exposing your API key here.
    // It can be dangerous if it gets into the hands of unauthorize users

    CometChat.login(this.state.userName, API_KEY).then(
      user => {
        console.log("Login Successful:", { user });
        this.setState({ redirect: true });
      },
      error => {
        console.log("Login failed with exception:", { error });
        this.setState({
          error: "Login failed, please enter a valid username",
          isLoading: false
        });
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="login">
          <h4>Welcome to Your React Chat App</h4>
          {!this.state.redirect ? "" : this.renderRedirect()}
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input
                  className="groupname"
                  placeholder="Enter Your Username"
                  onChange={this.handleUserInput}
                />
              </div>
              <button className="button modal-button">Login</button>
            </form>
            <div className="error">{this.state.error}</div>
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
          <div className="signup-text">
            <p>Need an account?</p>
            <p>
              Create one from the{" "}
              <a href="https://app.cometchat.com/" target="blank">
                CometChat Pro dashboard
              </a>
            </p>
            <p>
              or use one of our test usernames: superhero1, superhero2,
              superhero3 to login
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
