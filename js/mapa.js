var mapa;

function initMap() {
    mapa = new google.maps.Map(document.getElementById('mapa'), {
        center: {lat: -2.1446708, lng: -79.9677112},
        zoom: 18
    });
}