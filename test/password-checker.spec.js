const pc = require('../public/javascripts/password-checker.js');
var assert = require('chai').assert;

describe('[패스워드 체크]', function () {

    describe('정규식으로 패스워드 체크', function () {
        var tests = [
            {args: 'abcdefghijk', expected: false},
            {args: 'abcDEFghijk', expected: false},
            {args: 'abcDEF12345', expected: false},
            {args: 'abcDE1&', expected: false},
            {args: 'abc12345', expected: false},
            {args: 'abcDE12F', expected: false},
            {args: 'aaaDe122F%', expected: true},
            {args: 'abcDE1&.', expected: true},
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
        };

        tests.forEach(function (test) {
            it(test.args + '는 조건에 맞나요?', function () {
                const isStrong = pc.passwordChecker(test.args, option);
                assert.equal(isStrong, test.expected);
            });
        });
    });

    describe('패스워드 체크 ', function () {
        var tests = [
            {args: 'abcdefghijk', expected: false},
            {args: 'abcDEFghijk', expected: false},
            {args: 'abcDEF12345', expected: false},
            {args: 'abcDE1&', expected: false},
            {args: 'abc12345', expected: false},
            {args: 'abcDE12F', expected: false},
            {args: 'aaaDe122F%', expected: false},
            {args: 'abcDE1&.', expected: false},
            {args: '123abcDEF%', expected: false},
            {args: '_abcDEF123%', expected: false},
            {args: 'abcDEF123!@#', expected: false},
            {args: 'abcDEF123%', expected: false},
        ];

        tests.forEach(function (test) {
            it(test.args + '는 조건에 맞나요?', function () {
                const isStrong = pc.passwordChecker2(test.args);
                assert.equal(isStrong, test.expected);
            });
        });
    });

    describe('배열 분할', function () {
        it('2개로 나눠지나요?', function () {
            const arr = pc.division([1, 2, 3, 4, 5, 6, 7], 2);

            console.log('arr >', arr);
            assert.equal(arr.length, 6);
        });
    });

    describe('같은 문자가 연속하면', function () {
        var tests = [
            {args: 'aaa123!@#', repeat: 3, expected: true},
            {args: 'abc111!@#', repeat: 3, expected: true},
            {args: 'abc123!!!', repeat: 3, expected: true},
            {args: 'aaaaa123!@#', repeat: 5, expected: true},
            {args: 'abc11111!@#', repeat: 5, expected: true},
            {args: 'abc123!!!!!', repeat: 5, expected: true},
            {args: 'abc123!@#', repeat: 3, expected: false},
            {args: 'abc123!@#$%', repeat: 5, expected: false},
        ];

        tests.forEach(function (test) {
            it('안되요! ' + test.args, function () {
                const result = pc.isSameCharRepeat(test.args, test.repeat);
                assert.equal(result, test.expected);
            });
        });
    });

    describe('연속문자가 3자리 이상이면', function () {
        var tests = [
            {args: 'aaa123!@#', repeat: 3, expected: true},
            {args: 'abc111!@#', repeat: 3, expected: true},
            {args: 'abc123xyz', repeat: 3, expected: true},
            {args: 'zyx321*&^', repeat: 3, expected: false},
        ];

        tests.forEach(function (test) {
            it('안되요! ' + test.args, function () {
                const result = pc.isSequenceCharacters(test.args, test.repeat);
                assert.equal(result, test.expected);
            });
        });
    });
});