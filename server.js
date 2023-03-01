const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);
const {v4: uuidv4} = require("uuid")



app.use(express.json());
app.set('view engine', 'ejs')
app.use(express.static("public"))

app.get("/", (req, res)=> {
    res.render('index')
})
// redirects to the url created by uuid 
//unique roomid created with uuid
app.get('/uuid', (req, res) => {
    res.redirect('/' + uuidv4())
})
//rendering to the room.ejs
app.get('/:room', (req, res)=> {
    res.render("room", {
        roomId: req.params.room
    })
})
server.listen(3000, () => {
    console.log('server is running')
});

