const getPage = require('./get');

module.exports = (url, regexStr) => 
    getPage(url)
        .then((response) => {
            let regex = new RegExp(regexStr);

            console.log('matching...');

            return regex.test(response);
        });
