const getPage = require('./get');

module.exports = (url, regexStr) => 
    getPage(url)
        .then((response) => {
            let regex = new RegExp(regexStr);

            return regex.test(response);
        });
