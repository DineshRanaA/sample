var express = require('express');
var app = express();

require('dotenv').config();

const PORT = process.env.PORT;
app.use("/api/v32", require("./v32/router"));
app.get('/',(req,res) => {
    res.json({
        message : 'testing'
    });
});
const server = app.listen(PORT, () => {
    console.log(`Server run in ${PORT}`);
});

const io = require("socket.io")(server, {
	cors: {
		origin: "*"
	}
});

io.on("connection", async (socket) =>  {
    console.log(`a user has connected ${socket.id}`);
    socket.on("_sendUserId", (payload) => {
        var data = JSON.parse(payload);
        socket.join("#"+data.userId);
    });

    socket.on("_sendMessage", (payload) => {
        var data = JSON.parse(payload);
        io.sockets.in("#"+data.receiverId).emit('_receiveMessage', payload);
    });

    socket.on("_typing", (payload) => {
        var data = JSON.parse(payload);
        io.sockets.in("#"+data.receiverId).emit('_typingStatus', payload);
    });
});