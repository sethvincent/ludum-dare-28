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
var randomInt = require('./util/math').randomInt;
var randomRGB = require('./util/math').randomRGB;
var randomRGBA = require('./util/math').randomRGBA;


/*
* create game object
*/

var game = new Game({
  canvas: 'game',
  width: window.innerWidth,
  height: window.innerHeight - 80,
  backgroundColor: '#323230'
});

var size = 5;
var columns = game.width / size;
var rows = game.height / size;

game.on('draw', function(c){

  //for (var w=0; w<columns; w+=randomInt(5, 20)){
    //c.fillStyle = randomRGBA(0, 255, 0, 200, 0, 211, 0.5);
    //c.fillRect(size*w, 0, randomInt(1, 3), game.height);    
  //}

  for (var h=0; h<rows; h+=randomInt(5, 20)){
    c.fillStyle = randomRGBA(0, 0, 0, 0, 0, 0, 0.6);
    c.fillRect(0, size*h, game.width, randomInt(1, 2));
  }

})

/*
* create player characters
*/

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
playerElUpdate(currentPlayer);

function switchPlayer(){
  if (currentPlayer.name === 'eika') currentPlayer = players.fullerton;
  else currentPlayer = players.eika;
  playerElUpdate(currentPlayer);
}

function playerElUpdate(player){
  var el = document.getElementById('terminal-player');
  el.innerHTML = player.name;
}


/*
* terminal
*/

var terminal = new Terminal();

terminal.on('command', function(message, command, option){
  currentPlayer.log.add(message);
  switchPlayer();
  var color = randomRGB(0, 125, 0, 25, 0, 55);
  game.backgroundColor = color;
});
