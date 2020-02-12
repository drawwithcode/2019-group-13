# YourPublicToilet.com
![COVER](Images/COVER.png)

**YOURPUBLICTOILET.COM** is a university project developed and realized with p5.js library in Creative Coding class, taught by Mauri Michele and Andrea Benedetti at Politecnico di Milano.

The main purpose of our project is to create a virtual common space where thoughts could be expressed indiscriminately through typography.

## TABLE OF CONTENTS

#### 1. [AESTHETIC RESEARCH](#1)	                                                              
  1.	[How we conceived the idea](#1.1)
  2.	[Why the toilet?](#1.2)

#### 2. [CONCEPT](#2)
  1. [How does it work?](#2.1)
  2. [What we expect](#2.2)

#### 3. [DEVELOPMENT](#3)
  1. [Interface](#3.1)
  2. [Lobby Doors](#3.2)
  3. [Toilet system](#3.3)
  4. [Tile search](#3.4)
  5. [Geolocaction](#3.5)
  6. [Preview](#3.6)

#### 4. [ISSUES AND IMPROVEMENTS](#4)
  1. [JSON/placement](#4.1)
  2. [HTML](#4.2)

#### 5. [THE TEAM](#5)


## 1. <a name="1">AESTHETIC AND CONCEPT RESEARCH </a>
![CONCEPT](Images/LOGO.png)

### <a name="1.1">1.1 How we conceived the idea </a>

Our passion in typography drove us from the beginning to think about a place where we could express ourselves through words. Pure concepts freed of their earthly burden. Clear words that float in an immense, navigable, dark space.
We had the vision.
Next we thought about how close this concept was from the visualization of Plato's realm of ideas: We were so excited to give
the Hyperuranion a shape.
But apparently flying high served to fall back to the ground; to come up with something that makes sense here, between us, in our daily lives.
We slowly abandoned the idea of visualizing this greater plane and shifted the gaze to where people truly express themselves - literally - in the most intimate, direct, primordial way.
We went back down to the public toilet.


### <a name="1.2">1.2 Why the toilet? </a>

Each toilet is a world of its own, reflecting the most direct thoughts of those who are using it.
In addition to the obvious vulgarities, public toilets are signed. There are stickers for bands and collectives. Happenings and hidden events are communicated. We exchange impressions, insults, cues.
We continue each other drawings.
It is a space full of instant words, of raw, animalistic, spontaneous, dreamy, festive, quarrelsome, chaotic, loving ideas. 

A collective space but full of individual expression.
As much as online places are.


## <a name="2">2. CONCEPT </a>
![CONCEPT](Images/CONCEPT.png)

### <a name="2.1">2.1 How does it work? </a>

* There are several Toilets, each one represent a geographical area (a city, an event...)
* Each toilet is a very large HTML page, full of writings.
* Each toilet is composed of a "tile grid" (with go-to functions!)
* You can access every toilet from everywhere.
* You can write only on the toilet on you current location.
* Walls are not completely zoomable out, forcing you to explore.
* Write your text into the editor, move it around the toilet and place it.
* One font, but customizable in color, rotation, size, letters and line spacing.



### <a name="2.2">2.2 What could happen </a>

* Events communication
* Collective poetry
* Collective typographic drawing
* Public chat
* Search for inspiration
* Self expression
* Typographic Ads (our secret back-to-the-roots dream!)
* Contact making
* Other unexpected internet phenomena



## <a name="3">3. DEVELOPMENT </a>

### <a name="3.1">3.1 Interface </a>

The interface is linear and minimal, essential, white and black. From the homepage you can access the lobby, the waiting room before the toilets. From the lobby you can select the toilets by scrolling through them and if a toilet in your zone is not yet present you can request one thanks to the Request button. You click a door, you enter the toilet. Easy Peasy.
If you are located into the area represented by the toilet, the editor mode opens with which you can edit your writings.
Click on the preview to attach your writing to your cursor, tweak the typographic parameters and see live results.
Now you are ready to go to the spot you like and click ALT to place your text.
If you want to continue a friend's text at certain position in the toilet you can use the tile coordinate system. Change the number on the label in your left and in a sec you are there!



### <a name="3.2">3.2 Lobby Doors Upload </a>
```p5.js

function preload() {
  // allaccia il database dei luoghi
  databaseToilet = loadJSON("toilets/toilets.json");

  // allaccia il database delle richieste
  richieste = loadJSON("richieste.json");

function loadToilets() {

  var toiletName = [];

  // itera tutti i campi del database
  for (var i = 0; i <= databaseToilet.lista_comuni.length; i++) {
    // all inside toilet_container
    var toiletContainer = select('#toilet_container');

    // toilet fantoccio (crea una finta toilet finale per bloccare lo scroll)
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

    }
  }

  $("#toiletNumber").html(databaseToilet.lista_comuni.length + " toilets accessible");

}
}

```

### <a name="3.3">3.3 Toilet system </a>
```json
{
  "lista_comuni": [{

      "nome_comune": "Milano",
      "nome_url": "milano",
      "coordinate": [
        [9.180179, 45.536275],
        [9.184052, 45.535288],
        [9.185324, 45.534286],
        [9.187036, 45.531612],
        [9.187679, 45.530409],
        [9.190033, 45.528027],
        [9.198766, 45.528214],
        [9.199616, 45.528384],
        [9.200195, 45.528501],
        [9.206762, 45.530268],
        [9.21244, 45.529219],
        [9.230311, 45.524156],
        [9.235688, 45.518389],
        [9.236981, 45.518374],
        [9.256467, 45.519825],
        [9.257908, 45.519169],
        [9.258526, 45.519186],
        [9.259853, 45.519826],
        [9.259688, 45.519972],
        [9.269403, 45.517724],
        [9.269537, 45.513411],
        [9.272658, 45.507658],
        [9.273361, 45.507386],
        [9.274384, 45.507285],
        [9.275677, 45.507192],
        [9.278963, 45.5065],
        [9.27891, 45.506175],
        [9.278646, 45.504556],
        [9.277077, 45.503507],
        [9.275259, 45.50289],
        [9.272942, 45.502932],
        [9.272714, 45.503266],
        [9.272808, 45.503635],
        [9.272896, 45.503976],
        [9.273182, 45.504795],
        [9.273559, 45.506036],
        [9.273613, 45.50654],
        [9.273204, 45.506694],
        [9.272654, 45.506749],
        [9.268997, 45.506847],
        [9.262608, 45.505413],
        [9.262355, 45.505322],
        [9.261417, 45.501019],
        [9.261387, 45.500772],
        [9.260616, 45.490927],
        [9.260321, 45.485098],
        [9.26203, 45.472377],
        [9.26242, 45.472327],
        [9.263046, 45.472307],
        [9.264723, 45.472429],
        [9.266489, 45.472587],
        [9.267405, 45.472729],
        [9.268451, 45.472893],
        [9.269268, 45.47313],
        [9.269948, 45.473427],
        [9.270601, 45.473386],
        [9.272431, 45.473244],
        [9.272492, 45.473158],
        [9.272841, 45.469323],
        [9.272723, 45.462843],
        [9.270017, 45.458673],
        [9.268189, 45.450719],
        [9.267808, 45.443966],
        [9.26771, 45.438714],
        [9.267859, 45.436144],
        [9.264665, 45.433146],
        [9.263095, 45.432264],
        [9.254925, 45.427719],
        [9.248918, 45.42467],
        [9.243605, 45.419623],
        [9.24799, 45.417741],
        [9.248678, 45.417353],
        [9.250424, 45.416197],
        [9.250754, 45.415933],
        [9.251051, 45.415696],
        [9.251237, 45.415547],
        [9.248932, 45.414058],
        [9.244065, 45.411449],
        [9.239817, 45.410153],
        [9.232479, 45.408953],
        [9.226626, 45.408533],
        [9.226003, 45.409308],
        [9.22538, 45.409878],
        [9.225175, 45.410066],
        [9.2245, 45.410481],
        [9.223912, 45.410811],
        [9.218866, 45.408507],
        [9.217232, 45.404645],
        [9.216948, 45.403943],
        [9.215878, 45.397986],
        [9.215807, 45.39823],
        [9.215739, 45.398464],
        [9.214275, 45.39823],
        [9.21154, 45.397792],
        [9.211075, 45.397716],
        [9.209898, 45.397394],
        [9.210034, 45.396146],
        [9.209553, 45.393867],
        [9.207762, 45.393231],
        [9.207328, 45.393106],
        [9.207136, 45.39349],
        [9.206567, 45.39424]
        ]
        }
        ]
        }
```

### <a name="3.4">3.4 Tile search </a>
```p5.js
tileCoordinate = createInput("#" + idTile);
  tileCoordinate.attribute("type","text")
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

```

### <a name="3.5">3.5 Geolocation </a>
```p5.js
var fence;
var fenceOptions;
var databaseLuoghi;

var citta = "Milano";
var cittaUrl = "milano";
var polygon_citta = []; // poligono del luogo

databaseLuoghi = loadJSON("../toilets.json");

// itera il database delle toilets
for (var j = 0; j < databaseLuoghi.lista_comuni.length; j++) {
    // cerca quello giusto
    if (databaseLuoghi.lista_comuni[j].nome_comune == citta) {
      // crea il poligono con le coordinate
      for (var i = 0; i < databaseLuoghi.lista_comuni[j].coordinate.length; i++) {
        var polygon_tmp = {
          lat: databaseLuoghi.lista_comuni[j].coordinate[i][1],
          lon: databaseLuoghi.lista_comuni[j].coordinate[i][0]
        }
        polygon_citta.push(polygon_tmp);
      }
    }
  }


  // stabilisci zona tramite poligono di zona
  fence = new geoFencePolygon(polygon_citta);


  function checkPosition() {
  // controllo sei-di-zona
  if (fence.insideFence) {
    createEditor();
  } else {
    changeEditorText();


  }

```

### <a name="3.6">3.6 Preview </a>
```p5.js
function preview() {
  if (currentPar2) {
    currentPar2.remove();
  }
  if (check==true) {
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

```

## <a name="4">4. ISSUES & IMPROVEMENTS </a>

### <a name="4.1">4.1 JSON/placement </a>
The system is based on a JSON database which is rewritten at each PLACEMENT.

-> We could use database service services such as FIREBASE which guarantee a smooth upload without continuous file rewriting.


### <a name="4.2">4.2 HTML </a>
A very large page is created with many div elements and this increases the weight of the page.

-> Do not use an HTML page but create a custom model with a behavior similar to Google Maps.
