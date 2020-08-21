//----------------------------------------------Number of Players selection------------------------------------

$("#numPlayersTwo").click(function(){
    localStorage.setItem("numplayer", 2);
});

$("#numPlayersFour").click(function(){
    localStorage.setItem("numplayer", 4);
});

results = [0,0,0,0];
token = ["One","Two","Three","Four"];
numberofplayers = 0;
players = ["blue","yellow","red","green"];
var dieone = [0,0,0,0];
var dietwo = [0,0,0,0];


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
                $("#"+players[results.indexOf(winner[0])]+"dice").css("z-index","3");;
                setTimeout(function(){alert (players[results.indexOf(winner[0])] + "  starts! " + results)},100);
                }},100);
            };
        },100);
}

function rollthedice(i){
    dieone[i] = Math.floor(Math.random()*6+1);
    dietwo[i] = Math.floor(Math.random()*6+1);
    $("#"+players[i]+"diceone").html(dieone[i]);
    $("#"+players[i]+"dicetwo").html(dietwo[i]);
    choosetoken(i);
};

$("#play").click(function starts(){
    $("#start").css("z-index","-1");
    $("#layer").css("background-image","none");
    let i = 0;
    whostarts(i);
});

$("#bluedice").on("click",function(){rollthedice(0)});
$("#yellowdice").on("click",function(){rollthedice(1)});
$("#reddice").on("click",function(){rollthedice(2)});
$("#greendice").on("click",function(){rollthedice(3)});

var blueonepos = 0;

function choosetoken(i){
    $("#layer").off("click");
    $("#dicewrapper").css("z-index","-1");
    $("#dicewrapper").css("top","200px");
    $("#dicewrapper").css("left","200px");
    $("#"+players[i]+"dice").css("z-index","1");
    $(".tokenwrapper"+players[i]).css("height","24px");
    $(".tokenwrapper"+players[i]).css("width","24px");
    $(".tokenwrapper"+players[i]).css("margin-left","-6px");
    $(".tokenwrapper"+players[i]).css("margin-top","-6px");
    options(i);
}

function options(i){
    $(".token"+players[i]).html(dieone[i]+","+dietwo[i]);
    $(".tokenwrapper"+players[i]).css("z-index","3");
    $("#"+players[i]+"TokenOne, #"+players[i]+"TokenTwo, #"+players[i]+"TokenThree, #"+players[i]+"TokenFour").css("z-index","3");
    tokenchose(i);
}

function tokenchose(i){
    $("#"+players[i]+"TokenOne, #"+players[i]+"TokenTwo, #"+players[i]+"TokenThree, #"+players[i]+"TokenFour").on("click",function(){
        tokenposition = $(this).position();
        $(".token"+players[i]).empty();
        $(".tokenwrapper"+players[i]).css("z-index","-1");
        $("#dicewrapper").css("z-index","3");
        $("#dicemoveone").html(dieone[i]);
        $("#dicemovetwo").html(dietwo[i]);
        $(".tokenwrapper"+players[i]).css("height","12px");
        $(".tokenwrapper"+players[i]).css("width","12px");
        $(".tokenwrapper"+players[i]).css("margin",`0px`);
        $(".tokenwrapper"+players[i]).css("margin-top",`0px`);
        $("#dicewrapper").css("left",tokenposition.left-20);
        $("#dicewrapper").css("top",tokenposition.top-35);
        $("#layer").on("click",function(){choosetoken(i)});
    });
}


function bluedice(){

let blueleft = [55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,30,55,80,105,130];
let bluetop = [180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,155,155,155,155,155];

var myVar = setInterval(myTimer, 500);
let i  = window.results[0];
let j = 0;
newpos = blueonepos+i;

function myTimer() {
    $("#blueTokenOne").css("top","0px");
    $("#blueTokenOne").css("left","0px");
    $("#blueTokenOne").css({"margin-left": blueleft[newpos-i+j]+"px","position": "absolute"});
    $("#blueTokenOne").css({"margin-top": bluetop[newpos-i+j]+"px","position": "absolute"});
  j++;
  if (j==i){
  var clear = clearInterval(myVar);
  blueonepos += j;
}
}
};