$(".board").hide();

let players = ["blue","yellow","red","green"];
let token = ["One","Two","Three","Four"];

let redleft = [255,	230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,280,255,230,205,180];
let redtop = [130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,130,130,130,130,130,130];
let blueleft = [55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,30,55,80,105,130];
let bluetop = [180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,155,155,155,155,155];
let greenleft = [130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,155,155,155,155,155];
let greentop = [55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,30,55,80,105,130];        
let yellowleft = [180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,155,155,155,155,155];
let yellowtop = [255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,280,255,230,205,180];

var dieone = [0,0,0,0];
var dietwo = [0,0,0,0];

var thistoken = 0;
var remainToMove = 2;

var position = [[0,0,0,0] , [0,0,0,0] , [0,0,0,0] , [0,0,0,0]];
var reposition = [[0,0,0,0] , [0,0,0,0] , [0,0,0,0] , [0,0,0,0]];
var blockedposition = [];

var initleft = [[25,86.8,25,86.8],[225,286.8,225,286.8],[225,286.8,225,286.8],[25,86.8,25,86.8]];
var inittop = [[226,226,290,290],[226,226,290,290],[26,26,90,90],[26,26,90,90]];
var out = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

var xposition = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var yposition = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

$("#players2").click(function twoplayers(){
    players=[];
    players.push("blue");
    players.push("red");
    return;
});

$("#players4").click(function twoplayers(){
    players=[];
    players.push("blue");
    players.push("yellow");
    players.push("red");
    players.push("green");
    return;
});

$("#play").click(function starts(){
    $(".board").show();
    $("#start").css("z-index","-1");
    $("#layer").css("background-image","none");
    let i = 0;
    whostarts(i);
});

function whostarts(i){
    dieone[i] = Number(Math.floor(Math.random()*6+1));
    dietwo[i] = Number(Math.floor(Math.random()*6+1));
    $("#"+players[i]+"diceone").html(dieone[i]);
    $("#"+players[i]+"dicetwo").html(dietwo[i]);
    results[i] = dieone[i] + dietwo[i];
    setTimeout(function(){
        $("#"+players[i]+"dice").css("z-index","1");
        if(i<players.length-1){
            whostarts(i+1);
            return;
        }
        if (i==players.length-1){
            setTimeout(function(){
                results.pop();
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
            setTimeout(function(){alert (players[i] + "  starts!")},300);
            };
            game(i);
            return;
        },200);
    }
    },200);
}

function game(i){
    remainToMove = 2;
    
    $("#dicemoveone").show();
    $("#dicemovetwo").show();
    $("#"+players[i]+"dice").css("background-color","rgba(150, 155, 80)");

    setcoordinates(i);
   

    $("#layer").off("click");
    $("#"+players[i]+"dice").css("z-index","3");
    $("#"+players[i]+"dice").one("click",function() {
        $("#"+players[i]+"dice").css("background-color","white");
        rollthedice(i);
    });
    return;
}

function setcoordinates(i){
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
    return;
}


function rollthedice(i){
    $("#"+players[i]+"dice").css("z-index","1");
    dieone[i] = 5;//Number(Math.floor(Math.random()*6+1));
    dietwo[i] = 5;//Number(Math.floor(Math.random()*6+1));
    $("#"+players[i]+"diceone").html(dieone[i]);
    $("#"+players[i]+"dicetwo").html(dietwo[i]);
    d_one=dieone[i];
    d_two=dietwo[i];
    checkFive(i);
}

function checkFive(i){
    if(dieone[i] == 5){
        if(out[i].includes(0)){
            thistoken = out[i].indexOf(0);
            if(blockedposition.includes(reposition[i][thistoken]+1)){
                if(position[colors.indexOf(players[m])].includes(reposition[i][thistoken]+1) == false){
                    leavehome(i);
                    givemesomespace(i);
                    dieone[i] = 0;
                    $("#dicemoveone").hide();
                };
            }else{
                leavehome(i);
                givemesomespace(i);
            }
        };
    };
    if(dietwo[i] == 5){
        if(out[i].includes(0)){
            thistoken = out[i].indexOf(0);
            if(blockedposition.includes(reposition[i][thistoken]+1)){
                if(position[colors.indexOf(players[m])].includes(reposition[i][thistoken]+1) == false){
                    leavehome(i);
                    givemesomespace(i);
                    dietwo[i] = 0;
                    $("#dicemovetwo").hide();
                };
            }else{
                leavehome(i);
                givemesomespace(i);
            }
        };
    };
    if(remainToMove == 0){
        nextplayer(i);
    }else{
        options(i);
    };
}

function leavehome(i) {
    reposition[i][out[i].indexOf(0)] = 12*i;

    $("#"+players[i]+"Token"+token[out[i].indexOf(0)]).animate({left: `${x[0]}px`,top: `${y[0]}px`,position: "absolute"},200);
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

    return;
}

function sendhome(i,thistoken){
    alert("sent home");
    for(m=0;m<players[i].length-1;m++){
        for(o=0;o==4;o++){    
            if(xposition[m][o] == xposition[i][thistoken]){
                if(yposition[m][o] == yposition[i][thistoken]){
                    if(m !== i){
                        $("#"+players[m]+"Token"+token[o]).animate({left: `${initleft[m][o]}px`,top: `${inittop[m][o]}px`,position: "absolute"},200);
                        window.position[m][o]=0;
                        out[m][o]=0;
                        position[m][o]=0;
                        return;
                    };
                };
            };
        };
    };
}

function nextplayer(i){
    if(i == players.length-1){
        let i = 0;
        game(i);
    }else{
        game(i+1);
    };
}