import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";
import { API_KEY } from "../../settings";
import "./index.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.UID = "SUPERHERO1";
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);

    this.state = {
      redirect: false
    };
  }

  componentDidMount() {}

  renderRedirect = () => {
    return <Redirect to="/chat" />;
  };

  isLoggedIn() {
    CometChat.login(this.UID, API_KEY).then(
      User => {
        console.log("Login Successful:", { User });
        // this.setState({ redirect: true });
        return true;
      },
      error => {
        console.log("Login failed with exception:", { error });
        return false;
        // User login failed, check error and take appropriate action.
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="login">
          <h3>Welcome to Your React Chat App | Log in to start chatting</h3>
          <p>
            <form>
              <div>
                <input
                  className="groupname"
                  placeholder="Enter Your Username"
                />
              </div>
              <button className="button modalbutton">Create Group</button>
            </form>
          </p>
        </div>
      </React.Fragment>
    );
  }
}
