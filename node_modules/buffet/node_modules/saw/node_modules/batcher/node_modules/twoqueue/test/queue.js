var assert = require('assert');
var sinon = require('sinon');

try {
    var Queue = require('../lib-cov/queue');
} catch(e) {
    var Queue = require('../lib/queue');
}

sinon.assert.expose(global);

describe('Queue', function() {
  var queue = null;
  beforeEach(function() {
    queue = new Queue();
  });

  describe('#size', function() {
    it('returns the correct size', function() {
      assert.equal(0, queue.size());
      queue.enqueue(1);
      assert.equal(1, queue.size());
      queue.dequeue();
      assert.equal(0, queue.size());
      queue.enqueue(1);
      assert.equal(1, queue.size());
      queue.enqueue(1);
      assert.equal(2, queue.size());
    });
  });
  describe('#dequeue', function() {
    it('returns elements in order', function() {
      queue.enqueue(1);
      queue.enqueue(2);
      assert.equal(1, queue.dequeue());
      queue.enqueue(3);
      assert.equal(2, queue.dequeue());
      assert.equal(3, queue.dequeue());
    });
  });

  describe('#dequeueMultiple', function() {
    it('returns elements in order', function() {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.enqueue(4);
      queue.enqueue(5);
      queue.enqueue(6);
      assert.deepEqual([1, 2, 3], queue.dequeueMultiple(3));
      assert.deepEqual([4, 5], queue.dequeueMultiple(2));
      assert.deepEqual([6], queue.dequeueMultiple(1));
    });

    it('returns empty array for size 0', function() {
      assert.deepEqual([], queue.dequeueMultiple(0));
      queue.enqueue(1);
      assert.deepEqual([], queue.dequeueMultiple(0));
    });

    it('returns all the elements, if not enough available', function() {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      assert.deepEqual([1, 2, 3], queue.dequeueMultiple(4));
    });
  });

  describe('#first', function() {
    it('returns the first element', function() {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      assert.equal(queue.first(), 1);
      queue.dequeue();
      assert.equal(queue.first(), 2);
      queue.enqueue(4);
      queue.enqueue(5);
      assert.equal(queue.first(), 2);
    });
  });

  describe('#last', function() {
    it('returns the last element', function() {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      assert.equal(queue.last(), 3);
      queue.dequeue();
      assert.equal(queue.last(), 3);
      queue.enqueue(4);
      queue.enqueue(5);
      assert.equal(queue.last(), 5);
    });
  });
});
