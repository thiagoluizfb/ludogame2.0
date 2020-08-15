//----------------------------------------------Number of Players selection------------------------------------

$("#numPlayersTwo").click(function(){
    localStorage.setItem("numplayer", 2);
});

$("#numPlayersFour").click(function(){
    localStorage.setItem("numplayer", 4);
});



$("#firstdice").click(function (){
    document.getElementById("numplayers").innerHTML = localStorage.getItem("numplayer");
    $(this).css("z-index","-1");
    var bluediceone = Math.floor(Math.random()*6+1);
    var bluedicetwo = Math.floor(Math.random()*6+1);
    $("#bluediceone").html(bluediceone);
    $("#bluedicetwo").html(bluedicetwo);
    localStorage.setItem("resultblue", bluediceone+bluedicetwo);
});

$("#bluedice").click(function (){
    var resultblue = 0;
    document.getElementById("numplayers").innerHTML = localStorage.getItem("numplayer");
    var bluediceone = Math.floor(Math.random()*6+1);
    var bluedicetwo = Math.floor(Math.random()*6+1);
    $("#bluediceone").html(bluediceone);
    $("#bluedicetwo").html(bluedicetwo);
    localStorage.setItem("resultblue", bluediceone+bluedicetwo);
});

var blueonepos = 0;

$("#blueTokenTwo").click(function(){

let blueleft = [55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,30,55,80,105,130];
let bluetop = [180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,155,155,155,155,155];

var myVar = setInterval(myTimer, 500);

let i  = localStorage.getItem("resultblue");
let j = 0;
newpos = blueonepos+i;

function myTimer() {
    /*$("#blueTokenTwo").css("z-index","-1");*/
$("#blueTokenOne").css("z-index","1");
  $("#blueTokenOne").css({"margin-left": blueleft[newpos-i+j]+"px","position": "absolute"});
  $("#blueTokenOne").css({"margin-top": bluetop[newpos-i+j]+"px","position": "absolute"});
  $("#blueTokenOne").html(newpos);
  j++;
  if (j==i){
  var clear = clearInterval(myVar);
  blueonepos += j;
}
}
});
