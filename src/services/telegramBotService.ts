import { Telegraf } from "telegraf";
require("dotenv").config();

type MessageSender = (channelId: string, message: string) => Promise<void>;

class TelegramBotService {
  private static instance: TelegramBotService;
  private bot: Telegraf;
  private channelId: string | undefined;

  private constructor(token: string) {
    this.bot = new Telegraf(token);
    this.initializeBot();
  }

  public static getInstance(): TelegramBotService | null {
    const token = process.env.BOT_TOKEN;

    if (!token) {
      console.error("Error cant find token");

      return null;
    }

    if (!TelegramBotService.instance) {
      TelegramBotService.instance = new TelegramBotService(token);
    }

    return TelegramBotService.instance;
  }

  private initializeBot(): void {
    this.bot.launch().then(() => {
      console.log("Бот запущен");
    });
  }

  public sendMessage: MessageSender = async (channelId, message) => {
    if (!channelId) {
      throw new Error("Channel ID is not set.");
    }
    if (!message) {
      throw new Error("Message is not set.");
    }
    

    await this.bot.telegram.sendMessage(
      channelId,
      message,
      {parse_mode: 'Markdown'}
    );
  };
}

export { TelegramBotService };
