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
    tabuleiro["A"]=[],
    tabuleiro["B"]=[],
    tabuleiro["C"]=[],
    tabuleiro["D"]=[]

    // tabuleiro["A"]=["0","1","x","1"],
    // tabuleiro["B"]=["0","2","2","2"],
    // tabuleiro["C"]=["0","1","x","1"],
    // tabuleiro["D"]=["0","0","1","0"]

function implantMine(){
    let column = ["A","B","C","D"]
    let line1=0;
    let line2=0;
    let mines=[]
    let indexColum1 = Math.floor(Math.random() * column.length)
    let indexColum2 = Math.floor(Math.random() * column.length)
    var rand1= column[indexColum1];
    var rand2= column[indexColum2];

    while(line1===line2){
        line1=Math.floor(Math.random() * column.length);
        line2=Math.floor(Math.random() * column.length);
    }
    tabuleiro[rand1][line1] = "x";
    tabuleiro[rand2][line2] = "x";
    mines.push({key:rand1,index:line1})
    mines.push({key:rand2,index:line2})

   
// for (key in tabuleiro) {
//         tabuleiro[key].forEach((value,index)=>{
//             console.log(tabuleiro[0][index])
//         })
//       }

    // for (key in tabuleiro) {
    //     tabuleiro[key].forEach((value,index)=>{
           
    //     })
    //   }
    // if(line1==0){
    //     if(indexColum1===0){
        
    //     }else if(indexColum1===3){

    //     }else{

    //     }
  
    // }else if(line1==3){
    //     if(indexColum1===0){
    //         tabuleiro[column[indexColum1]][line1-1]=tabuleiro[column[indexColum1]][line1-1]+1;
    //         tabuleiro[column[indexColum1+1]][line1-1]=tabuleiro[column[indexColum1]][line1-1]+1;
    //         tabuleiro[column[indexColum1+1]][line1]=tabuleiro[column[indexColum1]][line1]+1;
    //     }else if(indexColum1===3){
            
    //     }else{

    //     }
    // }else{
    //     if(indexColum1===0){
        
    //     }else if(indexColum1===3){
            
    //     }else{

    //     }
    // }

    

       mines.forEach((value,index)=>{
       if(value)
           console.log(value.key,"--",value.index)
        })
console.log(tabuleiro)
}

function startMineField(){
    for(let i=0; i<4 ;i++){
        tabuleiro["A"].push(0)
        tabuleiro["B"].push(0)
        tabuleiro["C"].push(0)
        tabuleiro["D"].push(0)
    }
    implantMine()
}

io.on("connection", socket=>{
    console.log(`Socket conectado: ${socket.id}`);
    socket.on('sendMessage', data =>{
      
        console.log(data)
        // messages.push(data);
        var receivedMessageObject ={
            tabuleiroValue :tabuleiro[data.posiAlpha][data.posiNum-1],
            id : data.idElement
        }
        socket.emit("receivedMessage",receivedMessageObject);
        socket.broadcast.emit('receivedMessage',receivedMessageObject);
    })
  
})



startMineField()

server.listen(3000);

