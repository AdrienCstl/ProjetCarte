var data;


// Fin des requetes

//create tab 
mapboxgl.accessToken = 'undefined';
var geojson = {
    "type": "FeatureCollection",
    "features": []
};
//add map
mapboxgl.accessToken = 'pk.eyJ1IjoiamVqZWxpbmsiLCJhIjoiY2pkMXBucjkxMjR5ZjMzbnhjbTFnZmN0cCJ9.0WHyMDjfg7YwuxWx7LPqcw';
var map = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [4.85, 45.75], // starting position
    zoom: 11.5 // starting zoom
});
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();



//add markers to map

function refresh() {
    var compteur = 0;
    
    geojson.features.forEach(function (marker) {
        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';
        el.addEventListener("click", afficherPopup);
        // el.toggleClass = 'infoPin';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

        el.id = compteur;
        compteur++;


    });

}

function afficherPopup(event) {

    var elem = data[event.target.id];
    afficheDetail(elem);
    var tmpDivItem = document.createElement('div');
    var tmpDivContent = document.createElement('div');
    var tmpDivMeta = document.createElement('div');
    var tmpDivDesc = document.createElement('div');
    var tmpDivExtra = document.createElement('div');
    var tmpSpan = document.createElement('span');
    var tmpP= document.createElement('p');
    var tmpH = document.createElement('a');

    tmpDivItem.style.display = "none";
    tmpDivItem.style.whiteSpace = "initial";
    tmpDivItem.style.overflow = "hidden";
    tmpDivItem.style.maxWidth = "253px";

   // tmpH.href = "#stats";
   tmpH.onclick = function() { $('html, body').animate({
    scrollTop: $("#stats").offset().top
}, 600); };
    


    tmpDivItem.className = 'item';
    tmpDivItem.id = 'popup';
    tmpH.className = "ui small header";
    tmpH.id = "titlePos";
    tmpDivMeta.className = "meta";
    tmpDivDesc.className = "description";
    tmpDivExtra.className = "extra";
    tmpDivContent.className = "content";

    



    tmpDivItem.append(tmpDivContent);
        tmpDivContent.append(tmpH);
            tmpH.append(elem.nom);
        tmpDivContent.append(tmpDivMeta);
            tmpDivMeta.append(tmpSpan);
                tmpSpan.innerHTML = "<i class=\"address book outline icon\"></i>" + elem.adresse + "<br>" +"&nbsp&nbsp&nbsp&nbsp&nbsp"+ elem.codepostal + "<br />"  +"&nbsp&nbsp&nbsp&nbsp&nbsp"+ elem.commune +"<br><br>"+ "<i class=\"phone icon\"></i> "+ elem.telephone ;
        tmpDivContent.append(tmpDivDesc);
            tmpDivDesc.append(tmpP);
        //tmpP.append(elem.adresse + bra + elem.codepostal + "<br />"  + elem.commune );
        tmpDivContent.append(tmpDivExtra);

    $("#navMap")[0].firstElementChild.replaceChild(tmpDivItem, $("#navMap")[0].firstElementChild.lastElementChild);
    $("#popup").slideToggle("fast");
    

}

function addMarkerstoList(features, data) {
    let currentSize = features.length;
    for (var i = currentSize; i < window.data.length + currentSize; i++) {
        features[i] = {};
        features[i].type = "Feature";
        features[i].properties = {message: data[i - currentSize].type};
        features[i].geometry = data[i - currentSize].geometry;
    }    
    
}

//Requetes AJAX
$.post("/data", function (d) {
    $(".result").html(d);
    data = d;

    addMarkerstoList(geojson.features, data);
    refresh();
});

function reload(){
    geojson.features = [];
    console.log(geojson.features);
    $.post("/data",{type:"HOTELLERIE"}, function (d) {
        $(".result").html(d);
        data = d;
    
        addMarkerstoList(geojson.features, data);
        refresh();
    });
}


function afficheDetail(elem){
	var premiereligne = $(".row")[0];
	var deuxiemeligne = $(".row")[1];
	
	//Champs à ajouter
	var titre = '<h3>' + elem.nom +'</h3>';
	var type = '<p>'+elem.type+'</p>';
	var description = "<p>Y a rien</p>";
	
	var horaire = "<p>"+elem.ouverture+ "</p>";
	
	var adresse = "<p>" +adresse + " " +elem.codepostal +" "+ elem.commune+"</p>";
	var contact = "<p>"+elem.telephone+"</p><p>"+elem.email+"</p>";
	
	
	//Ajout dans le template
	
	//Ajout dans la premiere ligne
		//Ajout dans la deuxieme colonne
		premiereligne.getElementsByClassName("thirteen wide column")[0].innerHTML = titre;
		premiereligne.getElementsByClassName("thirteen wide column")[0].innerHTML += type;
		premiereligne.getElementsByClassName("thirteen wide column")[0].innerHTML += description;
		
	//Ajout dans la deuxieme ligne
		//Ajout dans la premiere colonne
		deuxiemeligne.getElementsByClassName('three wide column')[0].innerHTML = horaire;
		
		//Ajout dans la deuxieme colonne
		deuxiemeligne.getElementsByClassName("ten wide column")[0].innerHTML = adresse;
		deuxiemeligne.getElementsByClassName("ten wide column")[0].innerHTML +=contact ;
}

function modifyType(){

    var dropdown = document.getElementById("cat");
    

    console.log(dropdown.value);
  //  reload();
}