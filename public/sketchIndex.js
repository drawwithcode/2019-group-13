var cursorEll;
var desktop;
var pos = 30;

var mySong;
var audioCtx;

let bx;
let by;
let boxSize = 20;
let overBox = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;
var iconaAnimata;

let your;
let logo;
let overBox1 = false;
let locked1 = false;
let overBox2 = false;
let locked2 = false;


function preload(){
  myFontBold = loadFont('addons/font/NeueHaasDisplay-Bold.ttf');
  myFontBoldItalic = loadFont('addons/font/NeueHaasDisplay-BoldItalic.ttf');
  myFontRegular = loadFont('addons/font/NeueHaasDisplay-Mediu.ttf');
  myFontRegularItalic = loadFont('addons/font/NeueHaasDisplay-MediumItalic.ttf');
  myFontLight = loadFont('addons/font/NeueHaasDisplay-Roman.ttf');
  myFontLightItalic = loadFont('addons/font/NeueHaasDisplay-RomanItalic.ttf');
  play = loadImage('addons/imgs/play.png');
  mySong = loadSound("addons/music/songs/3.mp3");

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);
  audioCtx = new AudioContext();
  audioCtx.suspend()
  mySong.play();


  bx = 20;
  by = 15;
  // noCursor();



}

function draw() {
background(0);


// icona alta
  if (
      mouseX > bx - boxSize+10 &&
      mouseX < bx + boxSize+10 &&
      mouseY > by - boxSize-10 &&
      mouseY < by + boxSize-10
    ) {
      overBox = true;
      if (!locked) {
        background(0);
        textSize(10);
        textFont(myFontLight);
        text("welcome to a place where\npeople can use typography\nto express themeselves\nand communicate",windowWidth/2-63,40);
        text("press M to play/pause music",28,height-31);
        push();
        textAlign(RIGHT);
        text("click the logo to enter to the lobby",width-31,height-31);
        pop();
        push();
        noFill();
        stroke(255);
        strokeWeight(1);
        rect(windowWidth/2-73,25, 129,60);
        rect(20,height-25, 135,-20);
        rect(width-175,height-25, 150,-20);

        pop();
       }
    }

push();
    noFill();
    noStroke();
    rect(bx, by, boxSize+10, boxSize-10);
pop();
  // fine icona alta


/*
push();
filter(INVERT);
fill(255,255,255,100);
desktop= rect(0,0,windowWidth,windowHeight);
pop();
*/


  // inizio animazione1.1 logotipo
    fill(255);
    textSize(40);
    textStyle(BOLD);
    textFont(myFontBold);
    textLeading(pos);

    push()
    textAlign(LEFT);
    translate((width/2)-87, 250);
    rotate(-104+(mouseY/4.8));

    your = text("YOUR",0,0);

    pop()
    logo = text("\nPUBLIC\nTOILET\n.COM",(width/2)-80,250);

    // fine animazione1.1 Logotipo

  // cursor ellipse inverted start

  // blend(cursorEll,mouseX-20,mouseY-20,40,40,mouseX-20,mouseY-20,40,40,DIFFERENCE);
  // blend(desktop,mouseX-20,mouseY-20,40,40,mouseX-20,mouseY-20,40,40,EXCLUSION);
/*
  push();
  noStroke();
  fill(255);
  filter(INVERT);
  cursorEll= ellipse(mouseX,mouseY,40);

  pop();
*/

  // cursor ellipse inverted end
// push();
//   fill(255);
//   textSize(13);
//   textFont(myFontRegular);
//   text("INFO",20,25);
// pop();
//
// push();
//   fill(255);
//   textSize(13);
//   textAlign(RIGHT);
//   textFont(myFontRegular);
//   text("ABOUT",width-20,25);
// pop();



/*
push();
  image(play,width-30,10, 20,20);
pop();
*/
// rettangolo di selezione del logo
push();
fill(255,0,0,0);
noStroke();
rect((width/2)-115,135,177,205);
pop();

push();
fill(255,0,0,0);
noStroke();
rect(width-65,25,45,-10);
pop();
}

function mouseWheel(event) {
  print(event.delta);
if ((pos += event.delta/100)<windowHeight){
  pos += event.delta/100;
  }
else if ((pos+=event.delta)==windowHeight) {

pos=30;
  }
}
/*
function keyPressed(SPACEBAR) {
  document.location.reload();
}
*/
function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}


  function keyTyped() {
    if (key === 'm'){
      getAudioContext().resume();
      if (!mySong.isPlaying()) {
      mySong.play();
    } else {
      mySong.pause();
      }
     }
    }

  function mouseClicked() {

    if (
        mouseX > (width/2)-115 - 177 &&
        mouseX < (width/2)-115 + 177 &&
        mouseY > (135 - 205) &&
        mouseY < (135 + 205)
      ) {

        overBox1 = true;
        if (!locked1) {
        window.open("lobby.html", "_self");

         }
      }

      else if (
          mouseX > (width-65) - 45 &&
          mouseX < (width-65) + 45 &&
          mouseY > (25 - 10) &&
          mouseY < (25 + 10)
        ) {

          overBox2 = true;
          if (!locked2) {
          window.open("indexAbout.html", "_self");
           }
        }

  }
