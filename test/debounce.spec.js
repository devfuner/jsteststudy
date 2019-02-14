var sinon = require('sinon');
var debounce = require('../public/javascripts/debounce.js');

describe('debounce', function () {
    it('should call returned function after delay passes',
        function() {
            var clock = sinon.useFakeTimers();
            var delay = 100;

            var targetFn = sinon.spy();
            var delayedFn = debounce.debounce(targetFn, delay);

            delayedFn();

            clock.tick(delay -1);
            clock.restore();
            sinon.assert.notCalled(targetFn);
        });
});