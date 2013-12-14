var template = require('lodash.template');

module.exports = Log;

function Log(id){
  this.el = document.getElementById(id);
}

Log.prototype.add = function(message){
  var self = this;
  this.el.style.display = 'block';
  var item = document.createElement('li');
  item.innerHTML = message;
  this.el.appendChild(item);
  setTimeout(function(){
    self.el.removeChild(item);
    self.el.style.display = 'none';
  }, 3000)
};

Log.prototype.clear = function(){
  if (this.el.querySelectors('li:visible').length === 0) console.log('yep')
};