const TelegramBot = require('node-telegram-bot-api');

let bot = new TelegramBot(
    process.env.JAVASCRIPTBOT_TOKEN,
    { polling: true }
);

module.exports = bot;