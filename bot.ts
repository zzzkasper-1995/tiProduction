const { Telegraf } = require('telegraf');

const bot = new Telegraf('Токен вашего бота');

bot.on('text', (ctx) => {
  // Обработка текстовых сообщений
  console.log('Получено сообщение:', ctx.message.text);
});

bot.telegram.getChat('@lemonfortea').then(channelInfo => {
    // Здесь вы можете получить информацию о канале
    console.log(channelInfo);
});

bot.launch();
