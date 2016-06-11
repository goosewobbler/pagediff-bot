const getPage = require('./get');

module.exports = (url, regexStr) => 
    getPage(url)
        .then((response) => {
            let regex = new RegExp(regexStr),
                result = regex.test(response);

            console.log(`matching ${url} to ${regexStr}, result = ${result}`)

            return result;
        });
