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
  if (currentPlayer === 'eika'){
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

function playerElUpdate(player){
  var el = document.getElementById('terminal-player');
  el.innerHTML = player;
}

var currentPlayer = 'eika';
playerElUpdate(currentPlayer);

/*
* terminal
*/

var logOne = new Log('log-eika');
var logTwo = new Log('log-fullerton');
var terminal = new Terminal();

terminal.on('command', function(message, command, option){
  currentPlayer = switchPlayer();
  playerElUpdate(currentPlayer);
  logOne.add(message);
  logTwo.add(message);
  var color = randomRGB(0, 125, 0, 25, 0, 55);
  game.backgroundColor = color;
});
