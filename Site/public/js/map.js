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

    geojson.features.forEach(function (marker) { //pour tous les markers de la liste
        // create a HTML element for each feature
        var el = document.createElement('i');//création des éléments markers

        el.className = 'grey large link map pin  icon';

        el.addEventListener("click", afficherPopup);//ajout d'un listener dessus
        // el.toggleClass = 'infoPin';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el) //ajout le nouveau marker a la map selon la position
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

        el.id = compteur; // incrémentation de l'id du compteur pour le lier à la liste de markers
        compteur++;


    });

}

function afficherPopup(event) {//lors du clique sur un marker

    var elem = data[event.target.id];
    afficheDetail(elem);//afficher les details dans la partie stats

    //création des elements
    var tmpDivItem = document.createElement('div');
    var tmpDivContent = document.createElement('div');
    var tmpDivMeta = document.createElement('div');
    var tmpDivDesc = document.createElement('div');
    var tmpDivExtra = document.createElement('div');
    var tmpSpan = document.createElement('span');
    var tmpP= document.createElement('p');
    var tmpH = document.createElement('a');

    //ajout du CSS
    tmpDivItem.style.display = "none";
    tmpDivItem.style.whiteSpace = "initial";
    tmpDivItem.style.overflow = "hidden";
    tmpDivItem.style.maxWidth = "253px";

   // tmpH.href = "#stats";
   tmpH.onclick = function() { $('html, body').animate({
    scrollTop: $("#stats").offset().top
    }, 600); };

    //ajout du nom des class

    tmpDivItem.className = 'item';
    tmpDivItem.id = 'popup';
    tmpH.className = "ui small header";
    tmpH.id = "titlePos";
    tmpDivMeta.className = "meta";
    tmpDivDesc.className = "description";
    tmpDivExtra.className = "extra";
    tmpDivContent.className = "content";



    //ajout des éléments créés dans la page

    tmpDivItem.append(tmpDivContent);
        tmpDivContent.append(tmpH);
            tmpH.append(elem.name);
        tmpDivContent.append(tmpDivMeta);
            tmpDivMeta.append(tmpSpan);
            tmpSpan.innerHTML = "<i class=\" marker icon\"></i>" + elem.address + "<br>" +"&nbsp&nbsp&nbsp&nbsp&nbsp"+ elem.postcode + "<br />"  +"&nbsp&nbsp&nbsp&nbsp&nbsp"+ elem.town +"<br><br>"+ "<i class=\"phone icon\"></i> "+ elem.phone + "<br><br>" + "<i class=\"globe icon\"></i><a href='"+  elem.website +"'> " + elem.website + "</a>";
             tmpDivContent.append(tmpDivDesc);
            tmpDivDesc.append(tmpP);
        //tmpP.append(elem.adresse + bra + elem.codepostal + "<br />"  + elem.commune );
        tmpDivContent.append(tmpDivExtra);

    $("#navMap")[0].firstElementChild.replaceChild(tmpDivItem, $("#navMap")[0].firstElementChild.lastElementChild);
    $("#popup").slideToggle("fast");


}

function addMarkerstoList(features, data) {//ajout des markers a la liste de marker
    let currentSize = features.length;
    for (var i = currentSize; i < window.data.length + currentSize; i++) {
        features[i] = {};
        features[i].type = "Feature";
        features[i].properties = {message: data[i - currentSize].type};
        features[i].geometry = {};
        features[i].geometry.type = "Point";
        features[i].geometry.coordinates = [];
        features[i].geometry.coordinates[0] = data[i - currentSize].pos.x;
        features[i].geometry.coordinates[1] = data[i - currentSize].pos.y;
    }

}

//Requetes AJAX
$.post("/data",{type: "all"}, function (d) {
    $(".result").html(d);
    data = d;

    addMarkerstoList(geojson.features, data);
    refresh();
});

function reloadType(){
    geojson.features = []; //on vide le tableau de markers

    var dropdown = document.getElementById("cat");
    console.log(dropdown.value);
    $.post("/data",{type:dropdown.value}, function (d) { //on récupere les données selon le type
        $(".result").html(d);
        data = d;
        $('.pin').remove();//on supprime les markers
        addMarkerstoList(geojson.features, data); // on ajoute les markers a la liste depuis les données
        refresh(); //refresh la map
    });
}

//Effectue un tri par type
function modifyType(){
   reloadSearch();// on appelle la fonction de rechargement
}

function afficheDetail(elem){
	var premiereligne = $(".row")[0];
	var deuxiemeligne = $(".row")[1];

	//Champs à ajouter
	var titre = '<h3>' + elem.name +'</h3>';
	var type = '<p>'+elem.type+'</p>';
	var description = "<p>Y a rien</p>";

	var horaire = "<p>"+elem.hours+ "</p>";

	var adresse = "<p> <i class=\"map marker icon\"></i> " +elem.address + ", " +elem.postcode +" "+ elem.town+"</p>";

  var contact = "<p  > <i class=\"phone icon\"></i>"+" "+elem.phone+"</p><a href='"+elem.website+"'><i class=\"globe icon\"></i>"+" "+elem.website+"</a>";

    var icon;

  var ul=document.createElement('ul');
  ul.id = "horaires";
    for(var i = 0;i<7;i++){
        var li=document.createElement('li');
        ul.append(li);
        li.innerHTML = elem.hours[i];
    }
    console.log(elem.hours[0]);
    console.log(ul);
    if(elem.photos)
    {
        var photos = elem.photos;
        icon = "<img src='"+photos[0]+"'>";
        if(photos.length > 1)
        {
            deuxiemeligne.getElementsByClassName("three wide column")[1].innerHTML = "<img src='"+photos[1]+"'>"
        }
    }else {
        icon = "<img src='"+elem.icon+"'>"
    }

	//Ajout dans le template

	//Ajout dans la premiere ligne
		//Ajout dans la deuxieme colonne
		premiereligne.getElementsByClassName("thirteen wide column")[0].innerHTML = titre;
		premiereligne.getElementsByClassName("thirteen wide column")[0].innerHTML += type;
		premiereligne.getElementsByClassName("thirteen wide column")[0].innerHTML += description;
        premiereligne.getElementsByClassName("three wide column")[0].innerHTML= icon;
	//Ajout dans la deuxieme ligne
        //Ajout dans la premiere colonne

		deuxiemeligne.getElementsByClassName('three wide column')[0].replaceChild(ul,deuxiemeligne.getElementsByClassName('three wide column')[0].firstChild);

		//Ajout dans la deuxieme colonne
		deuxiemeligne.getElementsByClassName("ten wide column")[0].innerHTML = adresse;
		deuxiemeligne.getElementsByClassName("ten wide column")[0].innerHTML +=contact ;
}

//TODO: Mettre un temporisateur "entre chaque clic sur le Search

//Tri par nom
function reloadSearch(){
    geojson.features = []; //on vide le tableau de markers
    var nameSearch = document.getElementsByTagName("input")[0].value;
    var typeSearch = document.getElementById("cat").value;

    //Recherche par nom et type
    if(nameSearch != "" && typeSearch != "all")
    {
        $.post("/data",{name:nameSearch, type: typeSearch}, function (d) {
            $(".result").html(d);
            data = d;
            $('.pin').remove();
            addMarkerstoList(geojson.features, data);
            refresh();
        });
    }
    //Recherche par nom
    else if(nameSearch != "")
    {
        $.post("/data",{name:nameSearch}, function (d) {
            $(".result").html(d);
            data = d;
            $('.pin').remove();
            addMarkerstoList(geojson.features, data);
            refresh();
        });
    }
    //Recherche par type
    else if (typeSearch != "all") {
        $.post("/data",{type:typeSearch}, function (d) {
            $(".result").html(d);
            data = d;
            $('.pin').remove();
            addMarkerstoList(geojson.features, data);
            refresh();
        });
    }
    //On envoi toutes les données
    else {
        //Requetes AJAX
        $.post("/data",{type: "all"}, function (d) {
            $(".result").html(d);
            data = d;
            $('.pin').remove();
            addMarkerstoList(geojson.features, data);
            refresh();
        });
    }
}

//slider
var slider = document.getElementById('slider');
noUiSlider.create(slider, {
  start: [ 0,  23], // Handle start position
  step: 1, // Slider moves in increments of '10'
  margin: 1, // Handles must be more than '20' apart
  connect: true, // Display a colored bar between the handles
  orientation: 'horizontal', // Orient the slider vertically
  behaviour: 'tap-drag', // Move handle on tap, bar is draggable
  range: { // Slider can select '0' to '100'
  'min': 0,
  'max': 23
},
tooltips: true
});

slider.style.width = '180px';
slider.style.margin = '20 auto 20px';

slider.noUiSlider.on('update', function( values, handle ) {

  var value = values[handle];
});
