const bot = require('../bot'),
      polling = require('../lib/polling');

bot.onText(/pollStart (.*) (.*) (.*)/, (message, args) => {
    let [, url, regexStr, interval] = args;

    bot.sendMessage(
        message.chat.id,
        `Started polling ${url} for matches of ${regexStr} every ${interval} seconds.  You can stop it with "poll stop ${url}"`
    );

    console.log('CHAT', message.chat.first_name);

    polling.start(url, regexStr, interval)
        .then(() =>
            bot.sendMessage(
                message.chat.id,
                `@${message.chat.first_name} The page at ${url} matches your regex "${regexStr}"`,
                { reply_to_message_id: message.id }
            )
        );
});

bot.onText(/pollStop (.*)/, (message, args) => {
    let [, url] = args;

    polling.stop(url);
    bot.sendMessage(message.chat.id, `Polling for ${url} stopped.`);
});