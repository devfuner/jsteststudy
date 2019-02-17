const defaultPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()\-=_+[\]{};:<>?,.]).{8,}/;

module.exports = {

    createPatternString(option) {
        let patternString = '';
        if (option) {
            if (option.numeric) {
                patternString += '(?=.*\\d)';
            }
            if (option.lowercase) {
                patternString += '(?=.*[a-z])';
            }
            if (option.uppercase) {
                patternString += '(?=.*[A-Z])';
            }
            if (option.specialcharacter) {
                patternString += '(?=.*[~!@#$%^&*()\\-=_+[\\]{};:<>?,.])';
            }
            patternString += '.{8,}';
        }

        return patternString;
    },

    /**
     * input password string
     * output strong level boolean
     */
    passwordChecker(password, option) {
        const patternString = this.createPatternString(option);
        const pattern = patternString ? new RegExp(patternString) : defaultPattern;

        return pattern.test(password);
    },

    division(arr, n) {
        if (n <= 0) {
            return arr;
        }

        const len = arr.length;
        const cnt = Math.floor(len / n) + (Math.floor(len % n) > 0 ? 1 : 0);
        let temp = [];

        // for (let i = 0; i < cnt; i++) {
        //     temp.push(arr.splice(0, n));
        // }

        while (arr.length >= n) {
            temp.push(arr.slice(0, n));
            arr.shift();
        }

        return temp;
    },

    isIncludes(char, characters) {
        return characters.includes(char);
    },

    isLowercase(c) {
        return this.isIncludes(c, 'abcdefghijklmnopqrstuvwxyz');
    },

    isUppercase(c) {
        return this.isIncludes(c, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    },

    isNumeric(c) {
        return this.isIncludes(c, '0123456789');
    },

    isSpecialCharacters(c) {
        return this.isIncludes(c, '~!@#$%^&*()-=_+[]{};:<>?,.');
    },

    isSameCharRepeat(characters, count=3) {
        const arr = this.division(characters.split(''), count);
        return arr.some((ea) => ea.every((e, _, a) => {
            if (a.length === 1) {
                return false;
            }

            return e === a[0]
        }));
    },

    isSequenceCharacters (characters, count=3) {
        const arr = this.division(characters.split(''), count);
        return arr.some((ea) => {
            const sequenceChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
            const idx = sequenceChar.indexOf(ea[0]);

            if (idx === -1) {
                return false;
            }

            for (let i = 0; i < ea.length; i++) {
                let j = i + idx;
                if (!(ea[i] === sequenceChar[j])) return false;
            }

            return true;
        });
    },

    passwordChecker2(password, option={ lengthMin: 8, lengthMax: 99}) {
        const chars = password.split('');

        if (password.length < option.lengthMin
            || password.length > option.lengthMax) {
            return false;
        }

        // 소문자
        let result = chars.some((c) => this.isLowercase(c));
        if (!result) return result;

        // 대문자
        result = chars.some((c) => this.isUppercase(c));
        if (!result) return result;

        // 숫자
        result = chars.some((c) => this.isNumeric(c));
        if (!result) return result;

        // 특수문자
        result = chars.some((c) => this.isSpecialCharacters(c));
        if (!result) return result;

        // 같은 문자 반복 사용
        result = chars.some((c) => this.isSameCharRepeat(c));
        if (!result) return result;

        // 연속된 문자 사용
        result = chars.some((c) => this.isSequenceCharacters(c));
        if (!result) return result;

        return true;
    }
}