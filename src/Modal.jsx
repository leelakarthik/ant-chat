import { Fragment, useState } from "react";
import ReactDOM from "react-dom";

const portalElement = document.getElementById("overlay");
const Modal = (props) => {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = () => {
    console.log("sub", value);
    value === "" ? alert("Enter a room to join") : props.callback(value);
  };
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className="Room-box">
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              value={value}
              placeholder="Enter Room ID"
              autoFocus
            ></input>
            <hr />
            <button type="submit">Join the room</button>
          </form>
        </div>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
