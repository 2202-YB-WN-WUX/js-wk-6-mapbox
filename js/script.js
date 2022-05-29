mapboxgl.accessToken = '<enter your token here>';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/timstannard99/cl3rxi446000l14l8p2vo24xk', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});
