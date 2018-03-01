var data;


// Fin des requetes

//add positions
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

function refresh(){
    var compteur = 0;
    geojson.features.forEach(function(marker) {
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
    $(".infoPin").toggle;


}

function addMarkerstoList(features, data) {
    let currentSize = features.length;
    for(var i = currentSize; i <  window.data.length + currentSize; i++){
        features[i] = {};
        features[i].type = "Feature";
        features[i].properties = {message: data[i-currentSize].type};
        features[i].geometry = data[i-currentSize].geometry;
    }


}

//Requetes AJAX
$.post( "/data" ,function(d) {
    $( ".result" ).html( d );
    data = d;
    console.log(data);

    addMarkerstoList(geojson.features, data);
    console.log(geojson.features);
    refresh();
});