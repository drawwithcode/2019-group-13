// DATA

var databaseToilet;
var storeToiletText;

var play;
var mySong;
var audioCtx;

var socket;
var newRequest;
var requestIp;
var richieste;
var requestProceed = true;




$.getJSON('https://json.geoiplookup.io/api?callback=?', function(data) {
  console.log(data);

  requestIp = data.ip;

});

/* Initialise Reverse Geocode API Client */
var reverseGeocoder = new BDCReverseGeocode();

/* Get the current user's location information, based on the coordinates provided by their browser */
/* Fetching coordinates requires the user to be accessing your page over HTTPS and to allow the location prompt. */
reverseGeocoder.getClientLocation(function(result) {

  newRequest = result;



});

/* Get the administrative location information using a set of known coordinates */
reverseGeocoder.getClientLocation({
  latitude: -33.8688,
  longitude: 151.2093,
}, function(result) {
  // console.log(result);
});

/* You can also set the locality language as needed */
reverseGeocoder.localityLanguage = 'es';

/* Request the current user's coordinates (requires HTTPS and acceptance of prompt) */
reverseGeocoder.getClientCoordinates(function(result) {
  // console.log(result);
});


function preload() {
  // allaccia il database dei luoghi
  databaseToilet = loadJSON("toilets/toilets.json");
  play = loadImage('addons/imgs/play.png');
  // mySong = loadSound("addons/music/songs/3.mp3");
  richieste = loadJSON("richieste.json");
}



function loadToilets() {

  var toiletName = [];

  for (var i = 0; i <= databaseToilet.lista_comuni.length; i++) {
    // all inside toilet_container
    var toiletContainer = select('#toilet_container');

    // toilet fantoccio (crea una finta toilet finale per aiutare nello scroll)
    if (i == databaseToilet.lista_comuni.length) {
      var fakeletDiv = createDiv();
      fakeletDiv.id('t_final');
      toiletContainer.child('t_final');
    } else {

      // toilet div
      var toiletUrl = databaseToilet.lista_comuni[i].nome_url;
      toiletName.push(databaseToilet.lista_comuni[i].nome_comune);
      var toiletId = 't_' + toiletUrl;
      var toiletDiv = createDiv();
      toiletDiv.addClass('toilet_door');
      toiletDiv.id(toiletId);
      toiletDiv.attribute("data-toilet_name",toiletName[i]);
      toiletDiv.attribute("onmouseover","getToiletText(" + "'" + toiletName[i] + "'" + ")");
      toiletDiv.attribute("onmouseout","restoreToiletText()");

      var toiletImgDiv = createDiv();
      toiletImgDiv.class("toilet_image");
      toiletImgDiv.style("background-image","url('images/"+toiletUrl+".png')");


      // toiletDiv.style("background-image","url('images/"+toiletUrl+".png')");
      // toiletDiv.style("background-size","240px 420px");
      // var toiletGeoYes = createElement("p","YOU ARE HERE!");


      // creazione lista città
      var toiletElement = createElement("option",toiletName[i]);
      toiletElement.attribute("value",toiletName[i]);
      var selectLista = select('#listaCitta')
      selectLista.child(toiletElement);

      // $("#inputCitta").attr("onchange","toiletSearch()");

      // link
      var toiletLink = createElement("a");
      var getLink = "/toilets/" + toiletUrl + "/" + toiletUrl + ".html"; // costruzione stringa URL (pagine locate su /toilets)
      toiletLink.attribute("href", getLink);
      toiletLink.class("toilet_wrap");


      // toilet divs -> links -> toilet container
      toiletDiv.parent(toiletLink);
      toiletImgDiv.parent(toiletDiv);
      toiletContainer.child(toiletLink);

      // toiletDiv.mouseOver(function(){
      //
      //   console.log(toiletDiv.attribute("data-toilet_name"));
      //
      // });

    }
  }

  $("#toiletNumber").html(databaseToilet.lista_comuni.length + " toilets accessible");

}

function getToiletText(name) {
  storeToiletText = name.toUpperCase();
  // var toiletInput = select('#inputCitta');
  // toiletInput.attribute("value",name.toUpperCase());
  // console.log(name);
}

function getInputText(){
  // var toiletInput = select('#inputCitta');
  // storeToiletText = toiletInput.value();
  // console.log(storeToiletText);
}

function restoreToiletText(){
  storeToiletText = "YOUR";
}

function updateToiletText() {
  var toiletInput = select('#inputCitta');
  toiletInput.attribute("value", storeToiletText);
}



// SCROLL ARROWS
$("#left_arrow").click(scrollL);
$("#right_arrow").click(scrollR);


function scrollR() {
  getScroll = $("#toilet_container").scrollLeft();
  $("#toilet_container").scrollLeft(getScroll + 332);
  console.log(getScroll);
}

function scrollL() {
  getScroll = $("#toilet_container").scrollLeft();
  $("#toilet_container").scrollLeft(getScroll - 332);
  console.log(getScroll);
}


function setup() {
  containsIp(richieste, newRequest.ip);
  newRequest.ip = requestIp;
  audioCtx = new AudioContext();
  audioCtx.suspend()
  socket = io();
  noCanvas();

  // LOAD TOILETS
  loadToilets();

  infoContainer = createDiv();
  infoContainer.id("infoContainer")

  infoCentrale = createDiv("SELECT A TOILET. </br> EACH TOILET REPRESENT A GEOGRAPHICAL AREA.  </br> YOU CAN VISIT ALL OF THEM. </br> YOU CAN ONLY WRITE ON THE TOILET IN YOUR AREA. </br> CAN’T FIND YOUR PUBLIC TOILET? REQUEST ONE");
  infoCentrale.id("infoCentrale");
  infoCentrale.parent("infoContainer");


  $("#infoContainer > div").addClass("infoStyle")

  // mySong.play();
  // LOAD TOILET SEARCH
  //toiletSearch();
$(".requestButton").click(requestFunction)

}


// function keyTyped() {
//   if (key === 'm') {
//     audioCtx.resume();
//     if (!mySong.isPlaying()) {
//       mySong.play();
//     } else {
//       mySong.pause();
//     }
//   }
// }


function draw() {

  getInputText();
  updateToiletText();

  $("#infoContainer").click(function(){
    $("#infoContainer").css("display","none")
  });
  $("#infoDiv").click(function(){
    $("#infoContainer").css("display","block")
  });

}





function containsIp(arr, val) {

for (var i = 0; i < arr.richieste.length; i++) {
  if (arr.richieste[i].ip === val) {
    requestProceed = false;
    $(".requestButton").css("display","none")
    console.log("non puoi1");
  }
}

}

function requestFunction() {

containsIp(richieste, newRequest.ip);

// if (richieste.some(item => item.ip === newRequest.ip)) {
//   requestProceed = false;
// }

if (requestProceed == true) {

    var sendRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newRequest
    }

    socket.emit('sendRequest', sendRequest);

    location.reload();


} else {
  console.log("non puoi2")
}

}
