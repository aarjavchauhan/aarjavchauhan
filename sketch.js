const key = 'pk.eyJ1IjoiYWFyamF2YyIsImEiOiJjazBwbGkzd2swNnRvM2xxbGUyd3J5d3p3In0.g-pcOPmMcYV48Bnx99NODA'

const options = {
  lat: 0,
  lng: 0,
  zoom: 2,
  studio: true,
  style: 'mapbox://styles/aarjavc/ck0pqwlex9c311dp94np4zbq7',
};

// Create an instance of Mapbox
const mappa = new Mappa('Mapbox', key);
let myMap;

let canvas;
let meteorites;

function preload() {
  data = loadJSON('country_capitals.json')
}

function setup() {
  canvas = createCanvas(800, 700);

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // Load the data
  meteorites = loadTable('Meteorite_Landings.csv', 'csv', 'header');

  // Only redraw the meteorites when the map change and not every frame.
  //myMap.onChange(drawMeteorites);
  drawCapitals();
  fill(109, 255, 0);
  stroke(100);
}

// The draw loop is fully functional but we are not using it for now.
function draw() {}

function drawCapitals() {
  clear();
  console.log(data)
  for (var i = 0; i < 240; i++) {
    const latitude = Number(data[i].CapitalLatitude);
    const longitude = Number(data[i].CapitalLongitude);
    if(isNaN(latitude) || latitude == 0 || longitude == 0)
    {
      console.log(data[i].CountryName);
    }
  }
}

var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

function drawMeteorites() {
  // Clear the canvas
  clear();

  for (let i = 0; i < meteorites.getRowCount(); i += 1) {
    // Get the lat/lng of each meteorite
    const latitude = Number(meteorites.getString(i, 'reclat'));
    const longitude = Number(meteorites.getString(i, 'reclong'));

    // Only draw them if the position is inside the current map bounds. We use a
    // Mapbox method to check if the lat and lng are contain inside the current
    // map. This way we draw just what we are going to see and not everything. See
    // getBounds() in https://www.mapbox.com/mapbox.js/api/v3.1.1/l-latlngbounds/
    if (myMap.map.getBounds().contains([latitude, longitude])) {
      // Transform lat/lng to pixel position
      const pos = myMap.latLngToPixel(latitude, longitude);
      // Get the size of the meteorite and map it. 60000000 is the mass of the largest
      // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
      let size = meteorites.getString(i, 'mass (g)');
      size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
      ellipse(pos.x, pos.y, size, size);
    }
  }
}
