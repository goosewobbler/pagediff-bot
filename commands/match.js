const Message = require('telegram-api/types/Message'),
      bot = require('../bot'),
      getPage = require('../lib/get');

bot.command('match <url> <regexStr>', message => {
    const {url, regexStr} = message.args;
    let question1 = new Message().text(`So you want me to GET ${url} and let you know if the response body matches ${regexStr}`);
    bot.send(question1.to(message.chat.id));
    getPage(url)
        .then((response) => {
            let regex = new RegExp(regexStr),
                result = new Message().text(`The result is ${regex.test(response)}`);

            bot.send(result.to(message.chat.id));
        })
});