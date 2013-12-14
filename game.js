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

var players = {
  'eika': true,
  'fullerton': false
};

function switchPlayer(){
  if (current === 'eika'){
    players['eika'] = false;
    players['fullerton'] = true;
    return 'fullerton';
  } else {
    players['eika'] = true;
    players['fullerton'] = false;
    return 'eika';
  }
}

function activePlayer(){
  if (players['eika']) return 'eika';
  else return 'fullerton';
}

/*
* terminal
*/
var logOne = new Log('log-eika');
var logTwo = new Log('log-fullerton');
var terminal = new Terminal();

terminal.on('command', function(message, command, option){
  //console.log(command, option);
  logOne.add(message);
  logTwo.add(message);
  var color = randomRGB(0, 125, 0, 25, 0, 55);
  game.backgroundColor = color;
});


