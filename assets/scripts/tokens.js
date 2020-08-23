//----------------------------------------------Number of Players selection------------------------------------

$("#numPlayersTwo").click(function(){
    localStorage.setItem("numplayer", 2);
});

$("#numPlayersFour").click(function(){
    localStorage.setItem("numplayer", 4);
});
m =0;
results = [0,0,0,0];
token = ["One","Two","Three","Four"];
numberofplayers = 0;
players = ["blue","yellow","red","green"];
var dieone = [0,0,0,0];
var dietwo = [0,0,0,0];
var position = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

$("#play").click(function starts(){
    $("#start").css("z-index","-1");
    $("#layer").css("background-image","none");
    let i = 0;
    let m = i;
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
                alert ("two winners " + winner +"results:"+ results);
                let i = 0;
                whostarts(i);                    
            }else{
            i = results.indexOf(winner[0]);
            $("#"+players[results.indexOf(winner[0])]+"dice").css("z-index","3");;
            setTimeout(function(){alert (players[i] + "  starts! " + results)},100);
            };
            $("#"+players[i]+"dice").one("click",function() {game(i)});
        },100);
    }
    },100);
}

function game(i){
    rollthedice(i);
    $("#"+players[i]+"TokenOne, #"+players[i]+"TokenTwo, #"+players[i]+"TokenThree, #"+players[i]+"TokenFour").on("click",function(){
        $("#"+players[i]+"TokenOne, #"+players[i]+"TokenTwo, #"+players[i]+"TokenThree, #"+players[i]+"TokenFour").css("z-index","1");
        tokenposition = $(this).position();
        movetoken = token.indexOf($(this).attr('id').slice($(this).attr('id').indexOf("Token")+5));
        alert("this is the token "+movetoken);
        tokenchose(i);
    });
    $("#dicemoveone").one("click",function(){move(i)});
}

function rollthedice(i){
        alert("rollthedice"+players[i]);
        dieone[i] = Math.floor(Math.random()*6+1);
        dietwo[i] = Math.floor(Math.random()*6+1);
        $("#"+players[i]+"diceone").html(dieone[i]);
        $("#"+players[i]+"dicetwo").html(dietwo[i]);
        choosetoken(i);
}

function choosetoken(i){
    alert("choosetoken"+players[i]);
    $("#layer").off("click");
    $("#dicewrapper").css("z-index","-1");
    $("#dicewrapper").css("top","200px");
    $("#dicewrapper").css("left","200px");
    $("#"+players[i]+"dice").css("z-index","1");
    $(".tokenwrapper"+players[i]).css("z-index","1");
    $(".tokenwrapper"+players[i]).css("height","24px");
    $(".tokenwrapper"+players[i]).css("width","24px");
    $(".tokenwrapper"+players[i]).css("margin-left","-6px");
    $(".tokenwrapper"+players[i]).css("margin-top","-6px");
    $(".token"+players[i]).html(dieone[i]+","+dietwo[i]);
    $("#"+players[i]+"TokenOne, #"+players[i]+"TokenTwo, #"+players[i]+"TokenThree, #"+players[i]+"TokenFour").css("z-index","3");
    return;
}


function tokenchose(i){
    alert("tokenchose"+players[i]);
    $(".token"+players[i]).empty();
    $(".tokenwrapper"+players[i]).css("z-index","-1");
    $("#dicewrapper").css("z-index","3");
    $("#dicemoveone").css("z-index","3");
    $("#dicemovetwo").css("z-index","3");
    $("#dicemoveone").html(dieone[i]);
    $("#dicemovetwo").html(dietwo[i]);
    $(".tokenwrapper"+players[i]).css("height","12px");
    $(".tokenwrapper"+players[i]).css("width","12px");
    $(".tokenwrapper"+players[i]).css("margin",`0px`);
    $(".tokenwrapper"+players[i]).css("margin-top",`0px`);
    $("#dicewrapper").css("left",tokenposition.left-20);
    $("#dicewrapper").css("top",tokenposition.top-35);
    $("#layer").on("click",function(){choosetoken(i)});
    return;
}




function move(i){
    alert(players[i]+"Token"+token[Number(movetoken)]+" will move");
    $("#dicewrapper").css("z-index","-1");
    let redleft = [255,	230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,280,255,230,205,180];
    let redtop = [130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,130,130,130,130,130,130];
    let blueleft = [55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,30,55,80,105,130];
    let bluetop = [180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,155,155,155,155,155];
    let greenleft = [255,	230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,280,255,230,205,180];
    let greentop = [130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,130,130,130,130,130,130];
    let yellowleft = [55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,30,55,80,105,130];
    let yellowtop = [180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,155,155,155,155,155];
    
    if(i===0){
        x = blueleft;
        y = bluetop;
    }else{
        if(i===1){
            x = yellowleft;
            y = yellowtop;
        }else{
            if(i===2){
                x = redleft;
                y = redtop;
            }else{
                if(i===3){
                    x = greenleft;
                    y = greentop;
                };
                };
            };
        }


    let k  = dieone[i]+dietwo[i];
    let l = 0;
    let j = movetoken;
    newpos = Number(position[i][j])+k;
    alert(newpos);

    var myVar = setInterval(myTimer, 500);
    
    function myTimer(){

        $("#"+players[i]+"Token"+token[movetoken]).css({"left": x[newpos-k+l]+"px","position": "absolute"});
        $("#"+players[i]+"Token"+token[movetoken]).css({"top": y[newpos-k+l]+"px","position": "absolute"});
        l++;
        if (l==k){
            var clear = clearInterval(myVar);
            position[i][j] += l;
            alert(position[i]);
            if(i==3){
                let i = 0;
                game(i);
            }else{
                i++;
                game(i);
            }
        }
    }
}