const matchPage = require('./match');
let continuePolling = {};

function checkForPageMatch(url, regexStr, interval) {

    function pollAfterDelay() {
        return Promise.delay(interval)
            .then(() => checkForPageMatch(url, regexStr, interval));
    }

    return matchPage(url, regexStr)
        .then((match) => {
            if(continuePolling[url] && !match) {
                pollAfterDelay();
            }

            return match;
        });
}

module.exports = {
    start: (url, regexStr, interval) => {
        continuePolling[url] = true;
        return checkForPageMatch(url, regexStr, interval);
    },
    stop: (url) => {
        continuePolling[url] = false;
    }
};