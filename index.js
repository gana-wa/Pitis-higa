require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const indexRouter = require('./src/routes/index');

app.listen(process.env.PORT, () => {
   console.log(`Server is running at port ${process.env.PORT}`);
});

app.use(express.static("public"));
app.use(bodyParser.json()); //json
app.use(bodyParser.urlencoded({ extended: false })) //x-www-form-urlencoded
app.use(logger("dev"));
app.use(cors());

app.use(indexRouter);

io.on('connection', (socket) => {
   const id = socket.handshake.query.id;
   socket.join(id)
   console.log('a user connected with id: ', id);
   socket.on('disconnect', () => {
      console.log(`user with id: ${id} has disconnected`);
   });
});

http.listen(process.env.SOCKET_PORT, () => {
   console.log(`Socket is listening at port ${process.env.SOCKET_PORT}`);
});