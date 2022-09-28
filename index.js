var express = require('express');
const morgan = require("morgan");

var app = express();

require('dotenv').config();

const PORT = process.env.PORT;

app.use(morgan("dev")); // showing api hit time
app.use(express.json()); // access input value

app.use("/api/v32", require("./v32/router"));
app.get('/',(req,res) => {
    res.json({
        message : 'testing'
    });
});
const server = app.listen(PORT, () => {
    console.log(`Server run in ${PORT}`);
});