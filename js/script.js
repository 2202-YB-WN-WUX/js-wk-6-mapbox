mapboxgl.accessToken = 'pk.eyJ1IjoidGltc3Rhbm5hcmQ5OSIsImEiOiJjbDJ2Y3l5eG4wYXQ1M2pvYXQ0enV1djZjIn0.-5tfA6QNFW8egI8KDX_Twg';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/timstannard99/cl3rxi446000l14l8p2vo24xk', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});
