import React, { Component } from "react";
import { CometChat } from "@cometchat-pro/chat";
import "./index.css";
// import Groups from "../Groups";

export default class Chatbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receiverID: this.props.state.group,
      messageText: null,
      groupMessage: []
    };

    this.receiverID = this.state.receiverID;
    this.messageType = CometChat.MESSAGE_TYPE.TEXT;
    this.receiverType = CometChat.RECEIVER_TYPE.GROUP;
    this.limit = 30;
    this.send = this.send.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillReceiveProps() {
    this.update();
  }
  componentDidMount() {
    this.update();
  }

  // this is meant to be fired each time you want to update the state with the current data from the api
  // So it's fired each time the component mounts and also each time the component recieves props to update the chat ui.
  update() {
    this.messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(this.props.state.group)
      .setLimit(this.limit)
      .build();

    this.messagesRequest.fetchPrevious().then(
      messages => {
      //  this line is left here for debugging purposes
        console.log("Message list fetched:", messages);
        //Handle the list of messages
        this.setState({ groupMessage: messages });
      },
      error => {
        console.log("Message fetching failed with error:", error);
      }
    );
  }

  send() {
    this.textMessage = new CometChat.TextMessage(
      this.props.state.group, //the group you want to render. In our case we are getting it from the parent state
      this.state.messageText,
      this.messageType,
      this.receiverType
    );
    CometChat.sendMessage(this.textMessage).then(
      message => {
        console.log("Message sent successfully:", message);
        // Update request new data from the api and update the state on componentDIdMount
        this.update();
      },
      error => {
        console.log("Message sending failed with error:", error);
        // Handle any error
      }
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.send();
    e.target.reset();
  }

  handleChange(e) {
    this.setState({ messageText: e.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <div className="chatWindow">
          <ol className="chat">
            {this.state.groupMessage.map(data => (
              
              <li className="self" key={data.id}>
                <div className="msg">
                  <p>
                    {data.sender.uid} <time> {data.time}</time>
                  </p>
                  <div className="message"> {data.data.text}</div>
                </div>
              </li>
            ))}
          </ol>
          <div className="chatInputWrapper">
            <form onSubmit={this.handleSubmit}>
              <input
                className="textarea input"
                type="text"
                placeholder="Type a message..."
                onChange={this.handleChange}
              />
            </form>

            <div className="emojis" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
