const Bot = require('telegram-api/build').default;

let bot = new Bot({
    token: process.env.JAVASCRIPTBOT_TOKEN
});

module.exports = bot;

bot.start();