var template = require('lodash.template');

module.exports = Log;

function Log(){
  this.el = document.getElementById('log');
  this.template = document.getElementById('log-message-template').innerHTML;
}

Log.prototype.add = function(html){
  var item =  document.createElement('li');
  item.innerHTML = html;
  item.style.listStyleType = 'none';
  this.el.appendChild(item);
  this.el.scrollTop = this.el.scrollHeight;
};

Log.prototype.clear = function(){
  this.el.innerHTML = '';
};