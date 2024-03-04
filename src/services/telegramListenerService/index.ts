import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { NewMessage } from "telegram/events";
import * as input from "input";
import { LocalStorage } from "node-localstorage";

import { TelegramMessageEvent } from "./types";

class TelegramListenerService {
  private static instance: TelegramListenerService;

  private client: TelegramClient;
  private storage: LocalStorage;
  private apiId: number = 28925178;
  private apiHash: string = "cf647cbda4a455ec8c9a16d9d226389c";
  private session: StringSession;

  constructor() {
    const storagePath = "./localStorage";
    this.storage = new LocalStorage(storagePath);
    const savedSession = this.storage.getItem("telegram_session");
    this.session = new StringSession(savedSession ? savedSession : "");
    this.client = new TelegramClient(this.session, this.apiId, this.apiHash, {
      connectionRetries: 5,
    });
  }

  public static getInstance(): TelegramListenerService {
    if (!TelegramListenerService.instance) {
      TelegramListenerService.instance = new TelegramListenerService();
    }

    return TelegramListenerService.instance;
  }

  async init() {
    console.log("Initializing Telegram client...");
    await this.client.start({
      phoneNumber: async () => await input.text("Please enter your number: "),
      password: async () => await input.text("Please enter your password: "),
      phoneCode: async () =>
        await input.text("Please enter the code you received: "),
      onError: (err) => console.log(err),
    });
    console.log("Telegram client initialized and connected.");

    // Сохранение сессии в localStorage
    const sessionString = this.client.session.save() as unknown as string;
    this.storage.setItem("telegram_session", sessionString);
  }

  async listenToChannel(
    channels: string[],
    callback: (event: TelegramMessageEvent) => Promise<void>,
  ) {
    const handler = (event: TelegramMessageEvent) => {
      if (event) {
        callback(event);
      }
    };

    this.client.addEventHandler(handler, new NewMessage({ chats: channels }));
  }

  async disconnect() {
    await this.client.disconnect();
  }
}

export { TelegramListenerService };
