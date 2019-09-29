
let posiAlpha;
let posiNum;
let contWin=0;

tabuleiro=[]
    tabuleiro["A"]=["0","0","0","x","x"],
    tabuleiro["B"]=["0","0","0","0","0"],
    tabuleiro["C"]=["0","0","0","0","0"],
    tabuleiro["D"]=["0","0","0","0","0"]
 


const buttons = document.querySelectorAll(".sea")
for (const button of buttons) {
  button.addEventListener('click', function(event) {
    posiAlpha = event.target.id.charAt(0);
    posiNum = parseInt(event.target.id.substring(1))-1;
    if(tabuleiro[posiAlpha][posiNum]=="x"){
      tabuleiro[posiAlpha][posiNum]="0"
        event.target.style.backgroundColor = "red";
        contWin++;
        if(contWin==17){
          alert("YouWin");
        }

    }else{

        event.target.style.backgroundColor = "#101285"
    }
   
  })
}


console.log(tabuleiro["A"][0])