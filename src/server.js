const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "http://809d-175-101-104-12.ngrok.io ",
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
let room = "";
io.on("connection", (socket) => {
  console.log(`Connected user id is ${socket.id}`);
  socket.emit("welcome", socket.id);
  socket.on("join_room", (data) => {
    console.log("room = ", data);
    room = data;
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    socket.to(room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
