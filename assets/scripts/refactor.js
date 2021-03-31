var tokens = [
    {token:0, color:1, playerType:1, homePosition:{x:25,y:226}, initialSlot:1, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
    {token:1, color:1, playerType:1, homePosition:{x:86.8,y:226}, initialSlot:1, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
    {token:2, color:1, playerType:1, homePosition:{x:25,y:290}, initialSlot:1, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
    {token:3, color:1, playerType:1, homePosition:{x:86.8,y:290}, initialSlot:1, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
    {token:0, color:2, playerType:1, homePosition:{x:225,y:226}, initialSlot:13, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
    {token:1, color:2, playerType:1, homePosition:{x:286.8,y:226}, initialSlot:13, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
    {token:2, color:2, playerType:1, homePosition:{x:225,y:290}, initialSlot:13, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
    {token:3, color:2, playerType:1, homePosition:{x:286.8,y:290}, initialSlot:13, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
    {token:0, color:3, playerType:1, homePosition:{x:225,y:26}, initialSlot:25, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
    {token:1, color:3, playerType:1, homePosition:{x:86.8,y:26}, initialSlot:25, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
    {token:2, color:3, playerType:1, homePosition:{x:225,y:90}, initialSlot:25, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
    {token:3, color:3, playerType:1, homePosition:{x:86.8,y:90}, initialSlot:25, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
    {token:0, color:4, playerType:1, homePosition:{x:25,y:26}, initialSlot:37, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
    {token:1, color:4, playerType:1, homePosition:{x:86.8,y:26}, initialSlot:37, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
    {token:2, color:4, playerType:1, homePosition:{x:25,y:90}, initialSlot:37, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
    {token:3, color:4, playerType:1, homePosition:{x:86.8,y:90}, initialSlot:37, colorSlot:0, boardSlot:0, finalLane:0, dieOne:0, dieTwo:0, move:0},
]

const board = [ {x:55,y:180},{x:80,y:180},{x:105,y:180},{x:130,y:180},{x:130,y:205},{x:130,y:230},{x:130,y:255},{x:130,y:280},
                {x:130,y:305},{x:155,y:305},{x:180,y:305},{x:180,y:280},{x:180,y:255},{x:180,y:230},{x:180,y:205},{x:180,y:180},
                {x:205,y:180},{x:230,y:180},{x:255,y:180},{x:280,y:180},{x:305,y:180},{x:305,y:155},{x:305,y:130},{x:280,y:130},
                {x:255,y:130},{x:230,y:130},{x:205,y:130},{x:180,y:130},{x:180,y:105},{x:180,y:80},{x:180,y:55},{x:180,y:30},
                {x:180,y:5},{x:155,y:5},{x:130,y:5},{x:130,y:30},{x:130,y:55},{x:130,y:80},{x:130,y:105},{x:130,y:130},
                {x:105,y:130},{x:80,y:130},{x:55,y:130},{x:30,y:130},{x:5,y:130},{x:5,y:155},{x:5,y:180},{x:30,y:180}
            ];

let rsafespace = [1,7,10,13,19,22,25,31,34,37,43,46];
var rblockedposition = []

var dieone;
var dietwo;
var turn_color = 1;
var player = tokens.filter(player => player.color == turn_color);

rollthedice();
checkFive();

function rollthedice() { 
    dieone =  Number(Math.floor(Math.random()*6+1));
    dietwo =  Number(Math.floor(Math.random()*6+1));
    console.log(dieone);
    console.log(dietwo);
    return;
}

function checkFive() { 
    if(dieone+dietwo == 5 || dieone == 5 || dietwo == 5){
        var initialSlot = player[0].initialSlot;
        var noBlock = tokens.filter(token => token.boardSlot == initialSlot).length < 2;
        var playerBlock = player.filter(token => token.colorSlot == initialSlot).length == 2;
        if (noBlock){
            console.log(`Leave home`);
        }else{
            if(playerBlock){
                console.log(`It's blocked by myself, showing other options`);
            }else{
                console.log(`Sending another player home`);
            }
        }
    }else{
        console.log("No fives, going to options");
    }
}




