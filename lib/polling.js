const pageAnalyser = require('./page-analyser');
let continuePolling = {};

Promise.delay = (delay) =>
    new Promise((resolve) =>
        setTimeout(resolve, delay * 1000)
    );

function checkForPageMatch(url, regexStr, interval) {

    function pollAfterDelay() {
        return Promise.delay(interval)
            .then(() =>
                continuePolling[url] && checkForPageMatch(url, regexStr, interval)
            );
    }

    return pageAnalyser.match(url, regexStr)
        .then((result) => {
            if(!result) {
                return pollAfterDelay();
            }

            stopPolling(url);
            return result;
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