$(".board").hide();
$("#players").hide();
$("#start").show();
$(".exit").hide();
$("#startgame").hide();
$(".selecttype").hide();

let playing = 0;
let playerSelected = 0;

if($( window ).width()){
    setInterval(() => {

        if ($(window).height()<425){
            $(".board").hide();
            $( "#start").hide();
            $( "#players").hide();
        }else{
            if(playing == 1){
                $(".board").show();
            }else{
                $(".board").hide();
            }
        };

        mx = Math.min(0.9*$(window).width()-425,0.9*$(window).height()-425);
        
        z = (375+mx/2)/375;
        
        if ($(window).width()<325){
            z = 0.75;
        };

        //$(".mainlayer").html(z);
        $( ".board" ).css("zoom", `${(z)}`);
        $( ".board" ).css("margin", `${($(window).height()-$("body").height()*z)/2}px auto`);
        $( "#start" ).css("zoom", `${(z)}`);
        $("#start").css("margin", `${($(window).height()-$("#start").height()*z)/2}px auto`);
        $( "#players" ).css("zoom", `${(z)}`);
        $("#players").css("margin",  `${($(window).height()-$("#players").height()*z)/2}px auto`);
    }, 1);
}

let players = [];
let colors = ["blue","yellow","red","green"];
let token = ["One","Two","Three","Four"];
let robot = [0,0,0,0];

let redleft = [255,	230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,280,255,230,205,180];
let redtop = [130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,155,155,155,155,155];
let blueleft = [55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,30,55,80,105,130];
let bluetop = [180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,155,155,155,155,155];
let greenleft = [130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,155,155,155,155,155];
let greentop = [55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,30,55,80,105,130];        
let yellowleft = [180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,155,155,155,155,155];
let yellowtop = [255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,280,255,230,205,180];
let safespace = [1,7,10,13,19,22,25,31,34,37,43,46];


var moveleft = 0;
var d_one = 0;
var d_two = 0;
var tokensathome = [4,4,4,4];
var tokensatend = [0,0,0,0];

var thistoken = 0;
var remainToMove = 2;



var rollone = [0,0,0,0];
var rolltwo = [0,0,0,0];
var dieone = [0,0,0,0];
var dietwo = [0,0,0,0];
var results = [0,0,0,0];
var position = [[0,0,0,0] , [0,0,0,0] , [0,0,0,0] , [0,0,0,0]];
var reposition = [[0,0,0,0] , [0,0,0,0] , [0,0,0,0] , [0,0,0,0]];
var blockedposition = [];
var lastblockedposition = [[],[],[],[]];
var tokenblocked = [ [[0,0],[0,0],[0,0],[0,0]] , [[0,0],[0,0],[0,0],[0,0]], [[0,0],[0,0],[0,0],[0,0]], [[0,0],[0,0],[0,0],[0,0]] ];
var initleft = [[25,86.8,25,86.8],[225,286.8,225,286.8],[225,286.8,225,286.8],[25,86.8,25,86.8]];
var inittop = [[226,226,290,290],[226,226,290,290],[26,26,90,90],[26,26,90,90]];
var out = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var xposition = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var yposition = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];


$("#myCheck").on("click",function choose() {
    players=[];
    players.push("blue");
    players.push("red");
    $(`.fourplayers`).hide();
    $(`#greendice`).hide();
    $(`#yellowdice`).hide();
    $("#myChecktwo").removeClass("playersnumber");
    $("#myCheck").addClass("playersnumber");
    playselected();
    playerSelected = 1;
    return; 
});

$("#myChecktwo").on("click",function choose() {
    players=[];
    players.push("blue");
    players.push("yellow");
    players.push("red");
    players.push("green");
    $(`.fourplayers`).show();
    $(`#greendice`).show();
    $(`#yellowdice`).show();
    $("#myCheck").removeClass("playersnumber");
    $("#myChecktwo").addClass("playersnumber");
    playselected();
    playerSelected = 1;
    return;
});

$("#next").on("click",function choose() {
    if(playerSelected == 1){
        $(this).hide();
        $("#startgame").show();
        $(".exit").show();
        $(".selectplayers").toggle();
        $(".selecttype").show();
        playselected();
    }else{
        alert("Select the number of players");
    };
    return; 
});

$(".exit").on("click",function choose() {
    $(this).hide();
    $("#next").show();
    $("#startgame").hide();
    $(".selectplayers").toggle();
    $(".selecttype").hide();
    playselected();
    return; 
});


for(n=0;n<4;n++){
    
    let r = ["bluehuman","yellowhuman","redhuman","greenhuman"];
    $(`#${colors[n]}human`).on("click",function human() {
       //$(".mainlayer").html(players + "  " + robot);
       playselected();
       $(this).addClass(`playersnumber`);
       $(this).siblings().removeClass(`playersnumber`);
       if(players.length == 2){ 
           if(r.indexOf($(this).attr("id")) == 2 ){
               robot[r.indexOf($(this).attr("id"))-1] = 0;
           }else{
               robot[r.indexOf($(this).attr("id"))] = 0;
           };
       }else{
           robot[r.indexOf($(this).attr("id"))] = 0;
       };
       //$(".mainlayer").html(players + "  " + robot);
    });
    $(`#${colors[n]}bot`).on("click",function bot() {
      //  $(".mainlayer").html(players + "  " + robot);
      playselected();
       $(this).addClass(`playersnumber`);
       $(this).siblings().removeClass(`playersnumber`);
       if(players.length == 2){ 
           if(r.indexOf($(this).siblings().attr("id")) == 2 ){
               robot[r.indexOf($(this).siblings().attr("id"))-1] = 1;
           }else{
               robot[r.indexOf($(this).siblings().attr("id"))] = 1;
           };
       }else{
           robot[r.indexOf($(this).siblings().attr("id"))] = 1;
       };
     //  $(".mainlayer").html(players + "  " + robot);
    });
}



$("#play").on("click",function starts(){
    playselected();
    $("#start").hide();
    $("#players").show();
});

$("#startgame").on("click",function starts(){ 
    playstart();
    $(".board").show();
    $(this).hide();
    $("#players").hide();
    $("#layer").css("background-image","none");
    playing = 1;
    let i = 0;
    setTimeout(() => {
        whostarts(i);
    }, 1000); 
    return;
});

function whostarts(i){
    playdice();
   
    d=0;
    dicenum = ["one","two","three","four","five","six"];
    roll = setInterval(rolling,1);
    function rolling(){ 
        rollone[i] = Number(Math.floor(Math.random()*6+1));
        rolltwo[i] = Number(Math.floor(Math.random()*6+1));
        $("#"+players[i]+"diceone").html(`<i class="fas fa-dice-${dicenum[rollone[i]-1]} dice"></i>`);
        $("#"+players[i]+"dicetwo").html(`<i class="fas fa-dice-${dicenum[rolltwo[i]-1]} dice"></i>`);
        if(d==50){
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
    
    
    
    setTimeout(function(){
        $("#"+players[i]+"dice").css("z-index","1");
        if(i<players.length-1){
            whostarts(i+1);
            return;
        }
        if (i==players.length-1){
            setTimeout(function(){
                alert(results);
                winner = Array.from(results);
                winner.sort(function(a, b){return b-a});
            if (winner[0]===winner[1]){
                //alert ("two winners " + winner +"results:"+ results);
                let i = 0;
                whostarts(i);
                return;                    
            }else{
            i = results.indexOf(winner[0]);
            $("#"+players[results.indexOf(winner[0])]+"dice").css("z-index","3");;
            setTimeout(function(){alert (players[i] + "  starts!")},100);
            };
            doubledice = 0;
            game(i);
            return;
        },1000);
    }
    },1000);
    return;
}

var dice = new Audio('assets/audio/RollingDice.wav');
var tokenMoving = new Audio('assets/audio/tokenMoving.wav');
var turn = new Audio('assets/audio/yourTurn.wav');
var leave = new Audio('assets/audio/leaveHome.wav');
var selected = new Audio('assets/audio/select.wav');
var start = new Audio('assets/audio/start.wav');

function playdice() { 
  dice.play(); 
}

function playleave() { 
  leave.play(); 
}

function playturn() { 
  turn.play(); 
}

function playmove() { 
  tokenMoving.play(); 
}

function playselected() { 
  selected.play(); 
}

function playstart() { 
  start.play(); 
}

function game(i){
    setTimeout(() => {
        if(tokensatend[i]<4){
            playturn();
            remainToMove = 2;
            $("#dicemoveone").show();
            $("#dicemovetwo").show();
            $("#"+players[i]+"dice").addClass("pulseshadow");
            //i=3; 

            if(players[i]=="blue"){
                x = blueleft;
                y = bluetop;
            }else{
                if(players[i]=="yellow"){
                    x = yellowleft;
                    y = yellowtop;
                }else{
                    if(players[i]=="red"){
                        x = redleft;
                        y = redtop;
                    }else{
                        if(players[i]=="green"){
                            x = greenleft;
                            y = greentop;
                        };
                    };
                };
            };

            $("#layer").off("click");
            $("#"+players[i]+"dice").css("z-index","3");
            if(robot[i] == 0){
                $("#"+players[i]+"dice").one("click",function() {
                    $("#"+players[i]+"dice").removeClass("pulseshadow");
                    rollthedice(i);
                    return;
                });
            }else{
                setTimeout(() => {
                    $("#"+players[i]+"dice").removeClass("pulseshadow");
                    rollthedice(i);
                    return;
                }, 1000);
            };
        }else{
            nextplayer(i);
            return;
        };
        return;
    }, 500);
}


function rollthedice(i){

    dieone[i] = 5;//Number(Math.floor(Math.random()*6+1));
    dietwo[i] = 5;//Number(Math.floor(Math.random()*6+1));

    playdice();

    d=0;
    dicenum = ["five","one","two","three","four","five","six"];
    rolled = setInterval(rollingdice,1);

    function rollingdice(){ 
        rollone[i] = Number(Math.floor(Math.random()*6+1));
        rolltwo[i] = Number(Math.floor(Math.random()*6+1));
        $("#"+players[i]+"diceone").html(`<i class="fas fa-dice-${dicenum[rollone[i]]} dice"></i>`);
        $("#"+players[i]+"dicetwo").html(`<i class="fas fa-dice-${dicenum[rolltwo[i]]} dice"></i>`);
        if(d==50){
            $("#"+players[i]+"diceone").html(`<i class="fas fa-dice-${dicenum[dieone[i]]} dice"></i>`);
            $("#"+players[i]+"dicetwo").html(`<i class="fas fa-dice-${dicenum[dietwo[i]]} dice"></i>`);
            clearInterval(rolled);
            return;
        };
        d++;
    };
    
    setTimeout(() => {
        if(dieone[i] == dietwo[i]){
            doubledice += 1;
            $("#"+players[i]+"dice").children().children().css("color","gold");
        }else{
            doubledice = 0;
        }

        if(doubledice == 3){
            //alert(`The color ${players[i]} and the token ${thistoken}`);
            unblockspace(i,thistoken);
            sendhome(i,thistoken);
            doubledice = 0;
            nextplayer(i);
            return;
        };
        checkFive(i);
        return;
    }, 500);
}

function checkFive(i){
    z=0;

    if(dieone[i] == 5){
        if(out[i].includes(0)){
            thistoken = out[i].indexOf(0);
            if(players.length == 2){
                z = 24*i;
            }else{
                z = 12*i;
            };
            if(blockedposition.includes(z+1)){
                whoishere(i);
            };
            if(blockedposition.includes(z+1) == false){
                //alert("leaving die token" + thistoken);
                reposition[i][out[i].indexOf(0)] = z;
                leavehome(i);
                //alert("wait");
                dieone[i] = 0;           
                $("#dicemoveone").hide();
                setTimeout(() => { givemesomespace(i); }, 250);
                if(remainToMove == 0){
                    if(doubledice > 0){
                        setTimeout(() => { game(i); }, 1000);
                    }else{
                        setTimeout(() => { nextplayer(i); }, 1000);
                    };
                    return;
                }
            };
        };
    };
    z=0;

    if(dietwo[i] == 5){
        if(out[i].includes(0)){
            thistoken = out[i].indexOf(0);
            if(players.length == 2){
                z = 24*i;
            }else{
                z = 12*i;
            };
            //alert("leaving die token" + thistoken);
            if(blockedposition.includes(z+1)){
                whoishere(i);
            };
            if(blockedposition.includes(z+1) == false){
                reposition[i][out[i].indexOf(0)] = z;
                leavehome(i);
               // alert("wait");
                dietwo[i] = 0;
                $("#dicemovetwo").hide();
                setTimeout(() => { givemesomespace(i); }, 250);
                if(remainToMove == 0){
                    if(doubledice > 0){
                        setTimeout(() => { game(i); }, 1000);
                    }else{
                        setTimeout(() => { nextplayer(i); }, 1000);
                    };
                    return;
                }
            };
        };
    };
    if(out[i].includes(1)){
        if(remainToMove > 0){
        //alert("Remain to move");
        options(i);
        return;
        }else{
            if(doubledice > 0){
                setTimeout(() => { game(i); }, 1000);
            }else{
                setTimeout(() => { nextplayer(i); }, 1000);
            };
            return;
        };
    }else{
        if(doubledice > 0){
            setTimeout(() => { game(i); }, 1000);
        }else{
            setTimeout(() => { nextplayer(i); }, 1000);
        };
        return;
    };
}

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
    }

    return;
}

function nextplayer(i){
    if(i == players.length-1){
        let i = 0;
        game(i);
    }else{
        game(i+1);
    };
}

function leavehome(i) {
    
   $(".mainlayer").html(`${position} </br> ${reposition} </br> ${blockedposition} </br> ${lastblockedposition}`);
    $("#dicemoveone").off("click");
    $("#dicemovetwo").off("click");

    $("#"+players[i]+"Token"+token[out[i].indexOf(0)]).animate({left: `${x[0]}px`,top: `${y[0]}px`,position: "absolute"},500);
    playleave();
    $("#"+players[i]+"Token"+token[out[i].indexOf(0)]).css({"left": x[0]+"px","position": "absolute"});
    $("#"+players[i]+"Token"+token[out[i].indexOf(0)]).css({"top": y[0]+"px","position": "absolute"});
    $("#"+players[i]+"Token"+token[out[i].indexOf(0)]).css("z-index","3");

    //alert("#"+players[i]+"Token"+token[out[i].indexOf(0)]);
    xposition[i][out[i].indexOf(0)] = x[0];
    yposition[i][out[i].indexOf(0)] = y[0];

    position[i][out[i].indexOf(0)] += 1;
    reposition[i][out[i].indexOf(0)]+=1;
    
    out[i][out[i].indexOf(0)] = 1;
    tokensathome[i]-=1;
    remainToMove -= 1;
    $(".mainlayer").html(`${position} </br> ${reposition} </br> ${blockedposition} </br> ${lastblockedposition}`);
    givemesomespace(i);
    return;
}

function options(i){
    //alert("I am in options remain to move: "+remainToMove);
     if(remainToMove == 0){
        nextplayer(i);
    };
    $("#layer").off("click");
    $("#dicemoveone").off("click");
    $("#dicemovetwo").off("click");
    $("#dicewrapper").hide();
    $("#"+players[i]+"dice").css("z-index","1"); 
    $(".tokenwrapper"+players[i]).off("click");

    highlight(i);

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

function activatedice(i){

    $(".tokenwrapper"+players[i]).one("click",function(){
        $(this).parent().css("z-index","1");
        dehighlight(i);
        $("#dicewrapper").show();
        if(dieone[i]>0){$("#dicemoveone").show();};
        if(dietwo[i]>0){$("#dicemovetwo").show();};
        thistoken = token.indexOf($(this).parent().attr('id').slice($(this).parent().attr('id').indexOf("Token")+5));
        if(tokenblocked[i][thistoken][0] == 1){$("#dicemoveone").hide();}
        if(tokenblocked[i][thistoken][1] == 1){$("#dicemovetwo").hide();}
        $("#dicewrapper").css("z-index","3");
        $("#dicemoveone").css("z-index","3");
        $("#dicemovetwo").css("z-index","3");
        $("#dicemoveone").html(dieone[i]);
        $("#dicemovetwo").html(dietwo[i]);
        $("#dicewrapper").css("left", xposition[[i]][thistoken]-20);
        $("#dicewrapper").css("top", yposition[[i]][thistoken]-35);
        $("#layer").on("click",function(){options(i)});       
        return;
    });

    $("#dicemoveone").one("click", function(){
        //alert("Moving from dicemoveone");
        moveleft  = dieone[i];
        dieone[i]=0;
        $(this).hide();
        move(i);
    });

    $("#dicemovetwo").one("click",function(){
        //alert("Moving from dicemovetwo");
        moveleft = dietwo[i];
        dietwo[i]=0;
        $(this).hide();
        move(i);
    });
    return;
}


function highlight(i){
   
    canImove(i);
    return;
}

function canImove(i){
    // I am the token X of the color i 
    let newrepos1 = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    let newrepos2 = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    blockedoption = 0;

    for(n=0;n<4;n++){
        
        one = 0;
        two = 0;

        newrepos1[i][n] = reposition[i][n]+dieone[i];
        newrepos2[i][n] = reposition[i][n]+dietwo[i];
    
        if(out[i][n]>0){
            tokenblocked[i][n][0] = 0;
            tokenblocked[i][n][1] = 0;
            
            if(position[i][n]<47){
                for(b=0;b<blockedposition.length;b++){
                    if(reposition[i][n]<blockedposition[b]){
                        if(blockedposition[b]<=newrepos1[i][n]){
                        // alert(`I am the token ${token[n]}, color ${players[i]} I cannot pass the blocked position ${blockedposition[b]} using the die One`);
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
                            //alert(`I am the token ${token[n]}, color ${players[i]} I cannot pass the blocked position ${blockedposition[b]} using the die Two`);
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
    
    if(remainToMove == 2){
        if(blockedoption == 8){
            //alert(blockedoption);
            //alert("No moves left");
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
            //alert(blockedoption);
            //alert("No moves left");
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


function dehighlight(i){
    for(n=0;n<4;n++){
        if(out[i][n]>0){
           $("#"+players[i]+"Token"+token[n]).children().children().empty();
           $("#"+players[i]+"Token"+token[n]).children().off("click");
        };
    };
    return;
}

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

function move(i){
    if(remainToMove == 0){
        if(doubledice >0){
            game(i);
        }else{
            nextplayer(i);
        };
    };
    //alert(players[i]+"Token"+token[thistoken]+" will move");
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
    //alert(newpos);

    var myVar = setInterval(myTimer, 200);
    
    function myTimer(){
        //alert("Ready to move");
        $("#"+players[i]+"Token"+token[thistoken]).animate({left: `${x[newpos-k+l]}px`,top: `${y[newpos-k+l]}px`,position: "absolute"},200);
        $("#"+players[i]+"Token"+token[thistoken]).css({"left": x[newpos-k+l]+"px","top": y[newpos-k+l]+"px","position": "absolute"});
        playmove();
        //$(".mainlayer").html(`${xposition} </br> ${yposition}`);
        l++;
        if (l==k){
            
            remainToMove -=1;
            position[i][j] = Number(newpos);

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
               $(".mainlayer").html(`${position} </br> ${reposition} </br> ${blockedposition} </br> ${lastblockedposition}`);
                checkFive(i);
                if(position[i][thistoken] == 51){tokensatend[i] +=1;};
                if(tokensatend[i] == 4){alert(`Game Over! Player ${players[i]} won!`);};
                clearInterval(myVar);
                return;
            }else{
               $(".mainlayer").html(`${position} </br> ${reposition} </br> ${blockedposition} </br> ${lastblockedposition}`);
                if(position[i][thistoken] == 51){tokensatend[i] +=1;};
                if(tokensatend[i] == 4){alert(`Game Over! Player ${players[i]} won!`);};
                if(doubledice >0){
                    game(i);
                }else{
                    nextplayer(i);
                };
                clearInterval(myVar);
                return;
            };
        };

    return;
    };
    return;   
}

function givemesomespace(i){
    //alert("Givesomespace");
    //let o=0;
    //let m=0;
    /*myposition = $("#"+players[i]+"Token"+token[thistoken]).position();
    xposition[i][thistoken] = Math.trunc(myposition.left);
    yposition[i][thistoken] = Math.trunc(myposition.top);*/

    //var hi = setInterval(iampassing,1);

    //function iampassing(){

    var shield = 0;
    var b = 0;
    for(r=0;r<4;r++){
        if(r!=thistoken){
            if(reposition[i][r] == reposition[i][thistoken]){
             //   alert("Shield");
                shield = 1;
                b = r;
            };
        };
    };


   //alert("Tokenshere: "+ shield);

    var hit = 0;
    var m = 0;
    var o = 0;
    for(h=0;h<players.length-1;h++){
        //alert(h);
        if(h != i){
            for(a=0;a<4;a++){
               // alert(a);
                if(position[i][thistoken]<47){
                    if(reposition[h][a] == reposition[i][thistoken]){
                  //  alert("Hit");
                        hit = 1;
                        m = h;
                        o = a;
                    };
                };
            };
        };
    };

   //if(hit==1){alert("Number of hits: " + hit)};
   // alert(m);
   // alert(o);
    if(shield>0){
       //alert("Activate Shield");
        blockspace(i,i,b,thistoken);
        return;
    };

    if(hit>0){
      //  alert("Go home");
        if(safespace.includes(reposition[i][thistoken])){
            blockspace(i,m,o,thistoken);
        }else{
            if(position[i][thistoken] > 0 && position[i][thistoken]<47){
                sendhome(m,o);
            };
        };
        return;
    };
            /*    if(m !== i){
                    //alert(`Hi ${players[m]} Token ${token[o]}`);
                        sendhome(m,o);
                        clearcheck = clearInterval(hi);
                }else{
                    alert(`M ${m} and O ${o}`);
                    alert(`I am ${i} and token ${thistoken}`);
                    if(o !== thistoken){
                      // alert(`Hi brother ${players[m]} Token ${token[o]}`);
                            alert("Activate shield");
                        blockspace(i,m,o);
                        clearcheck = clearInterval(hi);
                    };
                };
            };
        };
        if(o == 4){
            if(m == players.length-1){
                clearcheck = clearInterval(hi);
                return;
                }else{
                    o = -1;
                    m++;
            };
        };
        o++;
    };
    return;  */
}


function sendhome(m,o){
   // alert(players[m]);
    //alert(colors.indexOf(players[m]));
    $("#"+players[m]+"Token"+token[o]).animate({left: `${initleft[colors.indexOf(players[m])][o]}px`,top: `${inittop[colors.indexOf(players[m])][o]}px`,position: "absolute"},200);
    position[m][o]=0;
    out[m][o]=0;
    reposition[m][o]=0;
    return;
}

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
                $(".mainlayer").html(`${position} </br> ${reposition} </br> ${blockedposition} </br> ${lastblockedposition}`);
            };

        }else{
            if(position[i][thistoken] == position[m][b]){
                if(lastblockedposition.includes(position[i][thistoken]) == false){  
                        $("#"+players[m]+"Token"+token[b]).animate({left: `-=5px`,top: `-=5px`,position: "absolute"},100);
                        $("#"+players[i]+"Token"+token[thistoken]).animate({left: `+=5px`,top: `+=5px`,position: "absolute"},100);
                        lastblockedposition[i].push(position[i][thistoken]);

                    $(".mainlayer").html(`${position} </br> ${reposition} </br> ${blockedposition} </br> ${lastblockedposition}`);
                };
            };
        }
    };
    return;
}