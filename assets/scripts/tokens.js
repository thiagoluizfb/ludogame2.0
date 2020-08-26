let numberofplayers = 0;
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

var tomove = [];
var thistoken = 0;
var remainToMove = 2;
var dieone = [0,0,0,0];
var dietwo = [0,0,0,0];
var results = [0,0,0,0];
var position = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var out = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var xposition = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var yposition = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

$(".board").hide();

$("#play").click(function starts(){
    $(".board").show();
    $("#start").css("z-index","-1");
    $("#layer").css("background-image","none");
    let i = 0;
    whostarts(i);
});

function whostarts(i){
    dieone[i] = Math.floor(Math.random()*6+1);
    dietwo[i] = Math.floor(Math.random()*6+1);
    $("#"+players[i]+"diceone").html(dieone[i]);
    $("#"+players[i]+"dicetwo").html(dietwo[i]);
    results[i] = dieone[i] + dietwo[i];
    setTimeout(function(){
        $("#"+players[i]+"dice").css("z-index","1");
        if(i<4){
            whostarts(i+1);
        }
        if (i==3){
            setTimeout(function(){
                results.pop();
                winner = Array.from(results);
                winner.sort(function(a, b){return b-a});
            if (winner[0]===winner[1]){
                //alert ("two winners " + winner +"results:"+ results);
                let i = 0;
                whostarts(i);                    
            }else{
            i = results.indexOf(winner[0]);
            $("#"+players[results.indexOf(winner[0])]+"dice").css("z-index","3");;
            setTimeout(function(){alert (players[i] + "  starts! " + results)},100);
            };
            game(i);
        },100);
    }
    },100);
}

function game(i){
    remainToMove = 2;
    $("#dicemoveone").show();
    $("#dicemovetwo").show();
    //i=3; 
    if(i==0){
        x = blueleft;
        y = bluetop;
    }else{
        if(i==1){
            x = yellowleft;
            y = yellowtop;
        }else{
            if(i==2){
                x = redleft;
                y = redtop;
            }else{
                if(i==3){
                    x = greenleft;
                    y = greentop;
                };
            };
        };
    };

    $("#layer").off("click");
    $("#"+players[i]+"dice").css("z-index","3");
    $("#"+players[i]+"dice").one("click",function() {rollthedice(i);});
    return;
}


function rollthedice(i){
    $("#"+players[i]+"dice").css("z-index","1");
    dieone[i] = Math.floor(Math.random()*6+1);
    dietwo[i] = Math.floor(Math.random()*6+1);
    $("#"+players[i]+"diceone").html(dieone[i]);
    $("#"+players[i]+"dicetwo").html(dietwo[i]);
    checkFive(i);
}

function checkFive(i){
    if(out[i].includes(0)){
        var hiFive = dieone[i] == 5 || dietwo[i] == 5;
        if (hiFive==true){
        //alert("Hi five");
            if (dieone[i] === 5){
                //alert("Die one is 5");
                dieone[i] = 0;
                $("#dicemoveone").hide();
                leavehome(i);
                remainToMove -=1;
            };
            if(dietwo[i] === 5){
               // alert("Die two is 5");
                //alert(out[i]);
                dietwo[i] = 0;
                $("#dicemovetwo").hide();
                leavehome(i);
                remainToMove -=1;
            };
        }else{
            if(out[i].includes(1)){
                //alert("We want to move");
                options(i);
                return;
            };
        };
        if(remainToMove === 1){
            //alert("remaintomove");
            options(i);
        }else{
            if(i === 3){
               let i = 0;
               game(i);
            }else{
                game(i+1);
            };
        }
    }else{
        alert("No token inside home, calling options");
        options(i);
    };
    return;    
}

function leavehome(i) {
    $("#"+players[i]+"Token"+token[out[i].indexOf(0)]).css({"left": x[0]+"px","position": "absolute"});
    $("#"+players[i]+"Token"+token[out[i].indexOf(0)]).css({"top": y[0]+"px","position": "absolute"});
    $("#"+players[i]+"Token"+token[out[i].indexOf(0)]).css("z-index","3");
    //alert("#"+players[i]+"Token"+token[out[i].indexOf(0)]);
    out[i][out[i].indexOf(0)] = 1;
    //alert(out);
    return;
    };

function options(i){
    //alert("I am in options remain to move: "+remainToMove);
    $("#layer").off("click");
    $("#dicemoveone").off("click");
    $("#dicemovetwo").off("click");
    $("#dicewrapper").hide();
    $("#"+players[i]+"dice").css("z-index","1");
    
    highlight(i);

    $(".tokenwrapper"+players[i]).one("click",function(){
        $(this).parent().css("z-index","1");
        dehighlight(i);
        $("#dicewrapper").show();
        thistoken = token.indexOf($(this).parent().attr('id').slice($(this).parent().attr('id').indexOf("Token")+5));
        $("#dicewrapper").css("z-index","3");
        $("#dicemoveone").css("z-index","3");
        $("#dicemovetwo").css("z-index","3");
        $("#dicemoveone").html(dieone[i]);
        $("#dicemovetwo").html(dietwo[i]);
        $("#dicewrapper").css("left", xposition[[i]][thistoken]-20);
        $("#dicewrapper").css("top", yposition[[i]][thistoken]-35);
        $("#layer").on("click",function(){options(i)});       
        return;
        //alert("this is the token "+ thistoken);
        //alert("my position is: left "+xposition[[i]][thistoken]+" and top "+yposition[[i]][thistoken]);
        //alert("My position is left: "+xposition[i][token.indexOf(players[i]))
    });
    $("#dicemovetwo").one("click", function(){move(i)});
    $("#dicemoveone").one("click", function(){move(i)});
    return;
}

function highlight(i){
    let n =0
    for(n=0;n<4;n++){
        if(out[i][n]>0){
            $("#"+players[i]+"Token"+token[n]).css("z-index","3");
            $("#"+players[i]+"Token"+token[n]).children().children().html(`${dieone[i]+dietwo[i]}<div class="chooseme"></div>`);
            myposition = $("#"+players[i]+"Token"+token[n]).position();
            xposition[i][n] = myposition.left;
            yposition[i][n] = myposition.top;
        };
    };
    return;
}

function dehighlight(i){
    let n =0
    for(n=0;n<4;n++){
        if(out[i][n]>0){
           $("#"+players[i]+"Token"+token[n]).children().children().empty();
        };
    };
    return;
}

function move(i){
    //alert(players[i]+"Token"+token[thistoken]+" will move");
    $("#layer").off("click");
    $("#dicemoveone").off("click");
    $("#dicemovetwo").off("click");
    $("#dicewrapper").css("z-index","-1");
    let k  = dieone[i]+dietwo[i];
    let l = 0;
    let j = thistoken;
    newpos = Number(position[i][j])+k+1;
    
    //alert(newpos);

    var myVar = setInterval(myTimer, 500);
    
    function myTimer(){ 
        $("#"+players[i]+"Token"+token[thistoken]).css({"left": x[newpos-k+l]+"px","position": "absolute"});
        $("#"+players[i]+"Token"+token[thistoken]).css({"top": y[newpos-k+l]+"px","position": "absolute"});
        l++;
        if (l==k){
            clear = clearInterval(myVar);
            position[i][j] += l;
           // alert(position[i]);
           if(i==3){
               let i = 0;
               game(i);
            }else{
                game(i+1);
            };
        };
    return;
    };
    return;   
}