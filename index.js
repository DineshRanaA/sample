const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors("*"));

app.get('/',(req,res) => {
    res.json({
        message : 'testing'
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server run in ${PORT}`);
});