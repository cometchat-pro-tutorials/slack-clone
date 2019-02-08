import React, { Component } from "react";
import { CometChat } from "@cometchat-pro/chat";
import "./index.css";

export default class Chatbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receiverID: this.props.state.channelUID,
      messageText: null,
      channelMessages: [],
      user: {}
    };

    this.receiverID = this.state.receiverID;
    this.messageType = CometChat.MESSAGE_TYPE.TEXT;
    this.receiverType = CometChat.RECEIVER_TYPE.GROUP;
    this.messagesLimit = 30;
    this.send = this.send.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.fetchNewMessages = this.fetchNewMessages.bind(this);
    this.getUser = this.getUser.bind(this);
    this.newMessageListener = this.newMessageListener.bind(this);
  }

  componentDidUpdate() {
    if (this.props.state.channelUID !== this.state.receiverID) {
      this.fetchNewMessages();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.recieverID === this.props.state.channelUID) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.getUser();
    this.newMessageListener();
  }

  fetchNewMessages() {
    this.messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(this.props.state.channelUID)
      .setLimit(this.messagesLimit)
      .build();

    this.messagesRequest.fetchPrevious().then(
      messages => {
        this.setState(
          {
            channelMessages: messages,
            receiverID: this.props.state.channelUID
          },
          () => {
            return {
              channelMessages: messages,
              receiverID: this.props.state.channelUID
            };
          }
        );
        this.scrollToBottom();
      },
      error => {
        console.log("Message fetching failed with error:", error);
      }
    );
  }

  send() {
    let textMessage = new CometChat.TextMessage(
      this.state.receiverID,
      this.state.messageText,
      this.messageType,
      this.receiverType
    );

    CometChat.sendMessage(textMessage).then(
      message => {
        console.log("Message sent successfully:", message);
      },
      error => {
        console.log("Message sending failed with error:", error);
      }
    );
  }

  scrollToBottom() {
    const chat = document.querySelectorAll(".chat")[0];
    chat.scrollTop = chat.scrollHeight;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.send();
    e.target.reset();
  }

  handleMessageInput(e) {
    this.setState({ messageText: e.target.value });
  }

  // Get the current logged in user

  getUser() {
    CometChat.getLoggedinUser().then(
      user => {
        this.setState({ user: user }, () => {
          return { user: user };
        });
        return { user };
      },
      error => {
        console.log("error getting details:", { error });
        return false;
      }
    );
  }

  newMessageListener() {
    this.listenerID = "groupMessage";
    CometChat.addMessageListener(
      this.listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: textMessage => {
          this.setState(({ channelMessages }) => {
            return { channelMessages: [...channelMessages, textMessage] };
          });
        }
      })
    );
  }

  renderMessages() {
    return this.props.state.isShowMessages
      ? this.state.channelMessages.map(data => (
          <div>
            {/* Render loggedin user chat at the right side of the page */}

            {this.state.user.uid === data.sender.uid ? (
              <li className="self" key={data.id}>
                <div className="msg">
                  <p>{data.sender.uid}</p>
                  <div className="message"> {data.data.text}</div>
                </div>
              </li>
            ) : (
              // render loggedin users chat at the left side of the chatwindow
              <li className="other" key={data.id}>
                <div className="msg">
                  <p>{data.sender.uid}</p>

                  <div className="message"> {data.data.text} </div>
                </div>
              </li>
            )}
          </div>
        ))
      : "";
  }

  renderChatInputBox() {
    return this.props.state.isShowMessages ? (
      <div className="chatInputWrapper">
        <form onSubmit={this.handleSubmit}>
          <input
            className="textarea input"
            type="text"
            placeholder="Type a message..."
            onChange={this.handleMessageInput}
          />
        </form>

        <div className="emojis" />
      </div>
    ) : (
      ""
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="chatWindow">
          <ol className="chat">{this.renderMessages()}</ol>
          {this.renderChatInputBox()}
        </div>
      </React.Fragment>
    );
  }
}
