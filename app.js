const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const PORT = 3000;
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // Fixed 'app.set' to 'app.use' for static files

app.get("/", function (req, res) {
  res.render("index");
});

io.on("connection", function (socket) {
    socket.on("send-location",function(data){
        io.emit("receive-location", {id:socket.id,...data});
    });
    socket.on("disconnect", function () {
        io.emit("user-disconnected",socket.id)
    })
  console.log("a new client connected");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
