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

            stopPolling(url);
            return match;
        });
}

function stopPolling(url) {
    continuePolling[url] = false;
}

function startPolling(url, regexStr, interval) {
    continuePolling[url] = true;
    return checkForPageMatch(url, regexStr, interval);
}

module.exports = {
    start: startPolling,
    stop: stopPolling
};