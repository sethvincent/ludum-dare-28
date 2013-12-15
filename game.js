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
  eika: {
    name: 'eika',
    log: new Log('log-eika')
  },
  fullerton: {
    name: 'fullerton',
    log: new Log('log-fullerton')
  }
};

var currentPlayer = players.eika;

function switchPlayer(){
  if (currentPlayer.name === 'eika') currentPlayer = players.fullerton;
  else currentPlayer = players.eika;
}

function playerElUpdate(player){
  var el = document.getElementById('terminal-player');
  el.innerHTML = player.name;
}

playerElUpdate(currentPlayer);

/*
* terminal
*/

var terminal = new Terminal();

terminal.on('command', function(message, command, option){
  currentPlayer.log.add(message);
  switchPlayer();
  playerElUpdate(currentPlayer);
  var color = randomRGB(0, 125, 0, 25, 0, 55);
  game.backgroundColor = color;
});
