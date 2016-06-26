const pageAnalyser = require('./page-analyser');
let continuePolling = {};

Promise.delay = (delay) =>
    new Promise((resolve) =>
        setTimeout(resolve, delay * 1000)
    );

function checkForPageMatch(...args) {
    let [url, regexStr, interval] = args;

    function pollAfterDelay() {
        return Promise.delay(interval)
            .then(() =>
                continuePolling[url] && checkForPageMatch(...args)
            );
    }

    return pageAnalyser.match(url, regexStr)
        .then((result) => {
            if(!result) {
                return pollAfterDelay();
            }

            stopPolling(url);
            return result;
        })
        .catch((ex) => {
            console.log(ex);
            return stopPolling(url);
        });
}

function stopPolling(url) {
    console.log('Stopping polling...');
    return new Promise((resolve) => {
        continuePolling[url] = false;
        resolve();
    });
}

function startPolling(url, regexStr, interval) {
    console.log('Starting polling...');
    continuePolling[url] = true;
    return checkForPageMatch(url, regexStr, interval);
}

module.exports = {
    start: startPolling,
    stop: stopPolling
};