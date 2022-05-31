
mapboxgl.accessToken = '<enter your token here>';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/timstannard99/cl3rxi446000l14l8p2vo24xk', // style URL
    center: [174.7800920681949,-41.278951279883685], // starting position [lng, lat]
    zoom: 12 // starting zoom
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
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [174.78114538352776,-41.29330983408602]
      },
      properties: {
        title: `
        <img class="popup-image" src="https://locations.kfc.com/permanent-b0b701/assets/images/kfc-hero.ed57ffa2.jpg" alt="kfc building">
        <h1>KFC Wellington Central</h1>
        `,
        description: "a bit yum",
        customId: "kfc"
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

  if (currentMarker.properties.customId == "kfc") {
    newMarkerElement.style.backgroundImage = "url('img/chicken.png')";
    newMarkerElement.style.backgroundSize = "contain";
    newMarkerElement.style.backgroundColor = "transparent";
    newMarkerElement.style.border = "none";
    newMarkerElement.style.backgroundRepeat = "no-repeat";
    newMarkerElement.style.backgroundPosition = "47%";
    newMarkerElement.style.width = "75px";
    newMarkerElement.style.height = "75px";
  }

  new mapboxgl.Marker(newMarkerElement)
    .setLngLat(currentMarker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({
    offset: 25
    })
    .setHTML('<h3>' + currentMarker.properties.title + '</h3><p>' + currentMarker.properties.description + '</p>'))
    .addTo(map);
}

// renders all markers
customMarkers.features.forEach(renderMarkers);

// Activity
// ---------

// Add another marker and make the location a KFC.

// Optional - once you've finished
// Customise the marker and make it look like a chicken.
const flyToKfcBtn = document.getElementById("fly-to-kfc");

flyToKfcBtn.onclick = function(){
  map.flyTo(
    {
      center: [174.78114538352776,-41.29330983408602],
      zoom: 15
    }
  );
}

const viewTePapaBtn = document.getElementById("view-te-papa");

viewTePapaBtn.onclick = function() {
  console.log("Viewing te-papa");
  const customMarkers = {
    //declare the type of data we're giving to mapbox
    type: 'FeatureCollection',
    // declare our list of features
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [174.78200469666365,-41.290532244541275]
        },
        properties: {
          title: `
          <h1>TE PAPA</h1>
          `,
          description: "Our museum",
          customId: "tepapa"
        }
      } //end of first feature
    ]
  }
  // render our tepapa marker
  customMarkers.features.forEach(renderMarkers);
  map.flyTo(
    {
      center: [174.78200469666365,-41.290532244541275],
      zoom: 15
    }
  );
}

// calculating distance

const geojson = {
  // Json uses single quotes
    'type': 'FeatureCollection',
    'features': []
};

// Used to draw a line between points
const linestring = {
    'type': 'Feature',
    'geometry': {
        'type': 'LineString',
        'coordinates': []
    }
};

const distanceContainer = document.getElementById('distance-container');

// this is copied over verbatim from the mapbox documentation

map.on('load', () => {
    console.log("loaded!");

    // add our source of data for the map to access

    map.addSource('geojson', {
        'type': 'geojson',
        'data': geojson
    });


    // Add styles to the map
    map.addLayer({
        id: 'measure-points',
        type: 'circle',
        source: 'geojson',
        paint: {
          // try changing these
            'circle-radius': 10,
            'circle-color': '#3f51b5'
        },
        filter: ['in', '$type', 'Point']
    });
    map.addLayer({
        id: 'measure-lines',
        type: 'line',
        source: 'geojson',
        layout: {
            'line-cap': 'round',
            'line-join': 'round'
        },
        paint: {
            'line-color': '#3f51b5',
            'line-width': 5
        },
        filter: ['in', '$type', 'LineString']
    });

    // click function to draw lines
    map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['measure-points']
        });

        // Remove the linestring from the group
        // so we can redraw it based on the points collection.
        if (geojson.features.length > 1) geojson.features.pop();

        // Clear the distance container to populate it with a new value.
        distanceContainer.innerHTML = '';

        // If a feature was clicked, remove it from the map.
        if (features.length) {
            const id = features[0].properties.id;
            geojson.features = geojson.features.filter(
                (point) => point.properties.id !== id
            );
        // only create the point if mouse is not hovering over marker point
        } else {
            const point = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [e.lngLat.lng, e.lngLat.lat]
                },
                'properties': {
                    'id': String(new Date().getTime())
                }
            };

            geojson.features.push(point);
            // log the features array to see our features
            // console.log(geojson.features);
        }

        // draw a line between points if a new one has been added
        if (geojson.features.length > 1) {
            linestring.geometry.coordinates = geojson.features.map(
                (point) => point.geometry.coordinates
            );
            // push the line string to our features
            geojson.features.push(linestring);

            // Populate the distanceContainer with total distance
            const distance = turf.length(linestring);

            // --------------this part is different--------------------
            // console.log("Raw distance: " + distance);
            // toLocaleString() rounds the number to 3 d.p.
            distanceContainer.innerHTML = `<span class="km">Total distance: ${Math.round(distance)}km</span>`;
        }
        // visually apply the new data to the map
        map.getSource('geojson').setData(geojson);
    });

    // check if mouse is moving - if so change the cursor
    map.on('mousemove', (event) => {
        const features = map.queryRenderedFeatures(event.point, {
            layers: ['measure-points']
        });
        // Change the cursor to a pointer when hovering over a point on the map.
        // Otherwise cursor is a crosshair.

        // Uses a ternary operator - a shorthand if else statement,
        // checks if a feature is being hovered over
        // https://www.w3schools.com/js/js_comparisons.asp
        map.getCanvas().style.cursor = features.length ? 'pointer' : 'copy';

        // mouse cursors: https://www.w3schools.com/cssref/tryit.asp?filename=trycss_cursor
        // try cell
    });

});
