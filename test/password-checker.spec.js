const pc = require('../public/javascripts/password-checker.js');
var assert = require('chai').assert;

describe('Password Checker', function() {
    var tests = [
        {args: 'abcdefghijk', expected: false},
        {args: 'abcDEFghijk', expected: false},
        {args: 'abcDEF12345', expected: false},
        {args: 'abcDE1&', expected: false},
        {args: 'abcDE1&.', expected: true},
        {args: 'abc12345', expected: false},
        {args: 'abcDE12F', expected: false},
        {args: '123abcDEF%', expected: true},
        {args: '_abcDEF123%', expected: true},
        {args: 'abcDEF123!@#', expected: true},
        {args: 'abcDEF123%', expected: true},
    ];

    const option = {
        lowercase: true,
        uppercase: true,
        numeric: true,
        specialcharacter: true
    }

    tests.forEach(function(test) {
        it('is Strong? ' + test.args, function() {
            var isStrong = pc.passwordChecker(test.args);
            assert.equal(isStrong, test.expected);
        });
    });
});