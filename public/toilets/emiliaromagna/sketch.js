var container; //global container
var tile;
var tileDim = 1080; //tile dimension
var tileNum = 20; //number of tiles per side
var tileSet = []; //tile array
var texts; //JSON file
var currentText; //text in JSON
var currentPar;
var currentText2; //text in JSON
var currentPar2; //div JSON
var socket;
var database;
var drag;
var testoACASO;
var json;
var italicCheck = false;
var sizeVar = 10;
var name;
var check;
var hexColor = "ffffff";
var rotateVar = 0;
var trackingVar = 0;
var interlineaVar = 20;
var pesoVar = "500"
var stato = 0;
var statoEditor = 0;
var newRequest;
var requestIp;
var richieste;
var requestProceed = true;
var tilesArray;
var tileVisible;
var checkTile = false;
var middleElement;
var idTile = "t1";
var checkScroll = false;
var checkEditor = true;
var fence;
var fenceOptions;
var databaseLuoghi;
var position;

var audioCtx;
var play;
var mySong;

// CHANGE LOCATION HERE!
var citta = "Emilia Romagna";
var cittaUrl = "emiliaromagna";
var polygon_citta = []; // geographic polygon



// IP LOOKUP

// $.getJSON('https://json.geoiplookup.io/api?callback=?', function(data) {
//   console.log(data);
//
//   requestIp = data.ip;
//
// });
//
// /* Initialise Reverse Geocode API Client */
// var reverseGeocoder = new BDCReverseGeocode();
//
// /* Get the current user's location information, based on the coordinates provided by their browser */
// /* Fetching coordinates requires the user to be accessing your page over HTTPS and to allow the location prompt. */
// reverseGeocoder.getClientLocation(function(result) {
//
//   newRequest = result;
//
// });
//
// /* Get the administrative location information using a set of known coordinates */
// reverseGeocoder.getClientLocation({
//   latitude: -33.8688,
//   longitude: 151.2093,
// }, function(result) {
//   // console.log(result);
// });
//
// /* You can also set the locality language as needed */
// reverseGeocoder.localityLanguage = 'es';
//
// /* Request the current user's coordinates (requires HTTPS and acceptance of prompt) */
// reverseGeocoder.getClientCoordinates(function(result) {
//   // console.log(result);
// });




function preload() {

  //current toilet writing database
  database = loadJSON("DB.json");

  //toilets database
  databaseLuoghi = loadJSON("../toilets.json");

  // play = loadImage('../../addons/imgs/play.png');
  // // mySong = loadSound("../../addons/music/songs/3.mp3");
  // // richieste = JSON.stringify(richieste);
}


function setup() {
  // newRequest.ip = requestIp;

  noCanvas();

  // GEO CHECK
  for (var j = 0; j < databaseLuoghi.lista_comuni.length; j++) {
    // search the correct place
    if (databaseLuoghi.lista_comuni[j].nome_comune == citta) {
      // create the geopolygon with its coordinates
      for (var i = 0; i < databaseLuoghi.lista_comuni[j].coordinate.length; i++) {
        var polygon_tmp = {
          lat: databaseLuoghi.lista_comuni[j].coordinate[i][1],
          lon: databaseLuoghi.lista_comuni[j].coordinate[i][0]
        }
        polygon_citta.push(polygon_tmp);
      }
    }
  }
  // check if the location is inside the geopolygon
  fence = new geoFencePolygon(polygon_citta);



  // SOCKET
  socket = io();
  socket.on('database', function() {
    database = loadJSON("DB.json");
    setTimeout(function() {
      prova_due(database);
    }, 500);
    console.log("active socket");
  });


  // HTML CONTAINER AND MENU
  container = createElement("section");
  container.id("container")
  container.style("width", tileDim * tileNum + "px")
  container.style("height", tileDim * tileNum + "px")
  container.style("background-color", "black")
  container.style("border", "1px solid black")

  // info
  infoContainer = createDiv();
  infoContainer.id("infoContainer")
  infoEditor = createDiv("1) Write your paragraph (max 69 chars) </br></br> 2) Click on Preview </br></br> 3) Customize your text </br></br> 4) Find your spot on the toilet");
  infoEditor.id("infoEditor");
  infoEditor.parent("infoContainer");
  infoCentrale = createDiv("5) Press ALT to place your text");
  infoCentrale.id("infoCentrale");
  infoCentrale.parent("infoContainer");
  infoSearch = createDiv("Search the tile you want to go to (#tNUM)");
  infoSearch.id("infoSearch");
  infoSearch.parent("infoContainer");

  $("#infoContainer > div").addClass("infoStyle")

  // menu editor
  editorTextDiv = createDiv();
  editorTextDiv.id("editorTextDiv");
  editorTextDiv.class("menuDiv");
  editorText = createElement("text", "EDITOR");
  editorIcon = createImg("/images/icon_editor.png");
  editorIcon.class("icon");
  editorIcon.parent(editorTextDiv);
  editorText.parent(editorTextDiv);

  // menu exit
  exitDiv = createA("../../lobby.html", "");
  exitDiv.class("menuDiv");
  exitDiv.id("exitDiv")
  exitIcon = createImg("/images/icon_back.png");
  exitIcon.class("icon");
  exitText = createElement("text", "EXIT");
  exitIcon.parent(exitDiv);
  exitText.parent(exitDiv);

  // menu info
  infoDiv = createDiv();
  infoDiv.class("menuDiv");
  infoDiv.id("infoDiv");
  infoIcon = createImg("/images/icon_info.png");
  infoIcon.class("icon");
  infoText = createElement("text", "INFO");
  infoIcon.parent(infoDiv);
  infoText.parent(infoDiv);

  // menu tile search
  searchDiv = createDiv();
  searchDiv.class("menuDiv");
  searchDiv.id("searchDiv")
  searchIcon = createImg("/images/icon_search.png");
  searchIcon.class("icon");
  searchIcon.parent(searchDiv);


  // TILE CREATION
  for (var j = 0; j < tileNum; j++) {
    for (var i = 0; i < tileNum; i++) {
      tile = createDiv("t" + ((i + 1) + (j * tileNum)));
      tile.style("color", "#555")
      tileSet[(i + 1) + (j * tileNum)] = tile;
      tile.id("t" + ((i + 1) + (j * tileNum)))
      tile.class("tiles")
      tile.position(i * tileDim, j * tileDim)
      tile.style("width", tileDim + "px")
      tile.style("height", tileDim + "px")
      tile.style("border", "1px solid #444")
      tile.style("padding", "10px");
      tile.style("font-size", "16px");

    }
  }

  // TILE SEARCH
  tileCoordinate = createInput("#" + idTile);
  tileCoordinate.attribute("type", "text");
  tileCoordinate.attribute("maxlength","6");
  tileCoordinate.input(function() {
    setTimeout(function() {
      for (var i = 0; i < tileSet.length; i++) {
        if (tileCoordinate.value() == ("#" + tileSet[i + 1].id())) {
          // console.log("#"+tileSet[i+1].id());
          checkScroll = true;
          // tileCoordinate.value()
          scrollTo({
            top: tileSet[i + 1].y,
            left: tileSet[i + 1].x,
            behavior: 'smooth'
          });
          tileCoordinate.value("#t")
          check = false;

          setTimeout(function() {
            checkScroll = false;
            check = true;
          }, 2000);

        }
      }
    }, 700);

  })
  tileCoordinate.parent(searchDiv);
  tileCoordinate.class("searchText")

  textAlign(CENTER);
  textSize(50);

  prova_tre(database);

}




// SHOW MSG (IF NOT LOCATED)
function changeEditorText() {
  if (checkEditor == true) {
    editorText.html("YOU ARE NOT LOCATED IN " + citta.toUpperCase() + " :(")
    $("#editorTextDiv").css("bottom", "0vh")
    checkEditor = false;
  }
}

// CREATE EDITOR (IF LOCATED)
function createEditor() {
  if (checkEditor == true) {

    // global container
    editorDiv = createDiv();
    editorDiv.class("editorDiv")
    editorDiv.style("position", "fixed");
    editorDiv.style("bottom", "0");
    editorDiv.style("left", "0");
    editorDiv.style("width", "60%");
    editorDiv.style("height", "20%");
    editorDiv.style("z-index", "100");
    editorDiv.style("background-color", "black");

    // textarea
    textDiv = createDiv();
    input = createElement('textarea');
    input.attribute("placeholder", "Write something in 69 characters...")
    input.input(function() {
      preview();
    })
    input.attribute("maxlength", "69");
    input.parent(textDiv)
    input.class("textInput")
    textDiv.class("textDiv")
    button = createButton('PREVIEW');
    button.mousePressed(greet);
    button.parent(textDiv)

    // italic button
    button2 = createButton('italic');
    button2.mousePressed(italicFunction);

    // colorpicker
    button3 = createDiv();
    button3.id("colorPick")
    $("#colorPick").ColorPicker({
      flat: true,
      onChange: function(hsb, hex, rgb) {
        $('#colorSelector div').css('backgroundColor', '#' + hex);
        hexColor = hex;
        currentPar2.remove();
        preview();
      }
    });

    // size
    sizeText = createElement("text", "SIZE");
    sizeText.class("sliderText");
    sizeInput = createInput('size', 'range');
    sizeInput.input(sizeFunction);
    sizeInput.class("sizeInput");

    // rotation
    rotateText = createElement("text", "ROTATION");
    rotateText.class("sliderText");
    rotateInput = createInput('rotate', 'range');
    rotateInput.input(rotateFunction);

    // wrap each thing into its container
    firstSliderDiv = createDiv();
    firstSliderDiv.class("firstSliderDiv");
    sizeDiv = createDiv();
    rotateDiv = createDiv();
    sizeDiv.parent(firstSliderDiv);
    rotateDiv.parent(firstSliderDiv);
    sizeText.parent(sizeDiv);
    rotateText.parent(rotateDiv);
    sizeInput.parent(sizeDiv);
    rotateInput.parent(rotateDiv);



    // interlinea
    interlineaText = createElement("text", "LINE SPACING");
    interlineaText.class("sliderText");
    interlineaInput = createInput('interlinea', 'range');
    interlineaInput.input(interlineaFunction);

    // tracking
    trackingText = createElement("text", "LETTER SPACING");
    trackingText.class("sliderText");
    trackingInput = createInput('tracking', 'range');
    trackingInput.input(trackingFunction);

    // wrap each thing into its container
    secondSliderDiv = createDiv();
    secondSliderDiv.class("secondSliderDiv")
    threeDiv = createDiv();
    fourDiv = createDiv();
    threeDiv.parent(secondSliderDiv);
    fourDiv.parent(secondSliderDiv);
    interlineaText.parent(threeDiv);
    trackingText.parent(fourDiv);
    interlineaInput.parent(threeDiv);
    trackingInput.parent(fourDiv);



    // weight label
    pesoText = createElement("text", "WEIGHT");
    pesoText.class("sliderText");
    pesoText.style("margin-right", "20px");

    // light
    lightInput = createButton('L');
    lightInput.mousePressed(lightFunction);

    // normal
    normalInput = createButton('N');
    normalInput.mousePressed(normalFunction);

    // bold
    boldInput = createButton('B');
    boldInput.mousePressed(boldFunction);

    // color selector
    colorSelector = createDiv();

    // wrap each thing into its container
    thirdSliderDiv = createDiv();
    thirdSliderDiv.class("thirdSliderDiv")
    fiveDiv = createDiv();
    sixDiv = createDiv();
    sevenDiv = createDiv();
    fiveDiv.parent(thirdSliderDiv)
    sixDiv.parent(thirdSliderDiv)

    pesoText.parent(fiveDiv);
    lightInput.parent(fiveDiv)
    normalInput.parent(fiveDiv)
    boldInput.parent(fiveDiv)



    // italic
    italicText = createElement("text", "STYLE");
    italicText.class("sliderText");
    italicText.style("margin-right", "20px");
    italicText.parent(sixDiv);
    button2.parent(sixDiv)
    // colorSelector.parent(sevenDiv)

    // color selector
    sevenDiv.class("colorSelector")
    colorDiv = createDiv();
    colorDiv.parent(thirdSliderDiv)
    colorText = createElement("text", "COLOR");
    colorText.class("sliderText");
    colorText.parent(colorDiv)
    sevenDiv.parent(colorDiv)

    // wrap each thing into its container
    fourthSliderDiv = createDiv();
    fourthSliderDiv.class("fourthSliderDiv");
    fourthSliderDiv.style("padding", "0");
    button3.parent(fourthSliderDiv)

    // wrap each section into the editor
    textDiv.parent(editorDiv)
    firstSliderDiv.parent(editorDiv)
    secondSliderDiv.parent(editorDiv)
    thirdSliderDiv.parent(editorDiv)
    fourthSliderDiv.parent(editorDiv)

    checkEditor = false;
  }
}

// PREVIEW BUTTON CLICK
function greet() {
  name = input.value();
  check = true;

  json = {
    testo: name
  }
  setTimeout(function() {
    drag = true;
  }, 100);

  preview();
}


// CHECK FOR IP INTO richieste.JSON
function containsIp(arr, val) {

  for (var i = 0; i < arr.richieste.length; i++) {
    if (arr.richieste[i].ip === val) {
      requestProceed = false;
      console.log("non puoi1");
    }
  }
}

// REQUEST IP
function requestFunction() {
  containsIp(richieste, newRequest.ip);
  // if (richieste.some(item => item.ip === newRequest.ip)) {
  //   requestProceed = false;
  // }
  if (requestProceed == true) {
    if (drag == true) {
      var sendRequest = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: newRequest
      }
      socket.emit('sendRequest', sendRequest);
      location.reload();
    }
  } else {
    console.log("non puoi (requestFunction)")
  }
}




// SET TEXT ITALIC
function italicFunction() {
  if (italicCheck == true) {
    italicCheck = false;
    currentPar2.remove();
    preview();
  } else if (italicCheck == false) {
    italicCheck = true;
    currentPar2.remove();
    preview();
  }
}

// SET TEXT SIZE
function sizeFunction() {
  sizeVar = sizeInput.value();
  sizeVar = map(sizeVar, 0, 100, 10, 100)
  currentPar2.remove();
  preview();
}

// SET TEXT ROTATION
function rotateFunction() {
  rotateVar = rotateInput.value();
  rotateVar = map(rotateVar, 0, 100, -180, 180)
  currentPar2.remove();
  preview();
}

// SET TEXT LINE-SPACING
function interlineaFunction() {
  interlineaVar = interlineaInput.value();
  interlineaVar = map(interlineaVar, 0, 100, 0, 25);
  currentPar2.remove();
  preview();
}

// SET TEXT TRACKING
function trackingFunction() {
  trackingVar = trackingInput.value();
  trackingVar = map(trackingVar, 0, 100, -4, 50)
  currentPar2.remove();
  preview();
}

// SET TEXT LIGHT
function lightFunction() {
  pesoVar = "100";
  currentPar2.remove();
  preview();
}

// SET TEXT NORMAL
function normalFunction() {
  pesoVar = "500";
  currentPar2.remove();
  preview();
}

// SET TEXT BOLD
function boldFunction() {
  pesoVar = "700";
  currentPar2.remove();
  preview();
}



// PLACE TEXT
function keyPressed() {
  if (keyCode == 18) {
    json = {
      testo: json.testo,
      top: "" + (mouseX + scrollX),
      left: "" + (mouseY + scrollY),
      peso: pesoVar,
      italic: italicCheck,
      colore: "#" + hexColor,
      rotazione: rotateVar,
      scale: sizeVar / 10,
      interlinea: interlineaVar,
      tracking: trackingVar
    }

    if (drag == true) {
      var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json,
        http: "toilets/" + cittaUrl
      }

      socket.emit('options', options);
      //console.log(options.body)

      // prova_due(database);
      database = loadJSON("DB.json");
      setTimeout(function() {
        prova_due(database);
      }, 100);

      // prova_due(database);
      database = loadJSON("DB.json");
      setTimeout(function() {
        prova_due(database);
      }, 1000);

      // reiterate db refresh
      setTimeout(function() {
        prova_due(database);
      }, 2000);

      // reiterate db refresh
      setTimeout(function() {
        prova_due(database);
      }, 4000);


      drag = true;
    }

    drag = false;
    input.value("");
    check = false;

  };

  if (keyCode == 27) {
    check = false;
  };
}


// PREVIEW FUNCTION
function preview() {
  if (currentPar2) {
    currentPar2.remove();
  }
  if (check == true) {
    name = input.value();
    json = {
      testo: name
    }
    currentText2 = input.value();
    textSize(100);
    currentPar2 = createDiv(currentText2);
    currentPar2.style("white-space", "pre-wrap")
    currentPar2.style("width", "fit-content")
    currentPar2.style("font-family", "Helvetica")
    currentPar2.style("letter-spacing", trackingVar + "px")
    currentPar2.style("line-height", interlineaVar + "px")
    currentPar2.style("color", "#" + hexColor);
    currentPar2.style("pointer-events", "none");
    currentPar2.style("transform", "scale(" + sizeVar / 10 + ") rotate(" + rotateVar + "deg)");
    currentPar2.style("font-weight", pesoVar);
    currentPar2.style("z-index", "101");
    if (italicCheck == true) {
      currentPar2.style("font-style", "italic");
    } else {
      currentPar2.style("font-style", "normal");
    }
  }
  // if (check == false) {
  //   return;
  // }
  // preview();
  // var observer = new IntersectionObserver(function(entries) {
  // // isIntersecting is true when element and viewport are overlapping
  // // isIntersecting is false when element and viewport don't overlap
  //
  //   if(entries[0].isIntersecting === true){
  //     checkTile = true;
  //
  //     console.log(tileSet[i+1]);
  //     return;
  //   }else{
  //     // checkTile = false;
  //
  //   }
  // }, { threshold: [0.5] });
  //
  // for (var i = 0; checkTile<tileSet.length; i++) {
  //     if (checkTile == false) {
  //       tileVisible = tileSet[i+1];
  //       observer.observe(document.querySelector("#"+tileVisible));
  //     }


  //}else if (checkTile==true) {
  //   tileVisible = "t3";
  //   observer.observe(document.querySelector("#"+tileVisible));
  // }

  // }

}




function prova_due(database) {
  var ultimo = database.testi.length - 1;
  currentText = database.testi[ultimo].testo;
  textSize(100);
  currentPar = createDiv(currentText);
  currentPar.position(database.testi[ultimo].top, database.testi[ultimo].left);
  currentPar.style("white-space", "pre-wrap")
  currentPar.style("width", "fit-content")
  currentPar.style("font-family", "Helvetica")
  currentPar.style("letter-spacing", database.testi[ultimo].tracking + "px")
  currentPar.style("line-height", database.testi[ultimo].interlinea + "px")
  currentPar.style("color", database.testi[ultimo].colore);
  currentPar.style("transform", "scale(" + database.testi[ultimo].scale + ") rotate(" + database.testi[ultimo].rotazione + "deg)");
  currentPar.style("font-weight", database.testi[ultimo].peso);
  currentPar.style("pointer-events", "none");
  currentPar.style("z-index", "10");
  if (database.testi[ultimo].italic == true) {
    currentPar.style("font-style", "italic");
  } else {
    currentPar.style("font-style", "normal");
  }

};


// SHOW ALL TEXTS CONTAINED INTO THE TOILET
function prova_tre(database) {
  for (var i = 0; i < database.testi.length; i++) {
    currentText = database.testi[i].testo;
    currentPar = createDiv(currentText);
    currentPar.position(database.testi[i].top, database.testi[i].left);
    currentPar.style("white-space", "pre-wrap")
    currentPar.style("width", "fit-content")
    currentPar.style("font-family", "Helvetica")
    currentPar.style("letter-spacing", database.testi[i].tracking + "px")
    currentPar.style("line-height", database.testi[i].interlinea + "px")
    currentPar.style("color", database.testi[i].colore);
    currentPar.style("transform", "scale(" + database.testi[i].scale + ") rotate(" + database.testi[i].rotazione + "deg)");
    currentPar.style("z-index", "10");
    currentPar.style("font-weight", database.testi[i].peso);
    currentPar.style("pointer-events", "none");
    if (database.testi[i].italic == true) {
      currentPar.style("font-style", "italic");
    } else {
      currentPar.style("font-style", "normal");
    }
  }
};

// console.log($(".colorpicker_hex > input").value());

//
// $(window).bind("scroll", function() {
//
//   //clear all active class
//   $('.tiles').removeClass('active');
//
//   //add active class to timeline
//   $(".tiles").withinviewport().each(function() {
//        $('.tiles[view-id="'+$(this)[0].id+'"]').addClass('active');
//        console.log($(".active").attr("id"))
//   });
// });




function draw() {

if (!fence.insideFence){
    document.getElementById("infoEditor").style.visibility = "hidden";
    $("#infoCentrale").html("See what happens in " + citta + ".");
}

// TILESEARCH UPDATE

  // var findMiddleElement = (function(docElm) {
  //   var viewportHeight = docElm.clientHeight;
  //   var viewportWidth = docElm.clientWidth;
  //   // here i'm using pre-cached DIV elements, but you can use anything you want.
  //   // Cases where elements are generated dynamically are more CPU intense ofc.
  //   elements = $('.tiles');
  //
  //   return function(e) {
  //
  //     if (e && e.type == 'resize')
  //       viewportHeight = docElm.clientHeight;
  //     viewportWidth = docElm.clientWidth;
  //
  //     elements.each(function() {
  //       var pos = this.getBoundingClientRect().top + tileDim / 2;
  //       var pos2 = this.getBoundingClientRect().left + tileDim / 2;
  //       // if an element is more or less in the middle of the viewport
  //       if (pos > viewportHeight / 2.5 && pos < viewportHeight / 1.5 && pos2 > viewportWidth / 2.5 && pos2 < viewportWidth / 1.5) {
  //         if (checkScroll == false) {
  //           middleElement = this;
  //           idTile = middleElement.id;
  //           tileCoordinate.value("#" + idTile);
  //           return false; // stop iteration
  //         }
  //       }
  //     });
  //
  //     // console.log(middleElement);
  //   }
  // })(document.documentElement);
  //
  // // document.addEventListener('scroll', findMiddleElement, {
  // //   passive: true
  // // });


// UPDATE PREVIEW TEXT
  if (check == true) {
    currentPar2.style("transform", "scale(" + sizeVar / 10 + ") rotate(" + rotateVar + "deg)");
    currentPar2.position(mouseX + scrollX, mouseY + scrollY);
  } else if (check == false) {
    currentPar2.style("display", "none")
  }

// SHOW-HIDE INFO
  $("#infoContainer").click(function() {
    $("#infoContainer").css("display", "none")
  });
  $("#infoDiv").click(function() {
    $("#infoContainer").css("display", "block")
  });

// EDITOR BEHAVIOUR
  if (fence.insideFence) {
    checkPosition();
    sevenDiv.style("background-color", "#" + hexColor)

    if (statoEditor == 0) {
      $("#editorTextDiv").click(function() {
        $(".editorDiv").css("height", "0%");
        $(".editorDiv").css("border", "0");
        $("#editorTextDiv").css("bottom", "0vh");
        $(".editorDiv > div").css("display", "none");
        statoEditor = 1;
      });
    } else {
      $("#editorTextDiv").click(function() {
        $(".editorDiv").css("height", "20%");
        $(".editorDiv").css("border", "2px solid #666");
        $("#editorTextDiv").css("bottom", "18vh");
        $(".editorDiv > div").css("display", "inherit");
        statoEditor = 0;
      });
    }
  } else {
    checkPosition();
    console.log("non puoi (fence.InsideFence)")
  }

// COLOR SELECTOR BEHAVIOUR
  if (stato == 0) {
    $(".colorSelector").click(function() {
      $("#colorPick").css("width", "100%");
      console.log(stato)
      stato = 1;
    });
  } else {
    $(".colorSelector").click(function() {
      $("#colorPick").css("width", "0%");
      console.log(stato)
      stato = 0;
    });
  }


// UPDATE PREVIEW TEXT
  if (check == true) {
    currentPar2.style("transform", "scale(" + sizeVar / 10 + ") rotate(" + rotateVar + "deg)");
    currentPar2.position(mouseX + scrollX, mouseY + scrollY);
  } else if (check == false) {
    currentPar2.style("display", "none")
  }
}


// CHECK USER POSITION
function checkPosition() {
  // controllo sei-di-zona
  if (fence.insideFence) {
    createEditor();
  } else {
    changeEditorText();
  }

  // findMiddleElement();
}


// PARAGRAPH ENTER
$(".searchText").keydown(function(e) {
  // Enter was pressed without shift key
  if (e.keyCode == 13 && !e.shiftKey) {
    // prevent default behavior
    e.preventDefault();
  }
});
