//key from mapbox account
const key = 'pk.eyJ1IjoiYWFyamF2YyIsImEiOiJjazBwbGkzd2swNnRvM2xxbGUyd3J5d3p3In0.g-pcOPmMcYV48Bnx99NODA'

//map options created online on mapbox
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

//array storing pixel locations of viewable capitals
let capitalArray = [];

let connectionLines = 2

function preload() {
  data = loadJSON('country_capitals.json')
}

function setup() {
  canvas = createCanvas(700, 700);
  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  // Only redraw the meteorites when the map change and not every frame.
  myMap.onChange(mapCapitals);
  //  drawCapitals();
//  fill(255, 255, 255);
//  noStroke()
}

function draw() {
  clear();
  drawCircles()
  drawConnections(capitalArray)
}

function drawCircles(){
  push()
  noStroke()
  fill(125, 125, 125)
  for (var i = 0; i < capitalArray.length; i++) {
    var latitude = capitalArray[i][0];
    var longitude = capitalArray[i][1];
    var radius = 10 + 10 * sin(frameCount / 50);
    circle(latitude, longitude, radius)
  }
  pop()
}

function drawConnections(pointsArray){
  push()
  stroke(random(255)* sin(frameCount / 5), random(255)* sin(frameCount / 5), random(255)* sin(frameCount / 5))
  for (var i = 0; i < pointsArray.length; i++) {
    if (pointsArray.length > 1 && i < pointsArray.length-1) {
      line(pointsArray[i][0], pointsArray[i][1], pointsArray[i+1][0], pointsArray[i+1][1])
    }else if (pointsArray.length > 2 && i == pointsArray.length-1) {
      line(pointsArray[i][0], pointsArray[i][1], pointsArray[0][0], pointsArray[0][1])
    }
  }
  console.log()
  pop()
}

//read JSON file
//get the latitudes and longitudes of the capitals
//convert and map them to pixels on the canvas
//store them in the capitalArray
function mapCapitals(){

  capitalArray.length = 0;

  for (var i = 0; i < 240; i++) {
    const latitude = Number(data[i].CapitalLatitude);
    const longitude = Number(data[i].CapitalLongitude);
    if (myMap.map.getBounds().contains([latitude, longitude])) {
      const position = myMap.latLngToPixel(latitude, longitude);
      capitalArray.push([position.x, position.y]);
    }
  }
}
