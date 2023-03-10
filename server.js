const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);
const {v4: uuidv4} = require("uuid")
const ngrok = require('ngrok')


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

io.on('connection', socket => {
    socket.on('join-room', roomId => {
        room = io.sockets.adapter.rooms.get(roomId);
        var roomSize = 0;
        if(room){
            roomSize = room.size;
        }
        if(roomSize < 2){
            socket.join(roomId);
            socket.broadcast.to(roomId).emit('user-connected');
            socket.on('disconnect', ()=> {
                socket.broadcast.to(roomId).emit('user-disconnected');
            })

            socket.on('can-play', () => {
                socket.broadcast.to(roomId).emit('can-play')
            })
            socket.on('clicked', (id) => {
                socket.broadcast.to(roomId).emit('clicked', id)
            })
        } else {
            socket.emit('full-room')
        }
    })
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

