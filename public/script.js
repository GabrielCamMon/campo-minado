let posiAlpha;
let posiNum;
let idElement;
let contWin=0;
var socket = io("http://localhost:3000");


  
function renderMessage(receivedMessageObject){
  
  console.log(receivedMessageObject.tabuleiroValue)
  if(receivedMessageObject.tabuleiroValue=="x"){
    $(`#${receivedMessageObject.id}`).css("background-color", "red");
      //event.target.style.backgroundColor = "red";

      
  }else{
    $(`#${receivedMessageObject.id}`).css("border", "thick solid #101285");
    $(`#${receivedMessageObject.id}`).css("background", "none");
    $(`#${receivedMessageObject.id}`).html(receivedMessageObject.tabuleiroValue);
      //event.target.style.border = "thick solid #101285"
      //event.target.style.background = "none";
     // event.target.innerHTML=tabuleiro[posiAlpha][posiNum]
  }
}

socket.on("receivedMessage",function(receivedMessageObject){
  renderMessage(receivedMessageObject);
})

$( ".sea" ).click(function(event) {
  idElement = event.target.id  
  posiAlpha = event.target.id.charAt(0);
  posiNum = parseInt(event.target.id.substring(1));
  
  var messageObject={
      posiAlpha,
      posiNum,
      idElement
  };
  
  socket.emit("sendMessage",messageObject); 
 
});


 

 


