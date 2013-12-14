/*
* crtrdg.js modules
*/

var Game = require('crtrdg-gameloop');
var Mouse = require('crtrdg-mouse');
var Keyboard = require('crtrdg-keyboard');


/*
* custom modules
*/

var Log = require('./ui/log');
var Terminal = require('./ui/terminal');
var randomRGB = require('./util/math').randomRGB;

var game = new Game({
  canvas: 'game',
  width: window.innerWidth,
  height: window.innerHeight - 80,
  backgroundColor: '#323230'
});


/*
* terminal
*/
var log = new Log();
var terminal = new Terminal();

terminal.on('command', function(message, command, option){
  //console.log(command, option);
  log.add(message);
  var color = randomRGB(0, 125, 0, 25, 0, 55);
  game.backgroundColor = color;
});


