var statistics =
    {
        NumOfDemocrats: 0,
        NumOfRepublicans: 0,
        NumOfIndependents: 0,
        NumTotal: 0,
        AverageVotesWithPartyForDemocrats: 0,
        AverageVotesWithPartyRepublicans: 0,
        AverageVotesWithPartyIndependents: 0,
        LeastEngagedNames: 0,
        MostEngagedNames: 0,
        LeastLoyalNames: 0,
        MostLoyalNames: 0,
        };

function totalMembers() {
    for (i = 0; i < members.length; i++) {
        if (members[i]) {
            statistics.NumTotal++;
        }
    }
}

totalMembers();

statistics.NumTotal = members.length;

function numMembers() {
    
    for (i = 0; i < members.length; i++) {
        if (members[i].party == "D") {
            statistics.NumOfDemocrats++;
            statistics.AverageVotesWithPartyForDemocrats += (members[i].votes_with_party_pct) / statistics.NumTotal
        }
        if (members[i].party == "R") {
            statistics.NumOfRepublicans++;
            statistics.AverageVotesWithPartyRepublicans += (members[i].votes_with_party_pct) / statistics.NumTotal
        }  
        if (members[i].party == "I") {
            statistics.NumOfIndependents++;
            statistics.AverageVotesWithPartyIndependents += (members[i].votes_with_party_pct) / statistics.NumTotal
        }  
    }
}
    numMembers()

    var tabla = "<tr><td>"+"Democrats"+"</td><td>"+statistics.NumOfDemocrats+"</td><td>"+statistics.AverageVotesWithPartyForDemocrats.toFixed(2)+"</td><tr>"+"<tr><td>"+"Republicans"+"</td><td>"+statistics.NumOfRepublicans+"</td><td>"+statistics.AverageVotesWithPartyRepublicans.toFixed(2)+"</td><tr>"+"<tr><td>"+"Independents"+"</td><td>"+statistics.NumOfIndependents+"</td><td>"+statistics.AverageVotesWithPartyIndependents.toFixed(2)+"</td></tr>"+"<tr><td>"+"Total"+"</td><td>"+statistics.NumTotal+"</td><td>"+""+"</td></tr>"

    document.getElementById("atGlance").innerHTML = "<tr><thead><th>"+'Party'+"</th><th>"+'Number of Reps'+"</th><th>"+'% Votes with Party'+"</th></thead></tr><tbody>"+tabla+"</tbody>"

    function tenPCT(array, pct, key, least) {
    var sortedArray
    if(least){
       sortedArray = [...array].sort(function(a,b){return a[key] - b[key]})
    } else {
       sortedArray = [...array].sort(function(a,b){return b[key] - a[key]}) 
    }
    
    var aux = []
    i = 0
    
    while(i < pct){
        aux.push(sortedArray[i])
        if(i > 0 && sortedArray[i][key] == sortedArray[i - 1][key]){
            pct ++
        }
        i++
    }
    return aux
}

     var leastAttendance = tenPCT(members, members.length/10,"missed_votes_pct",false)
     statistics.leastAttendance = leastAttendance

     var mostAttendance = tenPCT(members, members.length/10,"missed_votes_pct",true)
     statistics.mostAttendance = mostAttendance

     var leastAttendanceParty = tenPCT(members, members.length/10,"votes_with_party_pct",true)
     statistics.leastAttendance = leastAttendanceParty

     var mostAttendanceParty = tenPCT(members, members.length/10,"votes_with_party_pct",false)
     statistics.mostAttendance = mostAttendanceParty

function listarDatos(list,key1,key2) {
   var l_tabla = list.map(function(o) {
     return "<tr><td> <a href = "+o.url+">"+o.first_name+" "+(o.middle_name||"") +" " +o.last_name +"</td><td>"+o[key1]+"</td><td>"+o[key2]+"</td></tr>"
     }).join("") 
   return l_tabla
}

function listarTitulosMissed(){
   return  "<tr><thead><th>"+"Name"+"</th><th>"+"Number of Missed Votes"+"</th><th>"+"% Missed"+"</th></thead></tr><tbody>"   
}

function listarTitulosParty(){
   return  "<tr><thead><th>"+"Name"+"</th><th>"+"Number of Party Votes"+"</th><th>"+"% Party Votes"+"</th></thead></tr><tbody>"
}

if(document.getElementById("leastEngagedBottom")) {
  document.getElementById("leastEngagedBottom").innerHTML=listarTitulosMissed()+listarDatos(leastAttendance,"missed_votes","missed_votes_pct")+"</tbody>";  
}

if(document.getElementById("mostEngagedTop")){
   document.getElementById("mostEngagedTop").innerHTML=listarTitulosMissed()+listarDatos(mostAttendance,"missed_votes","missed_votes_pct")+"</tbody>";   
}    

if(document.getElementById("leastLoyal")){
    document.getElementById("leastLoyal").innerHTML=listarTitulosParty()+listarDatos(leastAttendanceParty,"total_votes","votes_with_party_pct")+"</tbody>";  
} 

if(document.getElementById("mostLoyal")){
    document.getElementById("mostLoyal").innerHTML=listarTitulosParty()+listarDatos(mostAttendanceParty,"total_votes","votes_with_party_pct")+"</tbody>";
}
   



