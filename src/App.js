import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Form from "./components/form";
import Modal from "./Modal";
// import { getMsgs } from "./service";

const connection = io.connect("http://localhost:3001");
// const connection = io.connect("https://express-ant-server.herokuapp.com", {
//   transports: ["websocket", "polling", "flashsocket"],
// });
connection.on("welcome", (data) => {
  console.log("welcome user " + data);
});

function App() {
  const [visible, setVisible] = useState(false);
  const setRoomValue = (data) => {
    console.log("In Room ", data);
    if (data !== "") {
      connection.emit("join_room", data);
      setVisible(!visible);
    }
  };
  return (
    <React.Fragment>
      {!visible && <Modal callback={setRoomValue} />}
      {visible && (
        <div className="container" id="main">
          <div className="row">
            <h3 id="title">Ant powered Chat Application</h3>
          </div>
          <Form connection={connection} />
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
