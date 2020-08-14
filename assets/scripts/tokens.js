$("#blueTokenOne").click(function(){

let blueleft = [55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,30,55,80,105,130];
let bluetop = [180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,155,155,155,155,155];

var myVar = setInterval(myTimer, 500);

let i = 52 //Math.floor(Math.random() * 10+1);
let j = 0;

function myTimer() {
  $("#blueTokenOne").css({"margin-left": blueleft[j]+"px","position": "absolute"});
  $("#blueTokenOne").css({"margin-top": bluetop[j]+"px","position": "absolute"});
  $("#blueTokenOne").html(j+1);
  j++;
  if (j==i){
  var clear = clearInterval(myVar);
}
}
});
