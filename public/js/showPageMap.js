
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
    center: JSON.parse(loc), // starting position [lng, lat]
    zoom: 8 // starting zoom
});


new mapboxgl.Marker()
    .setLngLat(JSON.parse(loc))
    .addTo(map)