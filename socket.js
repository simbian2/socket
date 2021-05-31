const express = require('express')
const socket = require('socket.io')
const app = express()
const nunjucks = require('nunjucks')
//지금 까진 단방향통신을 했구나
//소켓은 양방향통신을 가능하게 해주는 거구나.
const http = require('http')
const server = http.createServer(app)
const io = socket(server)

app.use(express.static('./node_modules/socket.io/client-dist'))
app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
})
//npm install http
app.get('/',(req,res)=>{
    res.render('index')
})

io.sockets.on('connection',(socket)=>{
    socket.on('send',(data)=>{
        console.log(`클라이언트에게서 받은 메세지 ${data.msg}`)
        //여기까지는 보내기
        socket.broadcast.emit('call', data.msg)
        //보낸 사람 제외하고 나머지에게 보내기})
    })
})

server.listen(4000,()=>{
    console.log('salt')
})