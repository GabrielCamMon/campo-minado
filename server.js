const express = require("express")
const path = require('path')


const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile);
app.set("view engine", 'html');
app.use('/', (req, res) => {
    res.render('index.html');
});


tabuleiro=[]
    tabuleiro["A"]=["0","1","x","1"],
    tabuleiro["B"]=["0","2","2","2"],
    tabuleiro["C"]=["0","1","x","1"],
    tabuleiro["D"]=["0","0","1","0"]


let lose=false
let win=false

io.on("connection", socket=>{
    console.log(`Socket conectado: ${socket.id}`);
    socket.on('sendMessage', data =>{
      
        console.log(data)
        // messages.push(data);
        var receivedMessageObject ={
            tabuleiroValue :tabuleiro[data.posiAlpha][data.posiNum-1],
            id : data.idElement,
            lose,

        }
        if(receivedMessageObject.tabuleiroValue =="x"){
            receivedMessageObject.lose=true
        }   
            socket.emit("receivedMessage",receivedMessageObject);
            socket.broadcast.emit('receivedMessage',receivedMessageObject);
    
    })
  
})





server.listen(3000);

