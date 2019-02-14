const pc = require('../public/javascripts/password-checker.js');
var assert = require('chai').assert;

describe('Password Checker', function() {
    var tests = [
        {args: 'abcdef', expected: false},
        {args: 'abc123', expected: false},
        {args: 'abc123!@#', expected: true}
    ];

    tests.forEach(function(test) {
        it('is Strong? ' + test.args, function() {
            var isString = pc.passwordChecker(test.args);
            assert.equal(isString, test.expected);
        });
    });
});