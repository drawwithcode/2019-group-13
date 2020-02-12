var pos=-300;
let bx;
let by;
let boxSize = 20;
let overBox1 = false;
let locked1 = false;
let xOffset = 0.0;
let yOffset = 0.0;
var iconaAnimata;


function preload(){
  myFontBold = loadFont('addons/font/NeueHaasDisplay-Bold.ttf');
  myFontBoldItalic = loadFont('addons/font/NeueHaasDisplay-BoldItalic.ttf');
  myFontRegular = loadFont('addons/font/NeueHaasDisplay-Mediu.ttf');
  myFontRegularItalic = loadFont('addons/font/NeueHaasDisplay-MediumItalic.ttf');
  myFontLight = loadFont('addons/font/NeueHaasDisplay-Roman.ttf');
  myFontLightItalic = loadFont('addons/font/NeueHaasDisplay-RomanItalic.ttf');
  play = loadImage('addons/imgs/play.png');
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);

  bx = width -60;
  by = 50;

  // put setup code here
}

function draw() {
  background(0);


  // icona alta
  /*
push();
fill(255,255,255);
textSize(10);
textFont(myFontBold);
textLeading(8);
iconaAnimata = text("YOUR \n PUBLIC \n TOILET \n .COM",width-80,40);

  pop();

  if (
      mouseX > bx - boxSize &&
      mouseX < bx + boxSize &&
      mouseY > by - boxSize &&
      mouseY < by + boxSize
    ) {
      overBox = true;
      if (!locked) {
        background(0);

        textSize(10);
        textFont(myFontBold);
        textLeading(8);
        push()
        textAlign(LEFT);
        translate(width-80, 40);
          rotate(-104);
          text("YOUR",0,0);
        pop()
        text(" PUBLIC \n TOILET \n .COM",width-80,48);

     }
    }

push();
    noFill();
    noStroke();
    rect(bx, by, boxSize, boxSize);
pop();

*/
  // fine icona alta

  push();
    fill(255);
    textSize(20);
    textAlign(LEFT);
    textFont(myFontBold);
    text("ABOUT:",width/20,-pos-280);
  pop();

  push();
    fill(255);
    textSize(20);
    textAlign(LEFT);
    textFont(myFontLight);
    text("yourpublictoilet.com is a place where people can use typography\nto express themeselves and communicate",(width/20)+80,-pos-280);
  pop();

  push();
    fill(255);
    textSize(30);
    textAlign(LEFT);
    textFont(myFontLightItalic);
    text("WRONG SCROLL DIRECTION",width/20,-pos-320);
  pop();

  push();
    fill(255);
    textSize(30);
    textAlign(LEFT);
    textFont(myFontLightItalic);
    text("SCROLL DOWN",(width+640)+pos*3,60);
  pop();

  push();
    fill(255);
    textSize(-pos/20);
    textAlign(LEFT);
    textFont(myFontLightItalic);
    text("PLEASE USE THIS PAGE ON 16:9 RATIO",(-width-75)-pos*4,140);
  pop();

push();
  fill(255);
  textSize(60);
  textAlign(LEFT);
  textFont(myFontBold);
  text("YOUR",(width/3)-80,-pos-40);
pop();

push();
  fill(255);
  textSize(60);
  textAlign(LEFT);
  textFont(myFontBold);
  textLeading((-pos-300)*1.2);
  text("YOUR\nYOUR\nYOUR",(width/3)-80,-pos-40);
pop();

push();
  fill(255);
  textSize(20);
  textAlign(LEFT);
  textLeading((-pos-280)*1.8);
  textFont(myFontLight);
  text("text\nplace\nstyle",(width/2)-70,(-pos-20)*0.8);
pop();

push();
fill(0,0,0)
rect((width/2)-80,(-pos+80)*0.59,120,290);
pop();

push();
  fill(255);
  textSize(60);
  textAlign(LEFT);
  textFont(myFontBold);
  text("PUBLIC",(width/3)*1.8,-pos+87);
pop();

push();
  fill(255);
  textSize(20);
  textAlign(LEFT);
  textFont(myFontLight);
  text("in this virtual space\nyour thoughts\ncould be expressed\nindiscriminately, just\nyour free typography",width-200,pos+160);
pop();

push();
  fill(255);
  textSize(15);
  textAlign(CENTER);
  textFont(myFontBold);
  translate((width/20)+50,((height/2)+70)+(pos/4));
  rotate(pos-59);
  text("PURE EXPRESSION",0,0);
pop();

push();
  fill(255);
  textSize(20);
  textAlign(LEFT);
  textLeading(pos);
  textFont(myFontLight);
  text("each toilet represent a geographic area (a city, an event)\nyou can access every toilet everywhere\nyou can write only on the toilet on your current location",width/20,(pos-20)*0.8);
pop();

push();
fill(0,0,0)
rect(0,(-pos+430)*0.5,620,750);
pop();

push();
  fill(255);
  textSize(20);
  textAlign(LEFT);
  textFont(myFontLight);
  text("locals",(width-480)-pos,height-140);
pop();

push();
  fill(255);
  textSize(20);
  textAlign(LEFT);
  textFont(myFontLight);
  text("accessible to all",(width+1700)+pos*10,height-160);
pop();
/*
push();
fill(0,0,0)
rect(width-220,(-pos+80)*0.59,220,290);
pop();
*/

push();
  fill(255);
  textSize(20);
  textAlign(LEFT);
  textFont(myFontLight);
  text("there isn't a more intimate place than web. Find the shelter of your communication",(width-2500)-pos*10,160);
pop();

push();
  fill(255);
  textSize(60);
  textAlign(LEFT);
  textFont(myFontBold);
  text("TOILET",width/20,(-pos+520)*0.5);
pop();

push();
  fill(255);
  textSize(60);
  textAlign(CENTER);
  textSize((pos-1500)*0.35);
  textFont(myFontBold);
  text("BOTTOM",width/2,(-pos+3020)*0.5);
pop();

push();
  fill(255);
  textSize(20);
  textAlign(LEFT);
  textFont(myFontLight);
  text("imagine to be free,\nimagine to be on a club,\ndancin' like there is\nno tomorrow",(width/2),-pos+180);
pop();

push();
  fill(255);
  textSize(20);
  textAlign(LEFT);
  textFont(myFontLight);
  textLeading(pos/5);
  text("there is a toilet for any city,\nany event, for any public catering,\nyou just have to find\nwhat you wanna shout",(width/2),-pos+500);
pop();

push();
  fill(255);
  textSize(20);
  textAlign(LEFT);
  textFont(myFontLight);
  textLeading(pos/7.5);
  text("this spot is your like any other real public toilet:\neverybody uses it\nbut there isn't nothing more confidential.\n Toilets have saw the real you,\nnow show the real you to the world\n without judgings.",(-width-1000)+pos*5,height-400);
pop();

push();
fill(255);
textSize(13);
textAlign(LEFT);
textFont(myFontBold);
text("HOME",10,25);
pop();

push();
fill(255,0,0,0);
noStroke();
rect(10,15,40,10);
pop();


  // put drawing code here
}

function mouseWheel(event) {
  print(event.delta);
if ((pos += event.delta/100)<windowHeight){
  pos += event.delta/100;
  // event.delta/(windowHeight*4);  -> questo va scritto al posto della riga sopra dopo pos +=
  }
else if ((pos+=event.delta)==windowHeight) {

pos=-300;
  }
}

function keyPressed(SPACEBAR) {
  document.location.reload();
}
function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}

function mouseClicked() {

  if (
      mouseX > 10 - 40 &&
      mouseX < 10 + 40 &&
      mouseY > 15 - 10 &&
      mouseY < 15 + 10
    ) {
      overBox1 = true;
      if (!locked1) {
      window.open("index.html", "_self");
       }
    }
}
