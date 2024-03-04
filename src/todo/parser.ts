const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { NewMessage } = require("telegram/events");
const input = require("input");
const { LocalStorage } = require("node-localstorage");

const storage = new LocalStorage("./localStorage");

const apiId = 28925178;
const apiHash = "cf647cbda4a455ec8c9a16d9d226389c";
const savedSession = storage.getItem("telegram_session");
let stringSession = new StringSession(savedSession ? savedSession : "");

(async () => {
  console.log("Loading interactive example...");

  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err: any) => console.log(err),
  });
  console.log("You should now be connected.");

  // Сохранение сессии в localStorage
  const sessionString = client.session.save();
  storage.setItem("telegram_session", sessionString);

  // Ваш код для работы с Telegram...

  const channel = "@lemonfortea";
  const messages = await client.getMessages(channel, { limit: 1 });
  const lastMessage = messages[0];
  console.log(lastMessage.text);

  client.addEventHandler((event: any) => {
    console.log(event.message);
  }, new NewMessage({}));

  // await client.disconnect();
})();
