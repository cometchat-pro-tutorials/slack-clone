import React, { Component } from "react";
import { CometChat } from "@cometchat-pro/chat";
// import Groups from "../Groups";

export default class Chatbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageText: null,
      groupMessage: [],
      receiverID: "javascript"
    };

    this.receiverID = this.state.receiverID;
    this.messageType = CometChat.MESSAGE_TYPE.TEXT;
    this.receiverType = CometChat.RECEIVER_TYPE.GROUP;
    this.limit = 30;
    this.send = this.send.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  update() {
    this.messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(this.receiverID)
      .setLimit(this.limit)
      .build();

    this.messagesRequest.fetchPrevious().then(
      messages => {
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
      this.receiverID,
      this.state.messageText,
      this.messageType,
      this.receiverType
    );
    CometChat.sendMessage(this.textMessage).then(
      message => {
        console.log("Message sent successfully:", message);
        // Do something with message
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
            <li className="other">
              <div className="avatar">Alex</div>
              <div className="msg">
                <p>
                  Hola! <time> 20:17</time>
                </p>
              </div>
            </li>
            {this.state.groupMessage.map(data => (
              <li className="self" key={data.id}>
                <div className="msg">
                  <p>
                    {data.data.text} <time> {data.time}</time>
                  </p>
                  <div className="">{data.sender.uid}</div>
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
