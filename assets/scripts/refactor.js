var tokens = [
    {token:0, color:0, playerType:1, homePosition:{x:25,y:226}, initialSlot:1, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:1, color:0, playerType:1, homePosition:{x:86.8,y:226}, initialSlot:1, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:2, color:0, playerType:1, homePosition:{x:25,y:290}, initialSlot:1, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:3, color:0, playerType:1, homePosition:{x:86.8,y:290}, initialSlot:1, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:0, color:1, playerType:1, homePosition:{x:225,y:226}, initialSlot:13, colorSlot:0, boardSlot:42, finished:0, dieOne:0, dieTwo:0, move:0},
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

const board = [ {x:0,y:0}, {x:55,y:180},{x:80,y:180},{x:105,y:180},{x:130,y:180},{x:130,y:205},{x:130,y:230},{x:130,y:255},{x:130,y:280},{x:130,y:305},{x:155,y:305},
                {x:180,y:305},{x:180,y:280},{x:180,y:255},{x:180,y:230},{x:180,y:205},{x:180,y:180},{x:205,y:180},{x:230,y:180},{x:255,y:180},{x:280,y:180},
                {x:305,y:180},{x:305,y:155},{x:305,y:130},{x:280,y:130},{x:255,y:130},{x:230,y:130},{x:205,y:130},{x:180,y:130},{x:180,y:105},{x:180,y:80},
                {x:180,y:55},{x:180,y:30},{x:180,y:5},{x:155,y:5},{x:130,y:5},{x:130,y:30},{x:130,y:55},{x:130,y:80},{x:130,y:105},{x:130,y:130},{x:105,y:130},
                {x:80,y:130},{x:55,y:130},{x:30,y:130},{x:5,y:130},{x:5,y:155},{x:5,y:180},{x:30,y:180}
            ];

const finalLanes = [
    [{x:30,y:155},{x:55,y:155},{x:80,y:155},{x:105,y:155},{x:130,y:155}],
    [{x:155,y:205},{x:155,y:230},{x:155,y:255},{x:155,y:280},{x:155,y:305}],
    [{x:280,y:155},{x:255,y:155},{x:230,y:155},{x:205,y:155},{x:180,y:155}],
    [{x:155,y:30},{x:155,y:55},{x:155,y:80},{x:155,y:105},{x:155,y:155}]
]

const lastSlot = 51;
const rsafespace = [1,7,10,13,19,22,25,31,34,37,43,46];
const dicenum = ["one","two","three","four","five","six"];
var rblockedposition = [6,7,8]

var dieone;
var dietwo;
var turn_color = 0;
var player = tokens.filter(player => player.color == turn_color);

// rollthedice();
// checkFive();
whostarts();

function whostarts(){
    players = tokens.filter(token => token.token == 0);
    var results = []
    players.forEach(player =>(
        rollthedice(),
        console.log(player),
        player.move = dieone + dietwo,
        results.push(player.move))
        // $("#"+players[i]+"diceone").html(`<i class="fas fa-dice-${dicenum[dieone[i]-1]} dice"></i>`);
        // $("#"+players[i]+"dicetwo").html(`<i class="fas fa-dice-${dicenum[dietwo[i]-1]} dice"></i>`);
    );
    resultSorted = results.sort(function(a, b){return b-a});
    var winner = players.filter(player => player.move == resultSorted[0])
    console.log(winner);
    if (winner.length > 1){
        console.log(results);
        console.log(`Restarting`);
        whostarts();
    }else{
        console.log(results);
        console.log(`The winner is ${winner[0].color}`)
    }
    return;
}

function rollthedice() { 
    dieone =  Number(Math.floor(Math.random()*6+1));
    dietwo =  Number(Math.floor(Math.random()*6+1));
    return;
}

function checkFive() {
    player.map(token => (token.dieOne = dieone, token.dieTwo = dietwo));
    if(dieone+dietwo == 5 || dieone == 5 || dietwo == 5){
        var initialSlot = player[0].initialSlot;
        var noBlock = tokens.filter(token => token.boardSlot == initialSlot).length < 2;
        var otherBlock = tokens.filter(token => token.boardSlot == initialSlot && token.color != turn_color);
        var myBlock = player.filter(mytoken => mytoken.boardSlot == initialSlot) == 2;
        if (noBlock){
            thisToken =  player.find(thisToken => thisToken.boardSlot == 0);
            console.log(`Leave home`);
            leavehome(thisToken);
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
    var thisToken =  player.find(thisToken => thisToken.move > 0);
    var blockedSpace = rsafespace.includes(thisToken.boardSlot);
    if(blockedSpace){
        var otherToken = tokens.find(otherToken => otherToken.boardSlot == thisToken.boardSlot && otherToken.color != thisToken.color);
        unblockspace(thisToken, otherToken, thisToken.boardSlot);
    }
    while (thisToken.move >= 0 ){
        if(thisToken.move == 0){
            whoishere(thisToken.color, thisToken.token);
        }
        if (thisToken.colorSlot == lastSlot){
            thisToken.finished = 1
            console.log(`This token has finished`);
            return;
        }
        if(thisToken.colorSlot > 46){
            var position = thisToken.colorSlot-47;
            console.log(`Player ${thisToken.color}, token ${thisToken.token}: Actual position is ${thisToken.boardSlot} and there is ${thisToken.move} moves left`);
            console.log(`Coordinates are ${finalLanes[thisToken.color][position].x} and ${finalLanes[thisToken.color][position].y}`)
        }else{
            var position = thisToken.boardSlot;
            console.log(`Player ${thisToken.color}, token ${thisToken.token}: Actual position is ${thisToken.boardSlot} and there is ${thisToken.move} moves left`);
            console.log(`Coordinates are ${board[position].x} and ${board[position].y}`)
        }
        thisToken.boardSlot += 1;
        thisToken.colorSlot += 1;
        thisToken.move -= 1;
    }
    return;
}

function whoishere(color, token){
    var thisToken = tokens.find(thistoken => thistoken.color == color && thistoken.token == token);
    var boardSlot = thisToken.boardSlot;
    var otherToken = tokens.find(otherToken => otherToken.boardSlot == boardSlot && otherToken.color != color);
    var safeSlot = rsafespace.includes(boardSlot);
    // console.log(boardSlot);
    // console.log(safespace);
    // console.log(safeSlot);
    if (otherToken){
        if(safeSlot) {
            console.log(`Blocking space, safeplace`);
            blockspace(thisToken, otherToken, boardSlot);
        }else{
            if(otherToken.color == color){
                blockspace(thisToken, otherToken, boardSlot);
            }else{
                if(boardSlot > 46){
                    return;
                }else{
                    console.log(`Sending player ${otherToken.color} token ${otherToken.token} home`)
                    sendhome(otherToken);
                }
            }  
        }
    }
    return;
}

function sendhome(thisToken){
    console.log(`sendding home`)
    thisToken.colorSlot = 0;
    thisToken.boardSlot = 0;
    var xPosition = thisToken.homePosition.x;
    var yPosition = thisToken.homePosition.y;
    console.log(thisToken, xPosition, yPosition);
    return;
}

function blockspace(thisToken, otherToken, boardSlot){
    console.log(thisToken);
    console.log(otherToken);
    rblockedposition.push(boardSlot);
    console.log(rblockedposition);
    return;
}

function unblockspace(thisToken, otherToken, boardSlot){
    console.log(rblockedposition);
    console.log(thisToken);
    console.log(otherToken);
    rblockedposition.push(boardSlot);
    console.log(rblockedposition);
    rblockedposition.splice(rblockedposition.indexOf(boardSlot),1)
    console.log(rblockedposition);
    return;
}

function leavehome(thisToken) {
    thisToken.boardSlot = thisToken.initialSlot
    thisToken.colorSlot = 1
    xPosition = board[thisToken.initialSlot].x
    yPosition = board[thisToken.initialSlot].y
    if (dieone == 5){
        player.map(token => token.dieOne = 0)
    }
    if (dietwo == 5){
        player.map(token => token.dieTwo = 0)
    }
    if (dieone + dietwo == 5){
        player.map(token => (token.dieOne = 0, token.dieTwo = 0))
    }
    return;
}

