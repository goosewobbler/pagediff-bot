const bot = require('../bot');

bot.onText(/start/, (message) => {
    bot.sendMessage(message.chat.id, 'YO!  I am a bot.');
});