window.onload = function(){ 

var moves, squares=new Array(9),scoreO=0,scoreX=0,winningComb=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],correctWinningComb;
createBoard();
document.getElementById("restart").addEventListener("click",createBoard);

function createBoard(){
	moves=0;
	correctWinningComb=-1;
	document.getElementById("winLineSvg").style.display="hidden";
	for(var i=0;i<9;i++){
		squares[i]="";
		var t=document.getElementById(i);
		t.addEventListener("click",runoxfunc);
		t.innerHTML="";
	}
	document.getElementById("winLine").style.animation="none";
	document.getElementById("gameOver").style="";
	document.getElementById("whoWon").innerHTML="";
	document.getElementById("restart").innerHTML="";
	document.getElementById("scoreO").innerHTML="O : "+scoreO+"&nbsp";	
	document.getElementById("scoreX").innerHTML="&nbsp"+"X : "+scoreX;
	animate1("O");
	animate2("X");

}

function runoxfunc(){oxfunc(this);}

function oxfunc(sq){
	if(moves%2===0){
		sq.style.color="blue";
		sq.innerHTML="O";	
		squares[sq.id]="O";
		animate1("X");
		animate2("O");
	}
	else{
		sq.style.color="red";
		sq.innerHTML="X";
		squares[sq.id]="X";
		animate1("O");
		animate2("X");
	}
	
	sq.removeEventListener("click",runoxfunc);
	var win=checkwin();
	if(win!==0){  //win or draw
		var p=document.getElementById("playerO").style;
		var q=document.getElementById("playerX").style;
		p.color="inherit";q.color="inherit";
		p.fontSize="inherit";q.fontSize="inherit";
		document.getElementById("gameOver").style.opacity="1";
		document.getElementById("gameOver").style.visibility="visible";
		var t=document.getElementById("whoWon");
		if(win===1){
			t.innerHTML=(moves%2===0)?"O WON":"X WON";
			moves%2===0?scoreO++:scoreX++;
			drawWinningLine();
		}
		if(win===2) t.innerHTML="DRAW";
		document.getElementById("restart").innerHTML="Press to restart!";
		for(var i=0;i<9;i++)
			document.getElementById(i).removeEventListener("click",runoxfunc);
		document.getElementById("scoreO").innerHTML="O : "+scoreO+"&nbsp";	
		document.getElementById("scoreX").innerHTML="&nbsp"+"X : "+scoreX;
	}
	moves++;
}

function checkwin(){
	if(moves<4) return 0;
	var flagX=0,flagO=0;
	for(var i=0;i<8;i++){
		for(var j=0;j<3;j++){
			if(squares[winningComb[i][j]]==="X") flagX++;	
			if(squares[winningComb[i][j]]==="O") flagO++;
		}
		if(flagX===3||flagO===3){
			correctWinningComb=i;
			return 1;
		}
		flagO=0;
		flagX=0;
	}
	if(moves===8) return 2;
	return 0;		
}

function animate1(letter){
	var t=document.getElementById("player"+letter).style;
	t.color=(letter==="O")?"blue":"red";
	t.fontSize="1.5em";
}
function animate2(letter){
	var t=document.getElementById("player"+letter).style;
	t.color="inherit";
	t.fontSize="inherit";
}

function drawWinningLine(){
	var t=correctWinningComb; //[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
	var x=document.getElementById("winLine");
	switch(t){
		case 0: setCoords("30","75","420","75"); break;
		case 1: setCoords("30","225","420","225"); break;
		case 2: setCoords("30","375","420","375"); break;
		case 3: setCoords("75","30","75","420"); break;
		case 4: setCoords("225","30","225","420"); break;
		case 5: setCoords("375","30","375","420"); break;
		case 6: setCoords("30","30","420","420"); break;
		case 7: setCoords("420","30","30","420"); break;
		default: setCoords("0","0","0","0"); 
	}
	function setCoords(x1,y1,x2,y2){
		x.setAttribute("x1",x1); x.setAttribute("y1",y1);x.setAttribute("x2",x2); x.setAttribute("y2",y2);
	}
	x.style.stroke=(moves%2===0)?"blue":"red";
	x.style.animation="lineAnimation 2s linear";
}

}