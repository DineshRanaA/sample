const app = require("express")();

app.get('/',(req,res) => {
    res.json({
        message : 'testing'
    });
});

const PORT = 3002;
const server = app.listen(PORT, () => {
    console.log(`Server run in ${PORT}`);
});

const io = require("socket.io")(server);

io.on("connection", async (socket) =>  {
    console.log(`a user has connected ${socket.id}`);

    /*socket.on("_userAway", (payloadString) => {
      console.log("_userAway",payloadString);
    });
  
    socket.on("disconnect", () => {
        console.log("a user disconnected ", `${socket.id}`);
    });*/
})