/**
 * General-purpose queue.
 *
 * Made to work fast on V8.
 */
function Queue() {
  this.inbox = [];
  this.outbox = [];
}

Queue.prototype.enqueue = function(/* objects to enqueue */) {
  this.inbox.push.apply(this.inbox, arguments);
}

Queue.prototype.dequeue = function() {
  if (this.outbox.length === 0) {
    var t = this.outbox;
    this.outbox = this.inbox.reverse();
    this.inbox = t;
  }
  return this.outbox.pop();
}

Queue.prototype.dequeueMultiple = function(count) {
  var result = this.outbox.splice(-count).reverse();
  count -= result.length;
  if (count !== 0) {
    var t = this.outbox;
    this.outbox = this.inbox.reverse();
    this.inbox = t;
    result.push.apply(result, this.outbox.splice(-count).reverse());
  }
  return result;
}

Queue.prototype.size = function() {
  return this.inbox.length + this.outbox.length;
}

Queue.prototype.first = function() {
  return this.outbox.length === 0
    ? this.inbox[0] : this.outbox[this.outbox.length - 1];
}

Queue.prototype.last = function() {
  return this.inbox.length === 0
    ? this.outbox[0] : this.inbox[this.inbox.length - 1];
}

module.exports = Queue;
