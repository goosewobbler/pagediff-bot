const Message = require('telegram-api/types/Message'),
      bot = require('../bot'),
      start = new Message().text('YO!  I am a bot.');

bot.command('start', (message) => {
    bot.send(start.to(message.chat.id));
});