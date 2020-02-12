// load express library

var express = require('express');


// create the app
var app = express();
// define the port where client files will be provided
var port = process.env.PORT || 3000;
// start to listen to that port
var server = app.listen(port);
// provide static access to the files
// in the "public" folder
app.use(express.static('public'));
app.use(express.json());






// load socket library
var socket = require('socket.io');
// create a socket connection
var io = socket(server);
// define which function should be called
// when a new connection is opened from client
io.sockets.on('connection', newConnection);
// callback function: the paramenter (in this case socket)
// will contain all the information on the new connection
function newConnection(socket) {
  //when a new connection is created, print its id
  console.log('socket:', socket.id);

  //define what to do on different kind of messages
  socket.on('options', jsonUpdate);
  socket.on('sendRequest', requestUpdate);

  function jsonUpdate(request) {
    //console.log(request.body);
    var testo = request.body;
    var fs = require('fs')
    var host = request.http;

    fs.readFile("public/" + host + '/DB.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          //now it an object
          //add some data
          //convert it back to json
          obj = JSON.parse(data);
          obj.testi.push(testo)
          json = JSON.stringify(obj, null, 2);
          //console.log(json)
          fs.writeFile("public/" + host + '/DB.json', json, finished);
					// socket.emit('database', request);
					socket.broadcast.emit('database', request);

					console.log("andata");

          // write it back

          //console.log(data);
        }
      });


			function finished() {
				console.log("yooo");

			}
    //   app.post('/api',(request,response)=>{
    //   	console.log(request.body);
    //   	var testo = request.body;
    //   	var fs = require('fs')
    //   	console.log(testo)
		//
    //   	fs.readFile('DB.json', 'utf8', function readFileCallback(err, data){
    //        if (err){
    //            console.log(err);
    //        } else {
    //         //now it an object
    //   		 //add some data
    //        //convert it back to json
    //   		 obj = JSON.parse(data);
    //   		 obj.testi.push(testo)
    //   		 json = JSON.stringify(obj,null,2);
    //   		 console.log(json)
    //        fs.writeFile('DB.json', json, finished);
		//
    //   		 function finished(){
    //   			 console.log(json)
    //   		 } // write it back
    //    }});
		//
		//
		//
    // })
	}


  function requestUpdate(request) {
    console.log("1")
    //console.log(request.body);
    var testo2 = request.body;
    var fs2 = require('fs')
    //console.log(testo)


    fs2.readFile('./public/richieste.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          //now it an object
          //add some data
          //convert it back to json
          obj = JSON.parse(data);
          obj.richieste.push(testo2)
          json = JSON.stringify(obj, null, 2);
          //console.log(json)
          fs2.writeFile('./public/richieste.json', json, finished);
					// socket.emit('database', request);


					console.log("andata");

          // write it back

          //console.log(data);
        }
      });


			function finished() {
				console.log("yooo");

			}
    //   app.post('/api',(request,response)=>{
    //   	console.log(request.body);
    //   	var testo = request.body;
    //   	var fs = require('fs')
    //   	console.log(testo)
		//
    //   	fs.readFile('DB.json', 'utf8', function readFileCallback(err, data){
    //        if (err){
    //            console.log(err);
    //        } else {
    //         //now it an object
    //   		 //add some data
    //        //convert it back to json
    //   		 obj = JSON.parse(data);
    //   		 obj.testi.push(testo)
    //   		 json = JSON.stringify(obj,null,2);
    //   		 console.log(json)
    //        fs.writeFile('DB.json', json, finished);
		//
    //   		 function finished(){
    //   			 console.log(json)
    //   		 } // write it back
    //    }});
		//
		//
		//
    // })
	}



}
