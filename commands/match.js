const Message = require('telegram-api/types/Message'),
      bot = require('../bot'),
      matchPage = require('../lib/match');

bot.command('match <url> <regexStr>', (message) => {
    const {url, regexStr} = message.args;
    let question1 = new Message().text(`So you want me to GET ${url} and let you know if the response body matches ${regexStr}`);
    bot.send(question1.to(message.chat.id));
    matchPage(url, regexStr)
        .then((result) => {
            let resultMessage = new Message().text(`The result is ${result}`);

            bot.send(resultMessage.to(message.chat.id));
        })
});