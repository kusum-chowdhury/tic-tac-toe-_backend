const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);
const {v4: uuid} = require("uuid")



app.use(express.json());
app.set('view engine', 'ejs')
app.use(express.static("public"))

app.get("/", (req, res)=> {
    res.render('index')
})

server.listen(3000, () => {
    console.log('server is running')
});

