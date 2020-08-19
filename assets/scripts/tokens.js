//----------------------------------------------Number of Players selection------------------------------------

$("#numPlayersTwo").click(function(){
    localStorage.setItem("numplayer", 2);
});

$("#numPlayersFour").click(function(){
    localStorage.setItem("numplayer", 4);
});

results = [0,0,0,0];
numberofplayers = 0;
players = ["blue","yellow","red","green"];



function whostarts(i){
        var dieone = Math.floor(Math.random()*6+1);
        var dietwo = Math.floor(Math.random()*6+1);
        $("#"+players[i]+"diceone").html(dieone);
        $("#"+players[i]+"dicetwo").html(dietwo);
        window.results[i] = dieone + dietwo;
        setTimeout(function(){
            //$("#"+players[i]+"dice").off("click");
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
                //$("#"+players[results.indexOf(winner[0])]+"dice").on("click",function(){rollthedice(results.indexOf(winner[0]))});
                setTimeout(function(){alert (players[results.indexOf(winner[0])] + "  starts! " + results)},100);
                }},100);
            };
        },100);
}

function rollthedice(i){
    var dieone = Math.floor(Math.random()*6+1);
    var dietwo = Math.floor(Math.random()*6+1);
    $("#"+players[i]+"diceone").html(dieone);
    $("#"+players[i]+"dicetwo").html(dietwo);
    if (dieone === 5 || dietwo ===5){
        $("#blueTokenOne").animate({left: blueleft[0],top:bluetop[0]});
        window.results[i] = 0;
        //$("#"+players[i]+"dice").off("click");
        $("#"+players[i+1]+"dice").on("click",function(){rollthedice(i+1)});
    }else{
        alert("no movement");
    }
};

$("#start").click(function starts(){
    $(this).css("z-index","-1");
    let i = 0;
    whostarts(i);
});


var blueonepos = 0;

$("#bluedice").on("click",function(){choosetoken()});
$("#blueTokenOne").on("click",function(){
    $(".tokenwrapper").css("height","12px");
    $(".tokenwrapper").css("width","12px");
    $(".tokenwrapper").css("margin-left",`+=50%`);
    $(".tokenwrapper").css("margin-top",`+=50%`);
    bluedice();
});

function choosetoken(){
    $(".tokenwrapper").css("height","24px");
    $(".tokenwrapper").css("width","24px");
    $(".tokenwrapper").css("margin-left",`-=50%`);
    $(".tokenwrapper").css("margin-top",`-=50%`);
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