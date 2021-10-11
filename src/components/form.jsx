import React, { Component } from "react";
import { dataSpread, decrypt, encrypt, getMessageArray } from "../service";
import Message from "./message";

class Form extends Component {
  state = { value: "", messages: [] };
  connection = this.props.connection;
  /*
    'handleChange' method is used to update value field of state for every user input.
    */
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };
  /*
    'componentDidMount' function is a life cycle method which gets called every time the component mounted
    here we used it to clear the Message Box data when page refreshes.
    */
  componentDidMount() {
    this.connection.on("receive_message", (data) => {
      this.updateState(decrypt(data), this.state.messages);
    });
    this.setState({ value: "" });
  }
  /*
    'cloneStateMessages' function updates the state and message box values for user input and respective
    response from other user
    */
  cloneStateMessages = async () => {
    await this.connection.emit("send_message", encrypt(this.state.value));
    let messages = getMessageArray(this.state.messages, this.state.value);
    this.setState({
      messages: [...messages],
    });
    this.setState({ value: "" });
  };
  /*
    'updateState' is a function which updates the state after fethcing a message from other and scrolls to bottom
    of the messages box.
    */
  updateState = (response, messages) => {
    console.log("inupdate state ", response, messages);
    this.setState(
      { messages: [...messages, ...dataSpread(response, messages.length)] },
      () => this.scrollToBottom
    );
  };
  /* 
    'handleSubmit' is used to handle the submit request for the form, this calls a method and resets the
    value of input field.
    */
  handleSubmit = (event) => {
    this.state.value !== ""
      ? this.cloneStateMessages()
      : alert("Enter a message to send");
    event.preventDefault();
  };
  render() {
    const { messages, value } = this.state;
    return (
      <React.Fragment>
        <Message messages={messages} />
        <form
          className="input-group"
          id="input-box"
          onSubmit={this.handleSubmit}
        >
          <input
            className=" form-control"
            onChange={this.handleChange}
            value={value}
            autoFocus
          ></input>
          <button className=" btn btn-success" type="submit">
            send
          </button>
        </form>
      </React.Fragment>
    );
  }
}
export default Form;
