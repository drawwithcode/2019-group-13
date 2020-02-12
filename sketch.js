var container;            //div globale
var tile;
var tileDim = 1080;       //grandezza tile
var tileNum = 50;         //numero tile per lato
var tileSet = [];         //array di tile
var texts;                //jsonfile
var currentText;          //testo in json
var currentPar;           //div json
var socket;
var database;
var drag;
var testoACASO;
var json;

//GEOLOCATION
var fence;
var fenceOptions;
var databaseLuoghi;
var position;

// var lat = 45.46430956029815; var lon = 9.191909471183184;     // MILANO (centro: duomo)

var citta = "Gallarate";
var polygon_citta = [];  // poligono del luogo



function preload() {

  // allaccia il database scritte
  database = loadJSON("DB.json");

  // allaccia il database dei luoghi
  databaseLuoghi = loadJSON("comuni2019_ypt.json");


}




function setup() {

  noCanvas();

  // GEOLOCATION

  // itera tutti i comuni
  for (var j = 0; j < databaseLuoghi.lista_comuni.length; j++){
      // cerca quello giusto
      if ( databaseLuoghi.lista_comuni[j].nome_comune == citta) {
          // crea il poligono con le coordinate
          for (var i = 0; i < databaseLuoghi.lista_comuni[j].coordinate.length; i++) {
                  var polygon_tmp = { lat: databaseLuoghi.lista_comuni[j].coordinate[i][1], lon:  databaseLuoghi.lista_comuni[j].coordinate[i][0]}
                  polygon_citta.push(polygon_tmp);
          }
      }
    }


  // stabilisci zona tramite poligono di zona
  fence = new geoFencePolygon(polygon_citta);






  // socket per aggiornare in tempo reale
  socket = io();

  socket.on('database', function() {
    database = loadJSON("DB.json");
    setTimeout(function() {
      prova_due(database);
    }, 500);
    console.log("bella");
  });


  //crea il container
  container = createElement("section");
  container.id("container")
  container.style("width", tileDim * tileNum + "px")
  container.style("height", tileDim * tileNum + "px")
  container.style("border", "1px solid black")


  //crea i tile
  for (var j = 0; j < tileNum; j++) {
    for (var i = 0; i < tileNum; i++) {
      tile = createDiv("t" + ((i + 1) + (j * tileNum)));
      tileSet[(i + 1) + (j * tileNum)] = tile;
      tile.id("t" + ((i + 1) + (j * tileNum)))
      tile.position(i * tileDim, j * tileDim)
      tile.style("width", tileDim + "px")
      tile.style("height", tileDim + "px")
      tile.style("border", "1px solid black")
    }
  }

  input = createInput();
  input.position(20, 65);

  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(greet);

  greeting = createElement('h2', 'what is your name?');
  greeting.position(20, 5);

  textAlign(CENTER);
  textSize(50);

  prova_tre(database);

}


function greet() {

  var name = input.value();
  greeting.html('hello ' + name + '!');

  json = {
    testo: name
  }
  setTimeout(function() {
    drag = true;
  }, 100);

}


function mouseClicked() {
  json = {
    testo: json.testo,
    top: "" + mouseX,
    left: "" + mouseY
  };
  if (drag == true) {

    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    }

    socket.emit('options', options);

    database = loadJSON("DB.json");
    setTimeout(function() {
      prova_due(database);
    }, 100);

    drag = true;
  }
}


function prova_due(database) {
  var ultimo = database.testi.length - 1;
  currentText = database.testi[ultimo].testo;
  textSize(100);
  currentPar = createDiv(currentText);
  currentPar.position(database.testi[ultimo].top, database.testi[ultimo].left);
};


function prova_tre(database) {
  for (var i = 0; i < database.testi.length; i++) {
    currentText = database.testi[i].testo;
    currentPar = createDiv(currentText);
    currentPar.position(database.testi[i].top, database.testi[i].left);
  }
};


function draw() {
    checkPosition();
}


function checkPosition() {
  // controllo sei-di-zona
  if (fence.insideFence) {
    console.log('sei un fra di zona');
  }
  else {
    console.log('non sei un fra di zona');
  }

  console.log(position.latitude);
  console.log(position.longitude);
}
