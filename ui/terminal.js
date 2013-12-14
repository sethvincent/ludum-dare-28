var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = Terminal;

function Terminal(){
  EventEmitter.call(this);
  this.el = document.querySelector('#terminal');
  this.input = this.el.querySelector('input');
  this.addListeners();

  this.methods = {
    help: this.help
  }
}

inherits(Terminal, EventEmitter);

Terminal.prototype.addListeners = function(){
  var self = this;

  this.el.addEventListener('submit', function(e){
    e.preventDefault();
    var arr = self.input.value.split(' ');
    var command = arr[0];
    var option = arr[1];
    self.input.value = '';

    var message = '';
    if (self.methods[command]) message = self.methods[command](option);
    else message = 'nope, not a method for that command';

    self.emit('command', message, command, option);
  });
}

Terminal.prototype.help = function(option){
  return 'this is the help message';
}