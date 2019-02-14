
module.exports = {
    debounce(targetFn, delay) {
        return function() {
            setTimeout(targetFn, 1000 * delay);
        }
    }
}