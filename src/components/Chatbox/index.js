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
    this.self = this;
  }

  componentDidUpdate() {
    this.self.newstate = this.state.receiverID;
    if (this.self.newstate !== this.props.state.group) {
      this.setState({ receiverID: this.props.state.group }, () => {
        console.log("new state " + this.state.receiverID);
        return { receiverID: this.props.state.group };
      });
    }
  }
  // componentWillReceiveProps() {
  //     this.update(); // just update the messages each time a prop is recvieved
  // }

  componentDidMount() {
    console.log("State from child " + this.state.receiverID);
    // this.update(); // render the message from our default group--supergroup
  }

  update() {
    this.messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(this.state.receiverID)
      .setLimit(this.limit)
      .build();

    this.messagesRequest.fetchPrevious().then(
      messages => {
        //  this line is left here for debugging purposes
        console.log("Message list fetched:", messages);
        //Handle the list of messages

        this.setState({ groupMessage: messages }, () => {
          return { groupMessage: messages };
        });
      },
      error => {
        console.log("Message fetching failed with error:", error);
      }
    );
  }

  send() {
    this.textMessage = new CometChat.TextMessage(
      this.state.receiverID, //the group you want to send the message to. In our case we are getting it from the parent state
      this.state.messageText,
      this.messageType,
      this.receiverType
    );
    console.log("From child component" + this.state.receiverID);

    CometChat.sendMessage(this.textMessage).then(
      message => {
        console.log("Message sent successfully:", message);
        // Update request new data from the api and update the state on componentDIdMount
        this.setState({ messageText: null });
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
