const app = require("express")();
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
app.use(cors("*"));

io.on("connection", async (socket) =>  {
    console.log(`a user has connected ${socket.id}`);

    socket.on("_userAway", (payloadString) => {
      console.log("_userAway",payloadString);
    });
  
    socket.on("disconnect", () => {
        console.log("disconnect",payloadString);
    });
})

app.get('/',(req,res) => {
    res.json({
        message : 'testing'
    });
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server run in ${PORT}`);
});