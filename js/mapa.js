var mapa;
function initMap() {
    mapa = new google.maps.Map(document.getElementById('mapa'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}
