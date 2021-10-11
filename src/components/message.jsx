import React, { Component } from "react";
class Message extends Component {
  chatScroll = React.createRef();
  id = 0;
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  /*
  'scrollToBottom' function is used to scroll to the last element in the Message Box
  */
  scrollToBottom = () => {
    const { scrollHeight, clientHeight } = this.chatScroll.current;
    this.chatScroll.current.scrollTo(0, scrollHeight - clientHeight);
  };
  render() {
    const { messages } = this.props;
    return (
      <React.Fragment>
        <div
          ref={this.chatScroll}
          className="Chat-area overflow-auto"
          id="chatArea"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.type === "sent"
                  ? "mychat alert alert-primary "
                  : "antChat alert alert-danger"
              }
            >
              <span>
                {message.msg}
              </span>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
export default Message;
