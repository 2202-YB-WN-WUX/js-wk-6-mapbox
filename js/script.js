
mapboxgl.accessToken = 'pk.eyJ1IjoidGltc3Rhbm5hcmQ5OSIsImEiOiJjbDNyeXVnbXQxbGc3M2pwZWg2aXQ0ZGFsIn0.h3xzbUHHOLncAwI8G0Sx9A';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/timstannard99/cl3rxi446000l14l8p2vo24xk', // style URL
    center: [174.7800920681949,-41.278951279883685], // starting position [lng, lat]
    zoom: 18 // starting zoom
});

map.addControl(new mapboxgl.FullscreenControl());

// all of this code is from the documentation
const customMarkers = {
  //declare the type of data we're giving to mapbox
  type: 'FeatureCollection',
  // declare our list of features
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [174.7800920681949,-41.278951279883685]
      },
      properties: {
        title: `
        <img class="popup-image" src="https://supermodel-bestawards.s3.amazonaws.com/resized/migrated/entry/1463/02_Yoobee_Logo-0-1172-0-826.jpg?k=acd4c5e2e7" alt="yoobee logo">
        <h1>Yoobee</h1>
        `,
        description: "School of design",
        customId: "test"
      }
    }, //end of first feature
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [174.7200920681949,-41.278951279883685]
      },
      properties: {
        title: `
        <img class="popup-image" src="https://media.istockphoto.com/photos/3d-rendering-brick-house-isolation-on-a-white-3d-illustration-picture-id1337434489?b=1&k=20&m=1337434489&s=170667a&w=0&h=Be7c31gM3b-sDHIRqCXPNcqamruzf9RUhVrdL3Wrs60=" alt="yoobee logo">
        <h1>My house</h1>
        `,
        description: "a bit fire"
      }
    }
  ]
}

// render the custom markers
function renderMarkers(currentMarker){
  let newMarkerElement  = document.createElement('div');
  newMarkerElement.className = 'marker';

  if (currentMarker.properties.customId == "test") {
    newMarkerElement.setAttribute("id","special-marker");
    newMarkerElement.style.background = "tomato";
  }

  new mapboxgl.Marker(newMarkerElement)
    .setLngLat(currentMarker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({
    offset: 25
    })
    .setHTML('<h3>' + currentMarker.properties.title + '</h3><p>' + currentMarker.properties.description + '</p>'))
    .addTo(map);
}

customMarkers.features.forEach(renderMarkers);


// Activity
// ---------
// Add a background image to the marker to make a marker icon.
// Add an image of Yoobee into the description of the popup.
//
// Create another point which is located on your house.
//
// Style the popup so it looks cool
