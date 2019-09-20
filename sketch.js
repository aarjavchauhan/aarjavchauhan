const key = 'pk.eyJ1IjoiYWFyamF2YyIsImEiOiJjazBwbGkzd2swNnRvM2xxbGUyd3J5d3p3In0.g-pcOPmMcYV48Bnx99NODA'

const options = {
  lat: 28.6,
  lng: 77.200000,
  zoom: 6,
  studio: true,
  style: 'mapbox://styles/aarjavc/ck0pqwlex9c311dp94np4zbq7',
};

// Create an instance of Mapbox
const mappa = new Mappa('Mapbox', key);
let myMap;
let canvas;

let capitalArray = [];

function preload() {
  data = loadJSON('country_capitals.json')
}

function setup() {
  canvas = createCanvas(500, 500);

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // Only redraw the meteorites when the map change and not every frame.
  myMap.onChange(mapCapitals);

  //  drawCapitals();
  fill(255, 255, 255);
  noStroke()
}

function draw() {
clear();
for (var i = 0; i < capitalArray.length; i++) {
    var latitude = capitalArray[i][0];
    var longitude = capitalArray[i][1];
    var radius = 10 + 10 * sin(frameCount / 50);
    circle(latitude, longitude, radius)
    }
}


function mapCapitals() {

  capitalArray.length = 0;

  for (var i = 0; i < 240; i++) {
    const latitude = Number(data[i].CapitalLatitude);
    const longitude = Number(data[i].CapitalLongitude);
    if (myMap.map.getBounds().contains([latitude, longitude])) {
      const position = myMap.latLngToPixel(latitude, longitude);
      capitalArray.push([position.x, position.y]);
      //ellipse(position.x, position.y, 10, 10)
    }
  }
}
