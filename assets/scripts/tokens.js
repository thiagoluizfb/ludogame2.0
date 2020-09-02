$(".board").hide();

let players = ["blue","yellow","red","green"];
let colors = ["blue","yellow","red","green"];
let token = ["One","Two","Three","Four"];

let redleft = [255,	230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,280,255,230,205,180];
let redtop = [130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,130,130,130,130,130,130];
let blueleft = [55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,30,55,80,105,130];
let bluetop = [180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,155,155,155,155,155];
let greenleft = [130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,155,155,155,155,155];
let greentop = [55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,30,55,80,105,130];        
let yellowleft = [180,180,180,180,205,230,255,280,305,305,305,280,255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,155,155,155,155,155];
let yellowtop = [255,230,205,180,180,180,180,180,180,155,130,130,130,130,130,130,105,80,55,30,5,5,5,30,55,80,105,130,130,130,130,130,130,155,180,180,180,180,180,180,205,230,255,280,305,305,280,255,230,205,180];



var moveleft =0;
var d_one= 0;
var d_two= 0;
var tokensathome = [4,4,4,4];

var thistoken = 0;
var remainToMove = 2;




var dieone = [0,0,0,0];
var dietwo = [0,0,0,0];
var results = [0,0,0,0];
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
            setTimeout(function(){alert (players[i] + "  starts!")},100);
            };
            game(i);
            return;
        },200);
    }
    },200);
    //return;
}

function game(i){
    remainToMove = 2;
    $("#dicemoveone").show();
    $("#dicemovetwo").show();
    $("#"+players[i]+"dice").css("background-color","rgba(150, 155, 80)");
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
    $("#"+players[i]+"dice").one("click",function() {
        $("#"+players[i]+"dice").css("background-color","white");
        rollthedice(i);
    });
    return;
}


function rollthedice(i){
    $("#"+players[i]+"dice").css("z-index","1");
    dieone[i] = Number(Math.floor(Math.random()*6+1));
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
            reposition[i][out[i].indexOf(0)] = 12*i;
            if(blockedposition.includes(reposition[i][thistoken]+1) == false){
                //alert("leaving die token" + thistoken);
                leavehome(i);
                dieone[i] = 0;
                $("#dicemoveone").hide();
                setTimeout(function(){givemesomespace(i)},500);
                if(remainToMove == 0){
                    nextplayer(i);
                    return;
                }
            };
        };
    };

    if(dietwo[i] == 5){
        if(out[i].includes(0)){
            thistoken = out[i].indexOf(0);
            reposition[i][out[i].indexOf(0)] = 12*i;
            if(blockedposition.includes(reposition[i][thistoken]+1) == false){
                //alert("leaving die token" + thistoken);
                leavehome(i);
                dietwo[i] = 0;
                $("#dicemovetwo").hide();
                setTimeout(function(){givemesomespace(i)},500);
                if(remainToMove == 0){
                    nextplayer(i);
                    return;
                }
            };
        };
    };
    if(remainToMove > 0){
       // alert("Remain to move");
        options(i);
        return;
    }else{
        nextplayer(i);
        return;
    }
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
    $(".mainlayer").html(`${position} </br> ${reposition} </br> ${blockedposition}`);
    reposition[i][out[i].indexOf(0)] = 12*i;
    $("#dicemoveone").off("click");
    $("#dicemovetwo").off("click");

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
    $(".mainlayer").html(`${position} </br> ${reposition} </br> ${blockedposition}`);
    return;
}

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

    
    $("#dicemoveone").one("click", function(){
        //alert("Moving from dicemoveone");
        moveleft  = dieone[i];
        dieone[i]=0;
        $(this).hide();
        move(i)});
    $("#dicemovetwo").one("click",function(){
        //alert("Moving from dicemovetwo");
        moveleft = dietwo[i];
        dietwo[i]=0;
        $(this).hide();
        move(i)});
    return;
}

function highlight(i){
    let n = 0;
    for(n=0;n<4;n++){
        if(out[i][n]>0){
            $("#"+players[i]+"Token"+token[n]).css("z-index","3");
            if(dieone[i]==0){
               $("#"+players[i]+"Token"+token[n]).children().children().html(`${dietwo[i]}<div class="chooseme"></div>`); 
            }else{
                if(dietwo[i]==0){
                    $("#"+players[i]+"Token"+token[n]).children().children().html(`${dieone[i]}<div class="chooseme"></div>`); 
                }else{
                    $("#"+players[i]+"Token"+token[n]).children().children().html(`${dieone[i]},${dietwo[i]}<div class="chooseme"></div>`);
                };
            };
            myposition = $("#"+players[i]+"Token"+token[n]).position();
            xposition[i][n] = Math.trunc(myposition.left);
            yposition[i][n] = Math.trunc(myposition.top);
        };
    };
    return;
}

function dehighlight(i){
    let n = 0;
    $("#dicewrapper").show();
    for(n=0;n<4;n++){
        if(out[i][n]>0){
           $("#"+players[i]+"Token"+token[n]).children().children().empty();
           $("#"+players[i]+"Token"+token[n]).children().off("click");
        };
    };
    return;
}

function move(i){
    if(remainToMove == 0){
        nextplayer(i);
    };
    //alert(players[i]+"Token"+token[thistoken]+" will move");
    $("#layer").off("click");
    $("#dicemoveone").off("click");
    $("#dicemovetwo").off("click");
    $("#dicewrapper").hide();
    let l = 0;
    let k = Number(window.moveleft);
    let j = thistoken;
    newpos = Number(position[i][j]+k);
    newrepos = Number(reposition[i][j]+k);
    
    if(blockedposition.includes(reposition[i][thistoken])){
        for(n=0;n<4;n++){
            //alert("Position this token "+reposition[i][n]);
            if(out[i][n]==1){
                $("#"+players[i]+"Token"+token[n]).css({"left": x[position[i][n]-1]+"px","top": y[position[i][n]-1]+"px","position": "absolute"});
            };
        };
        blockedposition.splice(blockedposition.indexOf(reposition[i][thistoken]),1);
    };

    //alert(newpos);

    var myVar = setInterval(myTimer, 200);
    
    function myTimer(){
        //alert("Ready to move");
        $("#"+players[i]+"Token"+token[thistoken]).animate({left: `${x[newpos-k+l]}px`,top: `${y[newpos-k+l]}px`,position: "absolute"},200);
        $("#"+players[i]+"Token"+token[thistoken]).css({"left": x[newpos-k+l]+"px","top": y[newpos-k+l]+"px","position": "absolute"});
        //$(".mainlayer").html(`${xposition} </br> ${yposition}`);
        l++;
        if (l==k){
            remainToMove -=1;
            position[i][j] = Number(newpos);
            reposition[i][j] = Number(newrepos);
            givemesomespace(i);
            
            //return;
           // alert(position[i]);
           if(i==players.length-1){     
               //alert(remainToMove);
               if(remainToMove>0){
                   $(".mainlayer").html(`${position} </br> ${reposition} </br> ${blockedposition}`);
                   checkFive(i);
                   clearInterval(myVar);
                   return;
               }else{
                   $(".mainlayer").html(`${position} </br> ${reposition} </br> ${blockedposition}`);
                   nextplayer(i);
                   clearInterval(myVar);
                   return;
               };
            }else{
                //alert(remainToMove);
                if(remainToMove>0){
                   $(".mainlayer").html(`${position} </br> ${reposition} </br> ${blockedposition}`);
                   checkFive(i);
                   clearInterval(myVar);
                   return;
               }else{
                   $(".mainlayer").html(`${position} </br> ${reposition} </br> ${blockedposition}`);
                    nextplayer(i);
                    clearInterval(myVar);
                    return;
               };
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
    myposition = $("#"+players[i]+"Token"+token[thistoken]).position();
    xposition[i][thistoken] = Math.trunc(myposition.left);
    yposition[i][thistoken] = Math.trunc(myposition.top);

    //var hi = setInterval(iampassing,1);

    //function iampassing(){

    var shield = 0;
    var b = 0;
    for(r=0;r<reposition.length;r++){
        if(r!=thistoken){
            if(reposition[i][r] == reposition[i][thistoken]){
                shield += 1;
                b = r;
            };
        };
    };


   //alert("Tokenshere: "+ shield);

    var hit = 0;
    var m = 0;
    var o = 0;
    for(h=0;h<reposition.length;h++){
        for(a=0;a<players.length;a++){
            if(a!=i){
                if(reposition[a][h] == reposition[i][thistoken]){
                    hit = 1;
                    m = a;
                    o = h;
                };
            };
        };
    };

   if(hit>1){alert("Number of hits: " + hit)};

    if(shield>0){
        alert("Activate Shield");
        blockspace(i,b,thistoken);
        return;
    };

    if(hit>0){
         alert("Go home");
        sendhome(m,o);
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

function blockspace(i,b,thistoken){
    if(blockedposition.includes(reposition[i][thistoken])==false){
        blockedposition.push(reposition[i][thistoken]);
        $("#"+players[i]+"Token"+token[b]).animate({left: `-=5px`,top: `-=5px`,position: "absolute"},100);
        $("#"+players[i]+"Token"+token[thistoken]).animate({left: `+=5px`,top: `+=5px`,position: "absolute"},100);
        $(".mainlayer").html(`${position} </br> ${reposition} </br> ${blockedposition}`);
        return;
    };
}