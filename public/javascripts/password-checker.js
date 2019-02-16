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
    }
}