const httpClient = require('./http-client');

function match(url, regexStr) {
    return httpClient.get(url)
        .then((response) => {
            let regex = new RegExp(regexStr),
                result = regex.test(response);

            console.log(`matching ${url} to ${regexStr}, result = ${result}`);

            return result;
        });
}

module.exports = { match };
