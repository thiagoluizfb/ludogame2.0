$(".board").hide();
$("#players").hide();
$("#start").show();
$(".back").hide();
$("#startgame").hide();
$(".selecttype").hide();

let playing = 0; // 1 => Game started
let playerSelected = 0; // If 0, number of players was not selected

/* Interval set to guarantee the responsiveness of the layout, it takes the dimensions of the screen
and calculate the best zoom and positioning to fit the board at the center of the screen, the same with
the game main menu*/

setInterval(() => {

    if($(window).height() < 425){
        $(".board").hide();
        $("#start").hide();
        $("#players").hide();
    }else{
        if(playing == 1){
            $(".board").show();
        }else{
            $(".board").hide();
        }
    }

    mx = Math.min(0.9*$(window).width()-425,0.9*$(window).height()-425);
    z = (375+mx/2)/375;
    
    if ($(window).width() < 325){
        z = 0.75;
    }

    //$(".mainlayer").html(z);
    $( ".board" ).css("zoom", `${(z)}`);
    $( ".board" ).css("margin", `${($(window).height()-$("body").height()*z)/2}px auto`);
    $( "#start" ).css("zoom", `${(z)}`);
    $("#start").css("margin", `${($(window).height()-$("#start").height()*z)/2}px auto`);
    $( "#players" ).css("zoom", `${(z)}`);
    $("#players").css("margin",  `${($(window).height()-$("#players").height()*z)/2}px auto`);

}, 1);


/*Main tokens' characteristics which functions will determine which player and token it is reffering to*/
let colors = ["blue","yellow","red","green"];
let token = ["One","Two","Three","Four"];
let robot = [0,0,0,0];
let thistoken = 0;
let players = [];

/*Position and relative position of the token inside the board (left and top relative positions)*/
let redleft = [255,	230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,280,255,230,205,180];
let redtop = [130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,155,155,155,155,155];
let blueleft = [55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,30,55,80,105,130];
let bluetop = [180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,155,155,155,155,155];
let greenleft = [130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,155,155,155,155,155];
let greentop = [55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,30,55,80,105,130];        
let yellowleft = [180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,155,155,155,155,155];
let yellowtop = [255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,280,255,230,205,180];
let initleft = [[25,86.8,25,86.8],[225,286.8,225,286.8],[225,286.8,225,286.8],[25,86.8,25,86.8]];
let inittop = [[226,226,290,290],[226,226,290,290],[26,26,90,90],[26,26,90,90]];

/*Relative to tokens' moves around the board*/
var moveleft = 0;
var position = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; //position of each token of each color (starts with 1 when to token leaves the HQ)
var reposition = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; //relative position of each token of each color (equal to numbers in the board)
var xposition = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; //left position of each token of each color
var yposition = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; //top position of each token of each color
var remainToMove = 2; //to be reduced 1 unit always when one of the dice is used

/*Define the token condition after or before leaving its HQ and when it reaches the end*/
var tokensathome = [4,4,4,4]; //to be reduced 1 unit always when one token leaves the HQ
var tokensatend = [0,0,0,0]; //to be increased 1 unit always when one token reaches the last position
var out = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; // 0 => token at the HQ, 1 => token is outside

/*Define the result of each pair of dice of each player*/
var rollone = [0,0,0,0];
var rolltwo = [0,0,0,0];
var dieone = [0,0,0,0];
var dietwo = [0,0,0,0];
var results = [0,0,0,0];

/*Identify if a token is allowed to move or not against a specific die*/
var blockedposition = []; //Every relative position is pushed when a space is blocked
var lastblockedposition = [[],[],[],[]]; //Every relative position is pushed when a space in the last lane is blocked (used to try to fix a bug in the blocked function)
let safespace = [1,7,10,13,19,22,25,31,34,37,43,46]; //Relative position that a token cannot be hit and sent home, unless it is blocking the exit of the HQ of another token
var tokenblocked = [ [[0,0],[0,0],[0,0],[0,0]] , [[0,0],[0,0],[0,0],[0,0]], [[0,0],[0,0],[0,0],[0,0]], [[0,0],[0,0],[0,0],[0,0]] ]; //1 => Token blocked, 0 => not blocked, For each die for each token for each player

/*Game sound effects*/
let dice = new Audio('assets/audio/rollingdice.wav');
let tokenMoving = new Audio('assets/audio/tokenmoving.wav');
let turn = new Audio('assets/audio/yourturn.wav');
let selected = new Audio('assets/audio/select.wav');
let start = new Audio('assets/audio/start.wav');


/*Function activated if the 2 players is selected in the main menu*/
$("#twoplayers").on("click", function choose() {
    players = [];
    players.push("blue");
    players.push("red");
    $(`.fourplayers`).hide();
    $(`#greendice`).hide();
    $(`#yellowdice`).hide();
    $("#fourplayers").removeClass("playersnumber");
    $("#twoplayers").addClass("playersnumber");
    selected.play();
    playerSelected = 1;
    return; 
});

/*Function activated if the 4 players is selected in the main menu*/
$("#fourplayers").on("click", function choose() {
    players=[];
    players.push("blue");
    players.push("yellow");
    players.push("red");
    players.push("green");
    $(`.fourplayers`).show();
    $(`#greendice`).show();
    $(`#yellowdice`).show();
    $("#twoplayers").removeClass("playersnumber");
    $("#fourplayers").addClass("playersnumber");
    selected.play();
    playerSelected = 1;
    return;
});

/*Function activated when the number of players is selected and call the type of players menu*/
$("#next").on("click", function choose() {
    if(playerSelected == 1){
        $(this).hide();
        $("#startgame").show();
        $(".back").show();
        $(".selectplayers").toggle();
        $(".selecttype").show();
        selected.play();
    }else{
        alert("Select the number of players");
    }
    return; 
});

/*Function activated to go back to choose the number of players menu*/
$(".back").on("click",function choose() {
    $(this).hide();
    $("#next").show();
    $("#startgame").hide();
    $(".selectplayers").toggle();
    $(".selecttype").hide();
    selected.play();
    return; 
});

/*Function activated when type of player is selected to highlight the chosen one and
deselects the opposite choice for each color*/
for(n=0;n<4;n++){
    
    let r = ["bluehuman","yellowhuman","redhuman","greenhuman"];

    $(`#${colors[n]}human`).on("click", function human() {
       selected.play();
       $(this).addClass(`playersnumber`);
       $(this).siblings().removeClass(`playersnumber`);
       if(players.length == 2){ 
           if(r.indexOf($(this).attr("id")) == 2 ){
               robot[r.indexOf($(this).attr("id"))-1] = 0;
           }else{
               robot[r.indexOf($(this).attr("id"))] = 0;
           }
       }else{
           robot[r.indexOf($(this).attr("id"))] = 0;
       }
    });

    $(`#${colors[n]}bot`).on("click",function bot() {
        selected.play();
        $(this).addClass(`playersnumber`);
        $(this).siblings().removeClass(`playersnumber`);
        if(players.length == 2){ 
           if(r.indexOf($(this).siblings().attr("id")) == 2 ){
               robot[r.indexOf($(this).siblings().attr("id"))-1] = 1;
           }else{
               robot[r.indexOf($(this).siblings().attr("id"))] = 1;
           }
        }else{
           robot[r.indexOf($(this).siblings().attr("id"))] = 1;
        }
    });
}

/*Function to show the "choose the number of players" menu*/
$("#play").on("click",function starts(){
    selected.play();
    $("#start").hide();
    $("#players").show();
    return;
});

/*Function to hide the main menu and start the game*/
$("#startgame").on("click",function starts(){ 
    start.play();
    $(".board").show();
    $(this).hide();
    $("#players").hide();
    $("#layer").css("background-image","none");

    playing = 1;
    let i = 0;

    setTimeout(() => {
        whostarts(i);
        return;
    }, 1000); 
    return;
});

/*Function to shuffle all the four dice and to decide who will start playing.
If there is two or more dice with the same result, it will call the function
again until there is only one higher result. This would be the color that will start the game*/
function whostarts(i){
    dice.play();
   
    d = 0;
    dicenum = ["one","two","three","four","five","six"];
    roll = setInterval(rolling,1);

    /*Function to show animation in the dice shuffling set rollone and rolltwo to difer from the actual result and fix bug*/
    function rolling(){ 
        rollone[i] = Number(Math.floor(Math.random()*6+1));
        rolltwo[i] = Number(Math.floor(Math.random()*6+1));
        $("#"+players[i]+"diceone").html(`<i class="fas fa-dice-${dicenum[rollone[i]-1]} dice"></i>`);
        $("#"+players[i]+"dicetwo").html(`<i class="fas fa-dice-${dicenum[rolltwo[i]-1]} dice"></i>`);
        if(d == 25){
            dieone[i] = Number(Math.floor(Math.random()*6+1));
            dietwo[i] = Number(Math.floor(Math.random()*6+1));
            $("#"+players[i]+"diceone").html(`<i class="fas fa-dice-${dicenum[dieone[i]-1]} dice"></i>`);
            $("#"+players[i]+"dicetwo").html(`<i class="fas fa-dice-${dicenum[dietwo[i]-1]} dice"></i>`);
            results[i] = dieone[i] + dietwo[i];
            clearInterval(roll);
            return;
        };
        d++;
    };
    
    /*Function to define who starts*/
    setTimeout(function(){

        $("#"+players[i]+"dice").css("z-index","1");

        if(i < players.length-1){
            whostarts(i+1);
            return;
        };

        if (i == players.length-1){
            
            /*Function to decide if there are two value as the highest or start the game*/
            setTimeout(function(){
                alert(results);
                winner = Array.from(results);
                winner.sort(function(a, b){return b-a});

                if (winner[0]===winner[1]){
                    let i = 0;
                    whostarts(i);
                    return;                    
                }else{
                    i = results.indexOf(winner[0]);
                    $("#"+players[results.indexOf(winner[0])]+"dice").css("z-index","3");
                    setTimeout(function(){alert (players[i] + "  starts!")},100);
                }

                doubledice = 0;
                game(i);
                return;

            },1000);
        };
    },1000);
    return;
}

/*Function called to start the turn of each player and attribute the x and y coordinates to
the token color; The function rollthedice is called if there are tokens to play*/
function game(i){

    setTimeout(() => {

        if(tokensatend[i]<4){

            turn.play();
            remainToMove = 2;
            $("#dicemoveone").show();
            $("#dicemovetwo").show();
            $("#"+players[i]+"diceone").addClass("pulseshadow");
            $("#"+players[i]+"dicetwo").addClass("pulseshadow");
            $("#layer").off("click");
            $("#"+players[i]+"dice").css("z-index","3");
            
            if(players[i] == "blue"){
                x = blueleft;
                y = bluetop;
            }else{
                if(players[i] == "yellow"){
                    x = yellowleft;
                    y = yellowtop;
                }else{
                    if(players[i] == "red"){
                        x = redleft;
                        y = redtop;
                    }else{
                        if(players[i] == "green"){
                            x = greenleft;
                            y = greentop;
                        };
                    };
                };
            };

            setTimeout(() => {
                if(robot[i] == 0){
                    $("#"+players[i]+"dice").one("click",function() {
                        $("#"+players[i]+"diceone").removeClass("pulseshadow");
                        $("#"+players[i]+"dicetwo").removeClass("pulseshadow");
                        rollthedice(i);
                        return;
                    });
                }else{
                    $("#"+players[i]+"diceone").removeClass("pulseshadow");
                    $("#"+players[i]+"dicetwo").removeClass("pulseshadow");
                    rollthedice(i);
                    return;
                };
            }, 500);

        }else{
            nextplayer(i);
            return;
        };

        return;
    }, 750);
}

/*Function to call the next player, if it is green or red, it will call the player blue to play*/
function nextplayer(i){
    if(i == players.length-1){
        let i = 0;
        game(i);
    }else{
        game(i+1);
    }
}

/*Function to determine how many spaces the token will have to move with each die*/
function rollthedice(i){
    
    d = 0;
    dice.play();
    dicenum = ["five","one","two","three","four","five","six"];
    rolled = setInterval(rollingdice,1);

    function rollingdice(){ 
        rollone[i] = Number(Math.floor(Math.random()*6+1));
        rolltwo[i] = Number(Math.floor(Math.random()*6+1));
        $("#"+players[i]+"diceone").html(`<i class="fas fa-dice-${dicenum[rollone[i]]} dice"></i>`);
        $("#"+players[i]+"dicetwo").html(`<i class="fas fa-dice-${dicenum[rolltwo[i]]} dice"></i>`);
        d++;
        if(d == 25){
            dieone[i] = 5;//Number(Math.floor(Math.random()*6+1));
            dietwo[i] = 5;//Number(Math.floor(Math.random()*6+1));
            $("#"+players[i]+"diceone").html(`<i class="fas fa-dice-${dicenum[dieone[i]]} dice"></i>`);
            $("#"+players[i]+"dicetwo").html(`<i class="fas fa-dice-${dicenum[dietwo[i]]} dice"></i>`);
            clearInterval(rolled);
            return;
        };
    };
    
    /*If both dice are the same value, the players have another turn and the dice become gold*/
    setTimeout(() => {
        if(dieone[i] == dietwo[i]){
            doubledice += 1;
            $("#"+players[i]+"dice").children().children().css("color","gold");
        }else{
            doubledice = 0;
        }

        setTimeout(() => {
        //If there is three consecutive doubledice, the last token moved is sent back to its HQ
        if(doubledice == 3){
            unblockspace(i,thistoken);
            sendhome(i,thistoken);
            doubledice = 0;
            nextplayer(i);
            return;
        };
        checkFive(i);
        return;
        }, 750);
    }, 250);
}

/*Function to verify if there is a number five in one or both dice,
If there is number five and there is a token in the HQ, this token will go to the first
color space in the board.*/
function checkFive(i){
    
    z = 0;

    if(dieone[i] == 5){
        //In order to trigger the token, it has to have at least one toke at home out[i] should include at least one 0
        if(out[i].includes(0)){

            thistoken = out[i].indexOf(0);

            if(players.length == 2){
                z = 24*i;
            }else{
                z = 12*i;
            }

            if(blockedposition.includes(z+1)){
                whoishere(i);
            };

            if(blockedposition.includes(z+1) == false){
                reposition[i][out[i].indexOf(0)] = z;
                leavehome(i);
                dieone[i] = 0;           
                $("#dicemoveone").hide();
                setTimeout(() => { givemesomespace(i); }, 250);
                if(remainToMove == 0){
                    if(doubledice > 0){
                        setTimeout(() => { game(i); }, 1000);
                    }else{
                        setTimeout(() => { nextplayer(i); }, 1000);
                    }
                    return;
                }
            }
        }
    };

    z = 0;

    if(dietwo[i] == 5){
        //In order to trigger the token, it has to have at least one toke at home out[i] should include at least one 0
        if(out[i].includes(0)){

            thistoken = out[i].indexOf(0);

            if(players.length == 2){
                z = 24*i;
            }else{
                z = 12*i;
            }

            if(blockedposition.includes(z+1)){
                whoishere(i);
            };

            if(blockedposition.includes(z+1) == false){
                reposition[i][out[i].indexOf(0)] = z;
                leavehome(i);
                dietwo[i] = 0;
                $("#dicemovetwo").hide();
                setTimeout(() => { givemesomespace(i); }, 250);
                if(remainToMove == 0){
                    if(doubledice > 0){
                        setTimeout(() => { game(i); }, 1000);
                    }else{
                        setTimeout(() => { nextplayer(i); }, 1000);
                    }
                    return;
                }
            }
        }
    };

    //If there is no tokens at home, then the player will proceed with the movement
    if(out[i].includes(1)){
        if(remainToMove > 0){

            options(i);
            return;

        }else{

            if(doubledice > 0){
                setTimeout(() => { game(i); }, 1000);
            }else{
                setTimeout(() => { nextplayer(i); }, 1000);
            }
            return;

        };

    }else{
        //If there is no tokens outised home and no fives in the dice, the next player will be called
        if(doubledice > 0){
            setTimeout(() => { game(i); }, 1000);
        }else{
            setTimeout(() => { nextplayer(i); }, 1000);
        }
        return;

    };
}

/*Function to verify if there is a token of a different color in the first space when a token is leaving the HQ,
If there is just one, it will block the position, if there are two it will verify if it has the same color, if
it is a different color then this token will be sent home*/
function whoishere(i){
    
    senthome = 0;

    for(m=0;m<players.length-1;m++){
        for(n=0;n<4;n++){
            if(z+1 == reposition[m][n]){
                if(i != m){

                    if(position[m][n] > 0 && position[i][thistoken]<47){
                        sendhome(m,n);
                    };

                    if(reposition[m][n] < 7){
                        blockedposition.splice(blockedposition.indexOf(reposition[m][n]+48),1); 
                    };

                    blockedposition.splice(blockedposition.indexOf(reposition[m][n]),1);
                    senthome = 1;

                }else{
                    o = n;
                }
            };
        };
    };

    if(senthome == 1){
        $("#"+players[i]+"Token"+token[o]).css({"left": x[position[i][o]-1]+"px","top": y[position[i][o]-1]+"px","position": "absolute"});
    };

    return;
}

/*Function to move the token from its HQ to the first position, the die which has 5 will be used for that*/
function leavehome(i) {

    $("#dicemoveone").off("click");
    $("#dicemovetwo").off("click");
    $("#"+players[i]+"Token"+token[out[i].indexOf(0)]).animate({left: `${x[0]}px`,top: `${y[0]}px`,position: "absolute"},500);
    $("#"+players[i]+"Token"+token[out[i].indexOf(0)]).css({"left": x[0]+"px","position": "absolute"});
    $("#"+players[i]+"Token"+token[out[i].indexOf(0)]).css({"top": y[0]+"px","position": "absolute"});
    $("#"+players[i]+"Token"+token[out[i].indexOf(0)]).css("z-index","3");

    xposition[i][out[i].indexOf(0)] = x[0];
    yposition[i][out[i].indexOf(0)] = y[0];

    position[i][out[i].indexOf(0)] += 1;
    reposition[i][out[i].indexOf(0)] += 1;
    
    out[i][out[i].indexOf(0)] = 1;
    tokensathome[i] -= 1;
    remainToMove -= 1;

    givemesomespace(i);
    return;
}

/*Function to move show the options of each token before their movement;
Each token will be activated with the movement options;*/
function options(i){

    if(remainToMove == 0){
        nextplayer(i);
    };

    $("#layer").off("click");
    $("#dicemoveone").off("click");
    $("#dicemovetwo").off("click");
    $("#dicewrapper").hide();
    $("#"+players[i]+"dice").css("z-index","1"); 
    $(".tokenwrapper"+players[i]).off("click");

    canImove(i);

    if(robot[i] == 0){
        activatedice(i);
    }else{
        setTimeout(() => {
            for(n=0;n<4;n++){
                if(out[i][n] == 1){
                    if(safespace.includes(reposition[i][n]+dieone[i]+dietwo[i]) ||
                    safespace.includes(reposition[i][n]+dieone[i])){
                        if(tokenblocked[i][n][0] == 0){
                            if(dieone[i]>0){
                                moveleft  = dieone[i];
                                dieone[i]=0;
                                thistoken = n;
                                dehighlight(i);
                                move(i);
                                return;
                            };
                        };
                    };
                };
            };
            for(n=0;n<4;n++){
                if(out[i][n] == 1){
                    if(safespace.includes(reposition[i][n]+dieone[i]+dietwo[i]) ||
                    safespace.includes(reposition[i][n]+dietwo[i])){
                        if(tokenblocked[i][n][1] == 0){
                            if(dietwo[i]>0){
                                moveleft  = dietwo[i];
                                dietwo[i]=0;
                                thistoken = n;
                                dehighlight(i);
                                move(i);
                                return;
                            };
                        };
                    };
                };
            };
            for(n=0;n<4;n++){
                if(out[i][n] == 1){
                    if(tokenblocked[i][n][0] == 0){
                        if(dieone[i]>0){
                            moveleft  = dieone[i];
                            dieone[i]=0;
                            thistoken = n;
                            dehighlight(i);
                            move(i);
                            return;
                        };
                    }; 
                    if(tokenblocked[i][n][1] == 0){
                        if(dietwo[i]>0){
                            moveleft  = dietwo[i];
                            dietwo[i]=0;
                            thistoken = n;
                            dehighlight(i);
                            move(i);
                            return;
                        };
                    };
                };
            };             
        }, 1000);
    };
   
    return;
}

/*Function to move show the options of each token before their movement,
The token that has it final position with each die cannot have any blocked position in the way,
if the token is blocked or in its HQ, no options will be shown*/
function activatedice(i){

    $(".tokenwrapper"+players[i]).one("click",function(){

        dehighlight(i);
        $(this).parent().css("z-index","1");

        thistoken = token.indexOf($(this).parent().attr('id').slice($(this).parent().attr('id').indexOf("Token")+5));
        if(dieone[i] > 0 && tokenblocked[i][thistoken][0] == 0){$("#dicemoveone").show();};
        if(dietwo[i] > 0 && tokenblocked[i][thistoken][1] == 1){$("#dicemovetwo").show();};
        
        $("#dicewrapper").show();
        $("#dicewrapper").css("z-index","3");
        $("#dicemoveone").css("z-index","3");
        $("#dicemovetwo").css("z-index","3");
        $("#dicemoveone").html(dieone[i]);
        $("#dicemovetwo").html(dietwo[i]);
        $("#dicewrapper").css("left", xposition[[i]][thistoken]-20);
        $("#dicewrapper").css("top", yposition[[i]][thistoken]-40);
        $("#layer").on("click",function(){options(i)});   

        return;
    });

    $("#dicemoveone").one("click", function(){
        moveleft  = dieone[i];
        dieone[i]=0;
        $(this).hide();
        move(i);
    });

    $("#dicemovetwo").one("click",function(){
        moveleft = dietwo[i];
        dietwo[i]=0;
        $(this).hide();
        move(i);
    });

    return;
}

/*Function to define which token can move*/
function canImove(i){

    let newrepos1 = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    let newrepos2 = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    blockedoption = 0;

    for(n=0;n<4;n++){
        
        one = 0;
        two = 0;

        newrepos1[i][n] = reposition[i][n]+dieone[i];
        newrepos2[i][n] = reposition[i][n]+dietwo[i];
        
        /*The token that has its final relative position with each die cannot have any blocked relative position in the way,
        if the token is blocked or in its HQ, no options will be shown.*/
        if(out[i][n]>0){
            tokenblocked[i][n][0] = 0;
            tokenblocked[i][n][1] = 0;
            
            if(position[i][n]<47){
                for(b=0;b<blockedposition.length;b++){
                    if(reposition[i][n]<blockedposition[b]){
                        if(blockedposition[b]<=newrepos1[i][n]){
                            if(position[i][n] + dieone[i] < 47){
                                one = 1;
                                tokenblocked[i][n][0] = 1;
                            }else{
                                if(blockedposition[b] == 46){
                                    one = 1;
                                    tokenblocked[i][n][0] = 1;
                                };
                            };
                        };
                    };
                    if(reposition[i][n]<blockedposition[b]){
                        if(blockedposition[b]<=newrepos2[i][n]){
                            if(position[i][n] + dietwo[i] < 47){
                                two = 1;
                                tokenblocked[i][n][1] = 1;
                            }else{
                                if(blockedposition[b] == 46){
                                    one = 1;
                                    tokenblocked[i][n][0] = 1;
                                };
                            };
                        };
                    };
                };
            }else{
                for(f=0;f<lastblockedposition[i].length;f++){
                    if(position[i][n]<lastblockedposition[f]){
                        if(lastblockedposition[f]<position[i][n]+dieone[i]){
                            one = 1;
                            tokenblocked[i][n][0] = 1;
                        };
                    };
                    if(position[i][n]<lastblockedposition[f]){
                        if(lastblockedposition[f]<position[i][n]+dietwo[i]){
                            two = 1;
                            tokenblocked[i][n][1] = 1;
                        };
                    };
                };
                //The tokens in the last position (51) will not be able to move neither.
                if(position[i][n]+dieone[i]>51){
                    one = 1;
                    tokenblocked[i][n][0] = 1;
                };
                if(position[i][n]+dietwo[i]>51){
                    two = 1;
                    tokenblocked[i][n][1] = 1;
                };
            };

            if(dieone[i] == 0){one = 1};
            if(dietwo[i] == 0){two = 1};

            if(one+two == 0){
                $("#"+players[i]+"Token"+token[n]).children().children().html(`${dieone[i]},${dietwo[i]}<div class="chooseme"></div>`);
                $("#"+players[i]+"Token"+token[n]).css("z-index","3");
                myposition = $("#"+players[i]+"Token"+token[n]).position();
                xposition[i][n] = Math.trunc(myposition.left);
                yposition[i][n] = Math.trunc(myposition.top);

            }else{
                if(one == 0){
                    $("#"+players[i]+"Token"+token[n]).children().children().html(`${dieone[i]}<div class="chooseme"></div>`);
                    //$("#dicemovetwo").hide();
                    $("#"+players[i]+"Token"+token[n]).css("z-index","3"); 
                    myposition = $("#"+players[i]+"Token"+token[n]).position();
                    xposition[i][n] = Math.trunc(myposition.left);
                    yposition[i][n] = Math.trunc(myposition.top);

                }else{
                    if(two == 0){
                        $("#"+players[i]+"Token"+token[n]).children().children().html(`${dietwo[i]}<div class="chooseme"></div>`);
                       // $("#dicemoveone").hide();
                        $("#"+players[i]+"Token"+token[n]).css("z-index","3");
                        myposition = $("#"+players[i]+"Token"+token[n]).position();
                        xposition[i][n] = Math.trunc(myposition.left);
                        yposition[i][n] = Math.trunc(myposition.top);
                    };
                };
            };
        };
    };

    for(n=0;n<4;n++){
        for(m=0;m<2;m++){
            blockedoption += tokenblocked[i][n][m];
        };
    };
    
    //If there isnt any token able to move, the function will call the next player.
    if(remainToMove == 2){
        if(blockedoption == 8){
            if(doubledice >0){
                game(i);
            }else{
                nextplayer(i);
            };
            return;
        };
    };
    if(remainToMove == 1){
        if(blockedoption == 4){
            if(doubledice >0){
                game(i);
            }else{
                nextplayer(i);
            };
            return;
        };
    };
    return;
}
/*There is a bug in this function, if the token blue is its final position it can be blocked by tokens that are beyond the final of the loop,
in order to fix it, it was added the condition that just before the final lane it cannot be blocked (position[i]<47), which created a unintended
bug that the token will not be blocked at all when there is a blocked position inside the final lane.
An exception has to be created to the player blue only.*/

/*Function is activated when a token is clicked it will remove the class "chooseme" added to each token*/
function dehighlight(i){
    for(n=0;n<4;n++){
        if(out[i][n]>0){
           $("#"+players[i]+"Token"+token[n]).children().children().empty();
           $("#"+players[i]+"Token"+token[n]).children().off("click");
        };
    };
    return;
}

/*Function to set the normal position of each token when they are blocked before the movement of one of
the two tokens and removed the relative position for the blocked ones*/
function unblockspace(i,thistoken){
    for(m=0;m<players.length;m++){
        for(n=0;n<4;n++){
            if(blockedposition.includes(reposition[i][thistoken])){
                if(out[m][n]==1 && reposition[m][n] == reposition[i][thistoken]){
                    $("#"+players[m]+"Token"+token[n]).css({"left": x[position[i][thistoken]-1]+"px","top": y[position[i][thistoken]-1]+"px","position": "absolute"});
                };
                if(n==3 && m == players.length-1){
                    if(reposition[i][thistoken] < 7){
                    blockedposition.splice(blockedposition.indexOf(reposition[i][thistoken]+48),1); 
                    };
                    blockedposition.splice(blockedposition.indexOf(reposition[i][thistoken]),1);
                    return;
                };
            };
        };
    };
}

/*Function to move the tokens according to the die chosen*/
function move(i){

    if(remainToMove == 0){
        if(doubledice > 0){
            game(i);
        }else{
            nextplayer(i);
        };
    };
    
    $("#layer").off("click");
    $("#dicemoveone").off("click");
    $("#dicemovetwo").off("click");
    $("#dicewrapper").hide();
    $(".tokenwrapper"+players[i]).off("click");

    let l = 0;
    let k = Number(window.moveleft);
    let j = thistoken;
    newpos = Number(position[i][j]+k);
    newrepos = Number(reposition[i][j]+k);
    
    unblockspace(i,thistoken);

    var myMove = setInterval(moving, 250);
    
    //Function called for every space moved until there is not movement left
    function moving(){

        tokenMoving.play();
        $("#"+players[i]+"Token"+token[thistoken]).animate({left: `${x[newpos-k+l]}px`,top: `${y[newpos-k+l]}px`,position: "absolute"},200);
        $("#"+players[i]+"Token"+token[thistoken]).css({"left": x[newpos-k+l]+"px","top": y[newpos-k+l]+"px","position": "absolute"});
        l++;

        if (l==k){
            
            remainToMove -=1;
            position[i][j] = Number(newpos);

            //If a token enters the last lane, its relative becomes zero, this token will not be able to block again
            if(position[i][thistoken] > 46){
                reposition[i][thistoken] = 0;
            }else{
                if(newrepos>48){
                    reposition[i][j] = Number(newrepos)-48;
                    }else{
                    reposition[i][j] = Number(newrepos);
                };
            };       

            givemesomespace(i);
          
            if(remainToMove>0){

                checkFive(i);
                if(position[i][thistoken] == 51){tokensatend[i] +=1;};
                if(tokensatend[i] == 4){alert(`Game Over! Player ${players[i]} won!`);};
                clearInterval(myMove);
                return;

            }else{

                if(position[i][thistoken] == 51){tokensatend[i] +=1;};
                if(tokensatend[i] == 4){alert(`Game Over! Player ${players[i]} won!`);};

                if(doubledice >0){
                    game(i);
                }else{
                    nextplayer(i);
                };
                clearInterval(myMove);
                return;
            };
        };

    return;
    };
    return;   
}

/*Function called to animate the result of the final move*/
function givemesomespace(i){

    var shield = 0;
    var hit = 0;
    var b = 0;
    var m = 0;
    var o = 0;

    //If the token hit a token of the same color it will block the space
    for(r=0;r<4;r++){
        if(r!=thistoken){
            if(reposition[i][r] == reposition[i][thistoken]){
                shield = 1;
                b = r;
            };
        };
    };
    if(shield>0){
        blockspace(i,i,b,thistoken);
        return;
    };

    
    /*If the token hit another color but inside a safe space, it will block the space
    Otherwise, it will send the other color token back to its HQ*/
    for(h=0;h<players.length-1;h++){

        if(h != i){
            for(a=0;a<4;a++){
                if(position[i][thistoken]<47){
                    if(reposition[h][a] == reposition[i][thistoken]){
                        hit = 1;
                        m = h;
                        o = a;
                    };
                };
            };
        };
    };
    if(hit>0){
        if(safespace.includes(reposition[i][thistoken])){

            blockspace(i,m,o,thistoken);
        }else{
            if(position[i][thistoken] > 0 && position[i][thistoken]<47){
                sendhome(m,o);
            };

        };
        return;
    };
}

/*Function called to animate token sent home and positioning*/
function sendhome(m,o){
    $("#"+players[m]+"Token"+token[o]).animate({left: `${initleft[colors.indexOf(players[m])][o]}px`,top: `${inittop[colors.indexOf(players[m])][o]}px`,position: "absolute"},200);
    position[m][o]=0;
    out[m][o]=0;
    reposition[m][o]=0;
    return;
}

/*Function called to animate tokens blocking the position and positioning*/
function blockspace(i,m,b,thistoken){
    
    if(position[i][thistoken] > 0){
        if(position[i][thistoken]<47){
            
            if(blockedposition.includes(reposition[i][thistoken]) == false){  
                if(position[i][thistoken]<47){

                    $("#"+players[m]+"Token"+token[b]).animate({left: `-=5px`,top: `-=5px`,position: "absolute"},100);
                    $("#"+players[i]+"Token"+token[thistoken]).animate({left: `+=5px`,top: `+=5px`,position: "absolute"},100);
                    blockedposition.push(reposition[i][thistoken]);
                    if(reposition[i][thistoken]<7){
                        blockedposition.push(reposition[i][thistoken]+48);
                    };

                };
                //$(".mainlayer").html(`${position} </br> ${reposition} </br> ${blockedposition}`);
            };

        }else{
            if(position[i][thistoken] == position[m][b]){

                if(lastblockedposition.includes(position[i][thistoken]) == false){  
                        $("#"+players[m]+"Token"+token[b]).animate({left: `-=5px`,top: `-=5px`,position: "absolute"},100);
                        $("#"+players[i]+"Token"+token[thistoken]).animate({left: `+=5px`,top: `+=5px`,position: "absolute"},100);
                        lastblockedposition[i].push(position[i][thistoken]);
                    //$(".mainlayer").html(`${position} </br> ${reposition} </br> ${blockedposition});
                };
            };
        }
    };
    return;
}