/**
 * Created by sachin on 17/12/16.
 */
$(document).ready(function () {
    $.get('/getSeasonTeam', getTeam);
    $("#season").click(function () {
        $.get('/getSeasonTeam', getTeam);
    });
    $("#daily").click(function () {
        $.get('/getDailyTeam', getTeam);
    });

    $("#starters").height(screen.height*0.6+"px").width(screen.width*0.85+"px");
    $("#bench").height(screen.height*0.2+"px");
    $("#weights").width(screen.width*0.1+"px");
});
var  weight=[5,5,5,5,5,5,5,5,5];
function renderTeam(terms) {
    $('#starters').empty();
    $('#bench').empty();
    for( var i=0; i<terms.length; i++) {
        if(i<5){
            $("#starters")
                .append('<img style="width: 18%; padding-left: 10px; position: absolute; top:'+35+'%; left: '+20*i+'%" data-toggle="tooltip" title="'+terms[i].playerInfo.PLAYER_NAME+'" src = "http://stats.nba.com/media/players/230x185/'+terms[i].id+'.png">');
        }else{
            $("#bench")
                .append('<img style="width: 14%; padding-left: 10px" data-toggle="tooltip" title="'+terms[i].playerInfo.PLAYER_NAME+'" src = "http://stats.nba.com/media/players/230x185/'+terms[i].id+'.png">');
        }
    }

}
var seasondata;
var getTeam = function (data) {
    $('#weights').empty();
    seasondata=data;
    for(var j=0;j<5;j++){
        $("#weights").append("<div style='display: flex; width: 100%'><p style='width: 50%; padding-left: 5px;'>"+data[j].name+" :</p><input id='"+j+"' style='width: 50%;height: 50%;'></div>");
        $("#"+j).val("5");
    }
    $("input").keyup(function (ev) {
        weight=[];
        for(var j=0;j<5;j++){
            weight.push($("#"+j).val());
        }
        getPlayers(seasondata,12,weight);
    });
    getPlayers(seasondata,12,weight);
};
var getPlayers = function (data,num,weight) {
    var Team = [];
    var ids=[];
    var players=[];
    data.forEach(function (stat,index) {
        stat.playerstats.forEach(function (player) {
            if(!isNaN((5-index)*weight[index]))
                players.push({id:player.PLAYER_ID,playerInfo:player,points:(5-index)*weight[index]});
        });
    });
    players.sort(function (a,b) {
        if(b.points > a.points){
            return 1;
        }else if(a.points > b.points){
            return -1;
        }else{
            return 0;
        }
    });
    for(var i=0;i<num;i++){
        if(ids.indexOf(players[i].id)==-1){
            Team.push(players[i]);
            ids.push(players[i].id);
        }else{
            num++;
        }
    }
    renderTeam(Team);
};