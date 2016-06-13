const bot = require('../bot'),
      matchPage = require('../lib/page-analyser');

bot.onText(/match (.*) (.*)/, (message, args) => {
    let [, url, regexStr] = args;

    bot.sendMessage(message.chat.id, `So you want me to GET ${url} and let you know if the response body matches ${regexStr}`);
    matchPage(url, regexStr)
        .then((result) =>
            bot.sendMessage(message.chat.id, `The result is ${result}`)
        )
});