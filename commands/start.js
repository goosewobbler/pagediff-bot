import bot from '../bot';
import Message from 'telegram-api/types/Message';

const start = new Message().text('YO!  I am a bot.');
bot.command('start', message => {
    bot.send(start.to(message.chat.id));
});