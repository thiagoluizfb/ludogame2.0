var tokens = [
    {token:"one", color:0, playerType:1, homePosition:{x:25,y:226}, initialSlot:1, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"two", color:0, playerType:1, homePosition:{x:86.8,y:226}, initialSlot:1, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"three", color:0, playerType:1, homePosition:{x:25,y:290}, initialSlot:1, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"four", color:0, playerType:1, homePosition:{x:86.8,y:290}, initialSlot:1, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"one", color:1, playerType:1, homePosition:{x:225,y:226}, initialSlot:13, colorSlot:0, boardSlot:1, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"two", color:1, playerType:1, homePosition:{x:286.8,y:226}, initialSlot:13, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"three", color:1, playerType:1, homePosition:{x:225,y:290}, initialSlot:13, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"four", color:1, playerType:1, homePosition:{x:286.8,y:290}, initialSlot:13, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"one", color:2, playerType:1, homePosition:{x:225,y:26}, initialSlot:25, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"two", color:2, playerType:1, homePosition:{x:86.8,y:26}, initialSlot:25, colorSlot:0, boardSlot:0, finished:0,dieOne:0, dieTwo:0, move:0},
    {token:"four", color:2, playerType:1, homePosition:{x:225,y:90}, initialSlot:25, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"two", color:2, playerType:1, homePosition:{x:86.8,y:90}, initialSlot:25, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"one", color:3, playerType:1, homePosition:{x:25,y:26}, initialSlot:37, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"two", color:3, playerType:1, homePosition:{x:86.8,y:26}, initialSlot:37, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"three", color:3, playerType:1, homePosition:{x:25,y:90}, initialSlot:37, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"four", color:3, playerType:1, homePosition:{x:86.8,y:90}, initialSlot:37, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
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
const  rsafespace = [1,7,10,13,19,22,25,31,34,37,43,46];
const dicenum = ["one","two","three","four","five","six"];
var rcolors = ["blue", "yellow","red","green"];
var turn_color = 0

var dieone;
var dietwo;
var player;
var sum = 0;
var rblockedposition = [];
var count = 3;
game(count);

function game(count){
    player = tokens.filter(player => player.color == count);
    console.log(`It's player ${player[0].color} turn`);
    rollthedice();
    console.log(dieone)
    console.log(dietwo)
    checkFive();
    options();
    var thisToken = tokens.find(token => token.dieOne > 0 && token.boardSlot != 0 || token.dieTwo > 0 && token.boardSlot != 0);
    // sum = 0;
    // player.forEach(token => sum += token.dieOne + token.dieTwo);
    if (thisToken) {
        if(thisToken.dieOne > 0){
            thisToken.move = thisToken.dieOne;
            thisToken.dieOne = 0;
            move();
        }else{
            thisToken.move = thisToken.dieTwo;
            thisToken.dieTwo = 0;
            move();

        }
        console.table(tokens);
    }else{
        console.table(tokens);
        console.log(`No more moves, nextplayer`)
        // console.log(count);
        // if(count>0){
        //     count -= 1;
        //     game(count);
        // }
    }
}

function whostarts(){
    players = tokens.filter(token => token.token== "one");
    var results = []
    players.forEach(player =>(
        rollthedice(),
        player.move = dieone + dietwo,
        results.push(player.move))
        // $("#"+players[i]+"diceone").html(`<i class="fas fa-dice-${dicenum[dieone[i]-1]} dice"></i>`);
        // $("#"+players[i]+"dicetwo").html(`<i class="fas fa-dice-${dicenum[dietwo[i]-1]} dice"></i>`);
    );
    resultSorted = results.sort(function(a, b){return b-a});
    var winners = players.filter(player => player.move == resultSorted[0]);
    console.log(winners);
    if (winners.length > 1){
        console.log(results);
        console.log(`Restarting`);
        whostarts();
    }else{
        var winner = winners[0].color;
        console.log(results);
        console.log(`The winner is ${winner}`);
        tokens.map(token => token.move = 0);
        game(winner)
    }
    return;
}

function rollthedice() { 
    dieone =  Number(Math.floor(Math.random()*6+1));
    dietwo =  Number(Math.floor(Math.random()*6+1));
    player.map(token => (token.dieOne = dieone, token.dieTwo = dietwo));
    return;
}

function checkFive() {
    var leavingTokens = player.filter(token => token.dieOne+token.dieTwo == 5 || token.dieOne == 5 || token.dieTwo == 5).length
    console.log(leavingTokens)
    if(leavingTokens > 0){
        var sum = 0;
        player.forEach(token => sum += token.dieOne + token.dieTwo);
        if (sum>0){
            var initialSlot = player[0].initialSlot;
            var noBlock = tokens.filter(token => token.boardSlot == initialSlot).length < 2;
            var otherBlock = tokens.find(token => token.boardSlot == initialSlot && token.color != turn_color);
            var myBlock = player.filter(mytoken => mytoken.boardSlot == initialSlot).length == 2;
            thisToken =  player.find(token => token.dieOne > 0 || token.dieTwo > 0&& token.boardSlot == 0);
            if (noBlock){
                // if(thisToken){
                    console.log(`Leave home`);
                    leavehome(thisToken);
                    whoishere(thisToken.color, thisToken.token);
                    checkFive();
            }else{
                if(myBlock){
                    console.log(`It's blocked by myself, showing other options`);
                }else{
                    if(otherBlock){
                        console.log(`Leave home`);
                        leavehome(thisToken);
                        console.log(`Sending another player home`);
                        sendhome(otherBlock);
                        checkFive();
                    }
                }
            }
        }else{
            console.log("No fives, going to options");
        }
    }else{
        console.log("No fives, going to options");
        homeTokens = player.filter(token =>token.boardSlot == 0)
        homeTokens.map(token =>(
            token.dieOne = 0,
            token.dieTwo = 0
            )
        );
    }
}

function options() {
    player.forEach(token => sum += token.dieOne + token.dieTwo);
    if (sum>0){
        for (token of player){
            var x =  rblockedposition.find(pos => pos > token.boardSlot && pos <= token.boardSlot + dieone);
            var y =  rblockedposition.find(pos => pos > token.boardSlot && pos <= token.boardSlot + dietwo);
            if(x || token.colorSlot + token.dieOne > lastSlot || token.colorSlot == 0 ||  token.dieOne == 0){
                // console.log(`Token ${token.token} at position ${token.boardSlot} can NOT move with ${dieone} because the position ${x} is blocked`);
            }else{
                // console.log(`Token ${token.token} at position ${token.boardSlot} can move with ${dieone} because the will stop before a blocked position`);
            }
            if(y || token.colorSlot + token.dieTwo > lastSlot ||  token.colorSlot == 0 ||  token.dieTwo == 0){
                // console.log(`Token ${token.token} at position ${token.boardSlot} can NOT move with ${dietwo} because the position ${y} is blocked`);
            }else{
                // console.log(`Token ${token.token} at position ${token.boardSlot} can move with ${dietwo} because the will stop before a blocked position`);
            }
        }
        return;
    }
    return;
}

function move(){
    // vthisToken = tokens.find(token => token.dieOne > 0 || token.dieTwo > 0)
    console.log(`Token ${thisToken.token} will move`)
    var blockedSpace = rsafespace.includes(thisToken.boardSlot);
    if(blockedSpace){
        var otherToken = tokens.find(otherToken => otherToken.boardSlot == thisToken.boardSlot && otherToken != thisToken);
        unblockspace(thisToken, otherToken, thisToken.boardSlot);
    }
    while (thisToken.move > 0 ){
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
        if(thisToken.move == 0){
            position = thisToken.boardSlot;
            console.log(`Player ${thisToken.color}, token ${thisToken.token}: Actual position is ${thisToken.boardSlot} and there is ${thisToken.move} moves left`);
            console.log(`Coordinates are ${board[position].x} and ${board[position].y}`)
            whoishere(thisToken.color, thisToken.token);
            checkFive();
        }
    }
    return;
}

function whoishere(color, token){
    console.log('Who is here');
    var thisToken = tokens.find(thistoken => thistoken.color == color && thistoken.token == token);
    var boardSlot = thisToken.boardSlot;
    var otherToken = tokens.find(otherToken => otherToken.boardSlot == boardSlot && otherToken != thisToken);
    var safeSlot = rsafespace.includes(boardSlot);
    if (otherToken){
        if(safeSlot) {
            console.log(`Blocking space, safeplace`);
            blockspace(thisToken, otherToken, boardSlot);
        }else{
            if(otherToken.color == color){
            console.log(`Blocking space, same color`);
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
    console.table(tokens);
    return;
}

function sendhome(otherToken){
    console.log(`sendding home`)
    otherToken.colorSlot = 0;
    otherToken.boardSlot = 0;
    var xPosition = otherToken.homePosition.x;
    var yPosition = otherToken.homePosition.y;
    console.log(otherToken,xPosition,yPosition);
    return;
}

function blockspace(thisToken, otherToken, boardSlot){
    console.log(thisToken);
    console.log(otherToken);
    rblockedposition.push(boardSlot);
    return;
}

function unblockspace(thisToken, otherToken, boardSlot){
    console.log(`Unblocking space`);
    console.log(thisToken);
    console.log(otherToken);
    rblockedposition.splice(rblockedposition.indexOf(boardSlot),1)
    return;
}

function leavehome(thisToken) {
    thisToken.boardSlot = thisToken.initialSlot
    thisToken.colorSlot = 1
    xPosition = board[thisToken.initialSlot].x
    yPosition = board[thisToken.initialSlot].y
    if (thisToken.dieOne == 5){
        player.map(token => token.dieOne = 0);
        return;
    }
    if (thisToken.dieTwo == 5){
        player.map(token => token.dieTwo = 0)
        return;
    }
    if (thisToken.dieOne  + thisToken.dieTwo == 5){
        player.map(token => (token.dieOne = 0, token.dieTwo = 0))
        return;
    }
    return;
}

