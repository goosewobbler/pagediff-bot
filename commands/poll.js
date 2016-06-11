const Message = require('telegram-api/types/Message'),
      polling = require('../lib/polling'),
      bot = require('../bot');

bot.command('pollStart <url> <regexStr> <interval>', (message) => {
    const { url, regexStr, interval } = message.args;
    let status = new Message().text(`Started polling ${url} for matches of ${regexStr} every ${interval} seconds.  You can stop it with "poll stop ${url}"`);

    console.log('CHAT', message.chat.getChatMember());

    polling.start(url, regexStr, interval)
        .then(() => {
            let resultMessage = new Message().text(`The page at ${url} matches your regex "${regexStr}"`);

            bot.send(resultMessage.to(message.chat.id));
        });

    bot.send(status.to(message.chat.id));
});

bot.command('pollStop <url>', (message) => {
    const { url } = message.args;
    let status = new Message().text(`Polling for ${url} stopped.`);
    bot.send(status.to(message.chat.id));

    polling.stop(url);
});