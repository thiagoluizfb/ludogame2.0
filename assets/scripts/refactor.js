var tokens = [
    {token:"one0", color:0, playerType:1, homePosition:{x:25,y:226}, initialSlot:1, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"two0", color:0, playerType:1, homePosition:{x:86.8,y:226}, initialSlot:1, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"three0", color:0, playerType:1, homePosition:{x:25,y:290}, initialSlot:1, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"four0", color:0, playerType:1, homePosition:{x:86.8,y:290}, initialSlot:1, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"one1", color:1, playerType:1, homePosition:{x:225,y:226}, initialSlot:13, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"two1", color:1, playerType:1, homePosition:{x:286.8,y:226}, initialSlot:13, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"three1", color:1, playerType:1, homePosition:{x:225,y:290}, initialSlot:13, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"four1", color:1, playerType:1, homePosition:{x:286.8,y:290}, initialSlot:13, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"one2", color:2, playerType:1, homePosition:{x:225,y:26}, initialSlot:25, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"two2", color:2, playerType:1, homePosition:{x:286.8,y:26}, initialSlot:25, colorSlot:0, boardSlot:0, finished:0,dieOne:0, dieTwo:0, move:0},
    {token:"four2", color:2, playerType:1, homePosition:{x:225,y:90}, initialSlot:25, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"two2", color:2, playerType:1, homePosition:{x:86.8,y:90}, initialSlot:25, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"one3", color:3, playerType:1, homePosition:{x:25,y:26}, initialSlot:37, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"two3", color:3, playerType:1, homePosition:{x:86.8,y:26}, initialSlot:37, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"three3", color:3, playerType:1, homePosition:{x:25,y:90}, initialSlot:37, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
    {token:"four3", color:3, playerType:1, homePosition:{x:86.8,y:90}, initialSlot:37, colorSlot:0, boardSlot:0, finished:0, dieOne:0, dieTwo:0, move:0},
]

const board = [ {x:0,y:0}, {x:55,y:180},{x:80,y:180},{x:105,y:180},{x:130,y:180},{x:130,y:205},{x:130,y:230},{x:130,y:255},{x:130,y:280},{x:130,y:305},{x:155,y:305},
                {x:180,y:305},{x:180,y:280},{x:180,y:255},{x:180,y:230},{x:180,y:205},{x:180,y:180},{x:205,y:180},{x:230,y:180},{x:255,y:180},{x:280,y:180},
                {x:305,y:180},{x:305,y:155},{x:305,y:130},{x:280,y:130},{x:255,y:130},{x:230,y:130},{x:205,y:130},{x:180,y:130},{x:180,y:105},{x:180,y:80},
                {x:180,y:55},{x:180,y:30},{x:180,y:5},{x:155,y:5},{x:130,y:5},{x:130,y:30},{x:130,y:55},{x:130,y:80},{x:130,y:105},{x:130,y:130},{x:105,y:130},
                {x:80,y:130},{x:55,y:130},{x:30,y:130},{x:5,y:130},{x:5,y:155},{x:5,y:180},{x:30,y:180}
            ];

const finalLanes = [
    [{x:5,y:155},{x:30,y:155},{x:55,y:155},{x:80,y:155},{x:105,y:155},{x:130,y:155}],
    [{x:155,y:180},{x:155,y:205},{x:155,y:230},{x:155,y:255},{x:155,y:280},{x:155,y:305}],
    [{x:305,y:155},{x:280,y:155},{x:255,y:155},{x:230,y:155},{x:205,y:155},{x:180,y:155}],
    [{x:155,y:5},{x:155,y:30},{x:155,y:55},{x:155,y:80},{x:155,y:105},{x:155,y:155}]
]

const lastSlot = 51;
const  rsafespace = [1,7,10,13,19,22,25,31,34,37,43,46];
const dicenum = ["one","two","three","four","five","six"];
var rcolors = ["blue", "yellow","red","green"];
var finishedPlayers = [];
var turn_color = 0

var dieone;
var dietwo;
var player;
var sum;
var doubledice = 0;
var rblockedposition = [];
game(0);

function game(color){
    finished = 0
    tokens.forEach(token => finished += token.finished);
    console.log(`Finished players ${finishedPlayers.length}`)
    if (finishedPlayers.length == 4){
        console.log(`Game over`);
        console.log(finishedPlayers);
        return;
    }
    finished = 0
    console.log(`Count is ${color}`);
    player = tokens.filter(player => player.color == color);
    player.forEach(token => finished += token.finished);
    thisToken = player[0]
    if (finished == 4){
        nextplayer(color);
        return;
    }
    console.log(`It's player ${color} turn`);
    $("#layer").off("click");
    $(`#dice${color}`).css("z-index","3");
    $(`#diceone${color}`).addClass("pulseshadow");
    $(`#dicetwo${color}`).addClass("pulseshadow");
    $(`#dice${color}`).one("click",function() {
        rollthedice(color);
        $(`#diceone${color}`).removeClass("pulseshadow");
        $(`#dicetwo${color}`).removeClass("pulseshadow");
        console.log(dieone);
        console.log(dietwo);
        if(dieone == dietwo){
            console.log(doubledice);
            doubledice += 1;
            $(`#dice${color}`).find(`i`).css("color","gold");
            if (doubledice == 3){
                doubledice = 0;
                setTimeout(()=>{sendhome(thisToken, color);},200);
                return;
            }else{
                player.map(token => (token.dieOne = dieone, token.dieTwo = dietwo));
                setTimeout(()=>{checkFive(color);},200);
                return;
            }
        }else{
            $(`#dice${color}`).find(`i`).css("color","none");
            doubledice = 0;
            player.map(token => (token.dieOne = dieone, token.dieTwo = dietwo));
            setTimeout(()=>{checkFive(color);},200);
            return;
        }
    });
    return;
}

function whostarts(){
    players = tokens.filter(token => token.token == "one");
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
        return;
    }else{
        var winner = winners[0].color;
        console.log(results);
        console.log(`The winner is ${winner}`);
        tokens.map(token => token.move = 0);
        game(winner);
        return;
    }
}

function rollthedice(color) {
    dice.play();
    dieone = Number(Math.floor(Math.random()*6+1));
    dietwo = Number(Math.floor(Math.random()*6+1));
    $(`#diceone${color}`).html(`<i class="fas fa-dice-${dicenum[dieone-1]} dice"></i>`);
    $(`#dicetwo${color}`).html(`<i class="fas fa-dice-${dicenum[dietwo-1]} dice"></i>`);
    return;
}

function checkFive(color) {
    var leavingTokens = player.filter(token => (token.dieOne+token.dieTwo == 5 || token.dieOne == 5 || token.dieTwo == 5) && (token.boardSlot == 0) && (token.finished == 0)).length
    console.table(player)
    console.log(`Tokens leaving ${leavingTokens}`)
    if(leavingTokens > 0){
        sum = 0;
        player.forEach(token => sum += token.dieOne + token.dieTwo);
        if (sum>0){
            var initialSlot = player[0].initialSlot;
            var noBlock = tokens.filter(token => token.boardSlot == initialSlot).length < 2;
            var otherBlock = tokens.find(token => token.boardSlot == initialSlot && token.color != color);
            var myBlock = player.filter(mytoken => mytoken.boardSlot == initialSlot).length == 2;
            thisToken =  player.find(token => (token.dieOne > 0 || token.dieTwo > 0) && token.boardSlot == 0);
            if (noBlock){
                    console.log(`Leave home`);
                    leavehome(thisToken);
                    return;
            }else{
                if(myBlock){
                    console.log(`It's blocked by myself, showing other options`);
                    options(color);
                    return;
                }else{
                    if(otherBlock){
                        console.log(`Leave home`);
                        leavehome(thisToken);
                        console.log(`Sending another player home`);
                        return;
                    }
                }
            }
        }else{
            console.log("No fives, going to options");
            options(color);
            return;
        }
    }else{
        console.log("No tokens leaving, going to options");
        homeTokens = player.filter(token => token.boardSlot == 0)
        homeTokens.map(token =>(
            token.dieOne = 0,
            token.dieTwo = 0
            )
        );
        options(color);
        return;
    }
}

function options(color) {
    $("#dicemoveone").off("click");
    $("#dicemovetwo").off("click");
    sum = 0;
    player.forEach(token => sum += token.dieOne + token.dieTwo);
    console.log(`Sum is ${sum}`);
    console.log(rblockedposition);
    if (sum>0){
        for (token of player){
            var x =  rblockedposition.find(pos => pos > token.boardSlot && (pos <= token.boardSlot + token.dieOne));
            var y =  rblockedposition.find(pos => pos > token.boardSlot && (pos <= token.boardSlot + token.dieTwo));
            if(x || (token.colorSlot + token.dieOne > lastSlot)){
            // console.log(`Token ${token.token} at position ${token.boardSlot} can NOT move with ${dieone} because the position ${x} is blocked`);
                sum -= token.dieOne;
                if(token.boardSlot !=0){
                    token.dieOne = 0;
                }
            }
            // console.log(`Token ${token.token} at position ${token.boardSlot} can move with ${dieone} because the will stop before a blocked position`);
            if(y || (token.colorSlot + token.dieTwo > lastSlot)){
                    // console.log(`Token ${token.token} at position ${token.boardSlot} can NOT move with ${dietwo} because the position ${y} is blocked`);
                sum -= token.dieTwo;
                if(token.boardSlot !=0){
                    token.dieTwo = 0;
                }
            }
        }
        // console.log(`Token ${token.token} at position ${token.boardSlot} can move with ${dietwo} because the will stop before a blocked position`);
    console.log(`Sum is now ${sum}`);
    if(sum>0){
        setTimeout(()=>{activatedice(color)},200);
        return;
    }else{
        nextplayer(color);
        return;
    }
    }else{
        console.log(`No more moves, next player!`)
        console.table(tokens);
        finished = 0
        player.forEach(token =>
            token.dieOne = 0,
            token.dieTwo = 0,
            finished += token.finished
        );
        if (finished == 4){
            console.log(`This player ${color} finished`)
            if(finishedPlayers.includes(color) == false){
                finishedPlayers.push(color);
                nextplayer(color);
            }else{
                nextplayer(color);
                return;
            }
        }else{
            nextplayer(color);
            return;
        }
    }
    console.table(player);

}

function activatedice(color){
    console.log(`Activating dice`);
    for (token of player) {
        if (token.boardSlot > 0){
            if (token.dieOne == 0) {
                if (token.dieTwo != 0){
                    $(`#${token.token}`).find(".innerToken").html(`${token.dieTwo}<div class="chooseme"></div>`);
                    $(`#${token.token}`).css("z-index","3");
                }
            }else{
                if (token.dieTwo != 0){
                    $(`#${token.token}`).find(".innerToken").html(`${token.dieOne},${token.dieTwo}<div class="chooseme"></div>`);
                }else{
                    $(`#${token.token}`).find(".innerToken").html(`${token.dieOne}<div class="chooseme"></div>`);
                }
                $(`#${token.token}`).css("z-index","3");
            }
        }
    }
    $(`.tokenwrapper${color}`).one("click",function(){
        console.log($(this).parent().attr("id"));
        thisToken = player.find(token => token.token == $(this).parent().attr("id"));
        console.log(thisToken);
        myposition = $(this).parent().position();
        xposition = Math.trunc(myposition.left);
        yposition = Math.trunc(myposition.top);
        player.forEach(token =>
            $(`#${token.token}`).find(".innerToken").empty(),
            $(`#${token.token}`).children().off("click")
        )
        $(this).parent().css("z-index","1");
        if(thisToken.dieOne > 0){
            $("#dicemoveone").show();
        }else{
            $("#dicemoveone").hide();
        };
        if(thisToken.dieTwo > 0){
            $("#dicemovetwo").show();
        }else{
            $("#dicemovetwo").hide();
        };
        $("#dicewrapper").show();
        $("#dicewrapper").css("z-index","3");
        $("#dicemoveone").css("z-index","3");
        $("#dicemovetwo").css("z-index","3");
        $("#dicemoveone").html(thisToken.dieOne);
        $("#dicemovetwo").html(thisToken.dieTwo);
        $("#dicewrapper").css("left", xposition-20);
        $("#dicewrapper").css("top", yposition-40);
        $("#layer").one("click",function(){
            $("#dicemoveone").off("click");
            $("#dicemovetwo").off("click");
            $("#dicewrapper").hide();
            activatedice(color);
            return;
        });
        return;
    });
    $("#dicemoveone").one("click", function(){
        $("#layer").off("click");
        $("#dicewrapper").hide();
        thisToken.move = thisToken.dieOne;
        player.map(token => token.dieOne = 0);
        move(thisToken);
        return;
    });
    $("#dicemovetwo").one("click",function(){
        $("#layer").off("click");
        $("#dicewrapper").hide();
        thisToken.move = thisToken.dieTwo;
        player.map(token => token.dieTwo = 0);
        move(thisToken);
        return;
    });
    return;
}

function nextplayer(color){
    if (doubledice>0){
        game(color);
        return;
    }else{
        if (color == 3){
            color = 0;
            game(color);
            return;
        }else{
            color += 1;
            game(color);
            return;
        }
    }
}

function move(thisToken){
    console.log(`Token ${thisToken.token} will move`)
    player.forEach(token => 
        $(`#${token.token}`).find(".innerToken").empty()
    );
    var blockedSpace = rblockedposition.includes(thisToken.boardSlot);
    if(blockedSpace){
        console.log(`Blocked space is ${blockedSpace}`);
        var otherToken = tokens.find(otherToken => otherToken.boardSlot == thisToken.boardSlot && otherToken != thisToken);
        unblockspace(thisToken, otherToken, thisToken.boardSlot);
    }
    var time = (thisToken.move)*200;
    while (thisToken.move > 0 ){
        if(thisToken.colorSlot > 46){
            var position = thisToken.colorSlot-47;
            $(`#${thisToken.token}`).animate({left: `${finalLanes[thisToken.color][position].x}px`,top: `${finalLanes[thisToken.color][position].y}px`,position: "absolute"},200);
            $(`#${thisToken.token}`).css({left: `${finalLanes[thisToken.color][position].x}px`,top: `${finalLanes[thisToken.color][position].y}px`,position: "absolute"});
            // console.log(`Player ${thisToken.color}, token ${thisToken.token}: Actual position is ${thisToken.boardSlot} and there is ${thisToken.move} moves left`);
            // console.log(`Coordinates are ${finalLanes[thisToken.color][position].x} and ${finalLanes[thisToken.color][position].y}`)
        }else{
            var position = thisToken.boardSlot;
            $(`#${thisToken.token}`).animate({left: `${board[position].x}px`,top: `${board[position].y}px`,position: "absolute"},200);
            $(`#${thisToken.token}`).css({left: `${board[position].x}px`,top: `${board[position].y}px`,position: "absolute"});
            // console.log(`Player ${thisToken.color}, token ${thisToken.token}: Actual position is ${thisToken.boardSlot} and there is ${thisToken.move} moves left`);
            // console.log(`Coordinates are ${board[position].x} and ${board[position].y}`)
        }
        thisToken.boardSlot += 1;
        thisToken.colorSlot += 1;
        thisToken.move -= 1;
        if (thisToken.boardSlot == 49 && thisToken.color != 0 && thisToken.colorSlot < 46){
            thisToken.boardSlot=1;
        }
    }
    setTimeout(()=>{
        if(thisToken.move == 0){        
            if (thisToken.colorSlot == lastSlot){
                thisToken.finished = 1
                thisToken.dieOne = 0;
                thisToken.dieTwo = 0;
                thisToken.colorSlot = 0;
                thisToken.boardSlot = 0;
                console.log(`This token has finished`);
                checkFive(thisToken.color);
                return;
            }
            if(thisToken.colorSlot < 46){
                position = thisToken.boardSlot;
                $(`#${thisToken.token}`).animate({left: `${board[position].x}px`,top: `${board[position].y}px`,position: "absolute"},200);
                $(`#${thisToken.token}`).css({left: `${board[position].x}px`,top: `${board[position].y}px`,position: "absolute"});
                setTimeout(()=>{whoishere(thisToken.color, thisToken.token);},200);
                return;
                //console.log(`Player ${thisToken.color}, token ${thisToken.token}: Actual position is ${position} and there is ${thisToken.move} moves left`);
                //console.log(`Coordinates are ${board[position].x} and ${board[position].y}`)
            }else{
                position = thisToken.colorSlot-46;
                $(`#${thisToken.token}`).animate({left: `${finalLanes[thisToken.color][position].x}px`,top: `${finalLanes[thisToken.color][position].y}px`,position: "absolute"},200);
                $(`#${thisToken.token}`).css({left: `${finalLanes[thisToken.color][position].x}px`,top: `${finalLanes[thisToken.color][position].y}px`,position: "absolute"});
                setTimeout(()=>{whoishere(thisToken.color, thisToken.token);},200);
                return;
                //console.log(`Player ${thisToken.color}, token ${thisToken.token}: Actual position is ${position} and there is ${thisToken.move} moves left`);
                //console.log(`Coordinates are ${finalLanes[thisToken.color][position].x} and ${finalLanes[thisToken.color][position].y}`)
            }
        }
        },time);
    return;
}

function whoishere(color, token){
    console.log('Who is here');
    var thisToken = tokens.find(thistoken => thistoken.color == color && thistoken.token == token);
    var boardSlot = thisToken.boardSlot;
    var otherToken = tokens.find(otherToken => otherToken.boardSlot == boardSlot && otherToken != thisToken && otherToken.colorSlot < 46 && otherToken.finished == 0);
    var safeSlot = rsafespace.includes(boardSlot);
    if (otherToken){
        if(safeSlot) {
            console.log(`Blocking space, safeplace`);
            blockspace(thisToken, otherToken, boardSlot);
            return;
        }else{
            if(otherToken.color == color){
            console.log(`Blocking space, same color`);
                blockspace(thisToken, otherToken, boardSlot);
                return;
            }else{
                if(thisToken.colorSlot > 46){
                    checkFive(color);
                    return;
                }else{
                    console.log(`Sending player ${otherToken.color} token ${otherToken.token} home`)
                    sendhome(otherToken, color);
                    return;
                }
            }  
        }
    }else{
        checkFive(color);
        return;
    }
}

function sendhome(otherToken, color){
    console.log(`Sending home`)
    otherToken.colorSlot = 0;
    otherToken.boardSlot = 0;
    var xPosition = otherToken.homePosition.x;
    var yPosition = otherToken.homePosition.y;
    $(`#${otherToken.token}`).animate({left: `${xPosition}px`,top: `${yPosition}px`,position: "absolute"},200);
    $(`#${otherToken.token}`).css({left: `${xPosition}px`,top: `${yPosition}px`,position: "absolute"});
    console.log(otherToken,xPosition,yPosition);
    setTimeout(()=>{checkFive(color);},200);
    return;
}

function blockspace(thisToken, otherToken, boardSlot){
    console.log(`Blocking space`);
    console.log(thisToken);
    console.log(otherToken);
    rblockedposition.push(boardSlot);
    if (boardSlot == 1) {
        rblockedposition.push(49);
    }
    setTimeout(()=>{checkFive(thisToken.color);},200);
    return;
}

function unblockspace(thisToken, otherToken, boardSlot){
    console.log(`Unblocking space`);
    console.log(thisToken);
    console.log(otherToken);
    rblockedposition.splice(rblockedposition.indexOf(boardSlot),1);
    if(boardSlot == 1){
        rblockedposition.splice(rblockedposition.indexOf(49),1);
    }
    return;
}

function leavehome(thisToken) {
    thisToken.boardSlot = thisToken.initialSlot;
    thisToken.colorSlot = 1;
    xPosition = board[thisToken.initialSlot].x;
    yPosition = board[thisToken.initialSlot].y;
    $(`#${thisToken.token}`).animate({left: `${xPosition}px`,top: `${yPosition}px`,position: "absolute"},200);
    $(`#${thisToken.token}`).css({left: `${xPosition}px`,top: `${yPosition}px`,position: "absolute"});
    if (thisToken.dieOne == 5){
        player.map(token => token.dieOne = 0);
        whoishere(thisToken.color, thisToken.token);
        return;
    }
    if (thisToken.dieTwo == 5){
        player.map(token => token.dieTwo = 0);
        whoishere(thisToken.color, thisToken.token);
        return;
    }
    if (thisToken.dieOne  + thisToken.dieTwo == 5){
        player.map(token => (token.dieOne = 0, token.dieTwo = 0));
        whoishere(thisToken.color, thisToken.token);
        return;
    }
    return;
}

