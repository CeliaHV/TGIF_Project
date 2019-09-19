var members = data.results[0].members

function filterMembers() {
    var checkedParties = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(function(input){return input.value})
    
    var selected = document.getElementById("states").value
    
    var filteredMembers = []
    filteredMembers= members.filter(function(member){
        return checkedParties.indexOf(member.party) != -1 && (selected == member.state || selected == "all")
    })

    var table = filteredMembers.map(function(obj){return "<tr><td> <a href = "+obj.url+">"+obj.first_name+" "+(obj.middle_name || '')+" "+obj.last_name+"</td><td>"+obj.party+"</td><td>"+obj.state+"</td><td>"+obj.seniority+"</td><td>"+obj.votes_with_party_pct+"%"+"</td></tr>"}).join("")


    document.getElementById("house_representatives").innerHTML = "<tr><th>Representative</th><th>Party</th><th>State</th><th>Seniority</th><th>% Votes with Party</th></tr>"+table
  }

    document.getElementById("D").onclick = function(){
        filterMembers()
    }
    document.getElementById("R").onchange = function(){
        filterMembers()
    }
    document.getElementById("I").onchange = function(){
        filterMembers()
    }
    document.getElementById("states").onchange = function(){
        filterMembers()
    }

    var arrayStates = []
     members.forEach(function(member) {
       if (arrayStates.indexOf(member.state) == -1){
        arrayStates.push(member.state)}
    })

    var optStates = arrayStates.map(function(states) {
            return "<option>"+states+"</option>"})

    document.getElementById("states").innerHTML = "<option value='all'>All</option>"+optStates

    var selected = document.getElementById("states").value


    filterMembers()
