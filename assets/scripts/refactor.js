var tokens = [
    {token:0, color:0, playerType:1, homePosition:{x:25,y:226}, initialSlot:1, colorSlot:48, boardSlot:48, finished:0, dieOne:0, dieTwo:0, move:20},
    {token:1, color:0, playerType:1, homePosition:{x:86.8,y:226}, initialSlot:1, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:2, color:0, playerType:1, homePosition:{x:25,y:290}, initialSlot:1, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:3, color:0, playerType:1, homePosition:{x:86.8,y:290}, initialSlot:1, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:0, color:1, playerType:1, homePosition:{x:225,y:226}, initialSlot:13, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:1, color:1, playerType:1, homePosition:{x:286.8,y:226}, initialSlot:13, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:2, color:1, playerType:1, homePosition:{x:225,y:290}, initialSlot:13, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:3, color:1, playerType:1, homePosition:{x:286.8,y:290}, initialSlot:13, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:0, color:2, playerType:1, homePosition:{x:225,y:26}, initialSlot:25, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:1, color:2, playerType:1, homePosition:{x:86.8,y:26}, initialSlot:25, colorSlot:0, boardSlot:0, finished:0,dieOne:0, dieTwo:0, move:0},
    {token:2, color:2, playerType:1, homePosition:{x:225,y:90}, initialSlot:25, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:3, color:2, playerType:1, homePosition:{x:86.8,y:90}, initialSlot:25, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:0, color:3, playerType:1, homePosition:{x:25,y:26}, initialSlot:37, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:1, color:3, playerType:1, homePosition:{x:86.8,y:26}, initialSlot:37, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:2, color:3, playerType:1, homePosition:{x:25,y:90}, initialSlot:37, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:3, color:3, playerType:1, homePosition:{x:86.8,y:90}, initialSlot:37, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
]

let board = [ {x:55,y:180},{x:80,y:180},{x:105,y:180},{x:130,y:180},{x:130,y:205},{x:130,y:230},{x:130,y:255},{x:130,y:280},{x:130,y:305},{x:155,y:305},
                {x:180,y:305},{x:180,y:280},{x:180,y:255},{x:180,y:230},{x:180,y:205},{x:180,y:180},{x:205,y:180},{x:230,y:180},{x:255,y:180},{x:280,y:180},
                {x:305,y:180},{x:305,y:155},{x:305,y:130},{x:280,y:130},{x:255,y:130},{x:230,y:130},{x:205,y:130},{x:180,y:130},{x:180,y:105},{x:180,y:80},
                {x:180,y:55},{x:180,y:30},{x:180,y:5},{x:155,y:5},{x:130,y:5},{x:130,y:30},{x:130,y:55},{x:130,y:80},{x:130,y:105},{x:130,y:130},{x:105,y:130},
                {x:80,y:130},{x:55,y:130},{x:30,y:130},{x:5,y:130},{x:5,y:155},{x:5,y:180},{x:30,y:180}
            ];

let finalLanes = [
    [{x:30,y:155},{x:55,y:155},{x:80,y:155},{x:105,y:155},{x:130,y:155}],
    [{x:155,y:205},{x:155,y:230},{x:155,y:255},{x:155,y:280},{x:155,y:305}],
    [{x:280,y:155},{x:255,y:155},{x:230,y:155},{x:205,y:155},{x:180,y:155}],
    [{x:155,y:30},{x:155,y:55},{x:155,y:80},{x:155,y:105},{x:155,y:155}]
]

let lastSlot = 51;
let rsafespace = [1,7,10,13,19,22,25,31,34,37,43,46];
var rblockedposition = []

var dieone;
var dietwo;
var turn_color = 0;
var player = tokens.filter(player => player.color == turn_color);

function rollthedice() { 
    dieone =  5;//Number(Math.floor(Math.random()*6+1));
    dietwo =  1;//Number(Math.floor(Math.random()*6+1));
    console.log(dieone);
    console.log(dietwo);
    return;
}

function checkFive() { 
    if(dieone+dietwo == 5 || dieone == 5 || dietwo == 5){
        var initialSlot = player[0].initialSlot;
        var noBlock = tokens.filter(token => token.boardSlot == initialSlot).length < 2;
        var otherBlock = tokens.filter(token => token.boardSlot == initialSlot && token.color != turn_color);
        var myBlock = player.filter(mytoken => mytoken.boardSlot == initialSlot) == 2;
        if (noBlock){
            console.log(`Leave home`);
        }else{
            if(myBlock){
                console.log(`It's blocked by myself, showing other options`);
            }else{
                otherBlock.forEach(player => console.log(`Sending another player home, (${player.color})`));
            }
        }
    }else{
        console.log("No fives, going to options");
    }
}


function options() {
    for (token of player){
        var x =  rblockedposition.find(pos => pos > token.boardSlot && pos <= token.boardSlot + dieone);
        var y =  rblockedposition.find(pos => pos > token.boardSlot && pos <= token.boardSlot + dietwo);
        if(x || token.colorSlot + dieone > lastSlot){
            console.log(`Token ${token.token} at position ${token.boardSlot} can NOT move with ${dieone} because the position ${x} is blocked`);
        }else{
            console.log(`Token ${token.token} at position ${token.boardSlot} can move with ${dieone} because the will stop before a blocked position`);
        }
        if(y || token.colorSlot + dieone > lastSlot){
            console.log(`Token ${token.token} at position ${token.boardSlot} can NOT move with ${dietwo} because the position ${y} is blocked`);
        }else{
            console.log(`Token ${token.token} at position ${token.boardSlot} can move with ${dietwo} because the will stop before a blocked position`);
        }
    }
}

function move(){
    var token =  player.find(token => token.move > 0);
    while (token.move >= 0 ){
        if (token.colorSlot == lastSlot){
            token.finished = 1
            console.log(`This token has finished`);
            return;
        }
        if(token.colorSlot > 46){
            var position = token.colorSlot-47;
            console.log(`Player ${token.color}, token ${token.token}: Actual position is ${token.boardSlot} and there is ${token.move} moves left`);
            console.log(`Coordinates are ${finalLanes[token.color][position].x} and ${finalLanes[token.color][position].y}`)
        }else{
            var position = token.boardSlot;
            console.log(`Player ${token.color}, token ${token.token}: Actual position is ${position} and there is ${token.move} moves left`);
            console.log(`Coordinates are ${board[position].x} and ${board[position].y}`)
        }
        token.boardSlot += 1;
        token.colorSlot += 1;
        token.move -= 1;
    }
}

function sendhome(color, token){
    thistoken = tokens.find(thistoken => thistoken.color == color && thistoken.token == token);
    thistoken.colorSlot = 0;
    thistoken.boardSlot = 0;
    xPosition = thistoken.homePosition.x;
    yPosition = thistoken.homePosition.y;
    console.log(thistoken, xPosition, yPosition);
}

// rollthedice();
// options();
// sendhome(0,0);