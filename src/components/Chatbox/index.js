import React, { Component } from "react";
import { CometChat } from "@cometchat-pro/chat";
import Groups from "../Groups";

export default class Chatbox extends Component {
  constructor(props) {
    super(props);

    this.receiverID = "supergroup";
    this.messageText = "Hello world";
    this.messageType = CometChat.MESSAGE_TYPE.TEXT;
    this.receiverType = CometChat.RECEIVER_TYPE.GROUP;
    this.Send = this.Send.bind(this);

    this.textMessage = new CometChat.TextMessage(
      this.receiverID,
      this.messageText,
      this.messageType,
      this.receiverType
    );

    this.state = {
      user: this.receiverID
    };
  }

  Send() {
    CometChat.sendMessage(this.textMessage).then(
      message => {
        console.log("Message sent successfully:", message);
        // Do something with message
      },
      error => {
        console.log("Message sending failed with error:", error);
        // Handle any error
      }
    );
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
            <li className="self">
              <div className="avatar">John</div>
              <div className="msg">
                <p>
                  Who's online? <time> 20:18</time>
                </p>
              </div>
            </li>
            <li className="other">
              <div className="avatar">Alex</div>
              <div className="msg">
                <p>
                  Hola! <time> 20:17</time>
                </p>
              </div>
            </li>
            <li className="self">
              <div className="avatar">John</div>
              <div className="msg">
                <p>
                  Who's online? <time> 20:18</time>
                </p>
              </div>
            </li>
            <li className="other">
              <div className="avatar">Alex</div>
              <div className="msg">
                <p>
                  Hola! <time> 20:17</time>
                </p>
              </div>
            </li>
            <li className="self">
              <div className="avatar">John</div>
              <div className="msg">
                <p>
                  Who's online? <time> 20:18</time>
                </p>
              </div>
            </li>
            <li className="other">
              <div className="avatar">Alex</div>
              <div className="msg">
                <p>
                  Hola! <time> 20:17</time>
                </p>
              </div>
            </li>
            <li className="self">
              <div className="avatar">John</div>
              <div className="msg">
                <p>
                  Who's online? <time> 20:18</time>
                </p>
              </div>
            </li>
            <li className="other">
              <div className="avatar">Alex</div>
              <div className="msg">
                <p>
                  Hola! <time> 20:17</time>
                </p>
              </div>
            </li>
            <li className="self">
              <div className="avatar">John</div>
              <div className="msg">
                <p>
                  Who's online? <time> 20:18</time>
                </p>
              </div>
            </li>
            <li className="other">
              <div className="avatar">Alex</div>
              <div className="msg">
                <p>
                  Hola! <time> 20:17</time>
                </p>
              </div>
            </li>
            <li className="self">
              <div className="avatar">John</div>
              <div className="msg">
                <p>
                  Who's online? <time> 20:18</time>
                </p>
              </div>
            </li>
          </ol>
          <div className="chatInputWrapper">
            <input
              className="textarea input"
              type="text"
              placeholder="Type a message..."
            />
            <div className="emojis" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
