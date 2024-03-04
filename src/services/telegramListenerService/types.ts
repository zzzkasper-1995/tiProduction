export interface TelegramMessageEvent {
  message: {
    chat: {
      username: string;
    };
    text?: string;
    file?: any; 
    media?: any;
    date: number;
    fwdFrom?: any
  };
}