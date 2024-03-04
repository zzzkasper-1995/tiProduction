import format from 'string-template'

import { TelegramBotService } from '../../services/telegramBotService';
import { GptProviderService } from '../../services/gptService';
import { TelegramListenerService } from '../../services/telegramListenerService';
import { TelegramMessageEvent } from '../../services/telegramListenerService/types';

import { config, promptMap } from './config';
import { isValidJSON, getScore } from './utils';

interface MessageData {
  chanel: string;
  text?: string;
  file?: any;
  media?: any;
  date: number;
  messageInfo?: any
  fwdFrom?: any
}

/** Автор новстного канала */
class AuthorNews {
  private botService: TelegramBotService | null;
  private gptService: GptProviderService | null;
  private telegramListener: TelegramListenerService

  constructor(telegramListener: TelegramListenerService) {
      this.telegramListener = telegramListener;

      this.botService = TelegramBotService.getInstance();
      this.gptService = GptProviderService.getInstance();

      console.log('AuthorNews has created')
  }

  run = () => {
    this.telegramListener.listenToChannel(config.subscribedChannels, this.processMessage);

    console.log('AuthorNews run. Content from ', config.subscribedChannels.join())
  }

   processMessage = async (event: TelegramMessageEvent): Promise<void> => {
    console.log('\n\nAuthorNew.processMessage get new content')
    const res = this.extractMessageData(event);
    console.log('AuthorNew.processMessage', res)
    if (!res.text) return;

    const filteredPost = this.filterPost(res);
    if (!filteredPost) return;

    const formattedText = await this.formatText(filteredPost);
    if (!formattedText) return;

    await this.publishMessage(formattedText);
  }

  extractMessageData = (event: TelegramMessageEvent): MessageData => {
    console.log('AuthorNew.extractMessageData')
    const messageInfo = event?.message

    return {
      chanel: messageInfo?.chat?.username,
      text: messageInfo?.text,
      file: messageInfo?.file,
      media: messageInfo?.media,
      date: messageInfo?.date,
      fwdFrom: messageInfo.fwdFrom
    };
  }

  filterPost = (messageData: MessageData): MessageData | null => {
    const filterRules: { name: string; rule: (messageData: MessageData) => boolean }[] = [
      { name: 'MaxLength', rule: messageData => messageData.text!.length > 600 },
      { name: 'MinLength', rule: messageData => messageData.text!.length < 20 },
      { name: 'ContainsHttp', rule: messageData => messageData.text!.includes('http') },
      { name: 'ContainsAd', rule: messageData => messageData.text!.includes('еклам') || messageData.text!.toLowerCase().includes('erid') },
      { name: 'IsRepost', rule: messageData => !!messageData.fwdFrom },
    ];

    for (let { name, rule } of filterRules) {
      if (!messageData.text) {
        console.log('Сообщение пустое');

        return null;
      }
      if (rule(messageData)) {
        console.log(`Сообщение не прошло фильтрацию по правилу: ${name}`);

        return null;
      }
    }

    return messageData;
  }

  formatText = async (messageData: MessageData): Promise<string | null> => {
    const initialText = messageData?.text || ''

    const formattingRules: ((text: string) => Promise<string>)[] = [
        async (text) => text.replace(/\s+/g, ' ').trim(),
        async (text) => text.replace(`@${messageData?.chanel}`, ''),
        async (text) => {
            try {
                const prompt = format(promptMap.scoring.command, {post: text})
                console.log('prompt', prompt)
                const refinedText = await this.gptService?.getContent(prompt, 'gpt-4');
                console.log('refinedText', refinedText)

                if(!isValidJSON(refinedText)) {
                    return ''
                }

                const unapprovedScore = JSON.parse(refinedText || '')
                const score = getScore(unapprovedScore)
                if((score?.interest || 0) <= 5) {
                    console.error('Новость скучная, score:', score)

                    return  '';
                }
                if((score?.subjectivity || 0) >= 5) {
                    console.error('Новость субъективная, score:', score)

                    return  '';
                }
                if(score?.hasAds) {
                    console.error('Новость содержит рекламу, score:', score)

                    return  '';
                }

                return text;
            } catch (err) {
                console.error('request to GPT failed, err:', err)
            }

            return  '';
        },
        async (text) => {
            try {
                if(!text) {
                    return text
                }
                // const clearPrompt = format(promptMap.clearPost.command, {post: text})
                // const clearText = await this.gptService?.getContent(clearPrompt, 'gpt-3.5-turbo');

                const prompt = format(promptMap.newsRetelling.command, {post: text})
                console.log('prompt', prompt)
                const refinedText = await this.gptService?.getContent(prompt, 'gpt-4-0125-preview');
                console.log('refinedText', refinedText)

                return refinedText || '';
            } catch (err) {
                console.error('request to GPT failed, err:', err)
            }

            return  '';
        },
      ];
  
      try {
        let currentText = initialText;
        for (const rule of formattingRules) {
          currentText = await rule(currentText);
        }
        
        return currentText;
      } catch (error) {
        console.log('Ошибка при форматировании текста:', error);

        return null;
      }
  }

  publishMessage = async (message: string): Promise<void> => {
    console.log('AuthorNew.publishMessage', config.targetChannel, message)
    if(this.botService === null) {
        console.error('AuthorNews', 'botService is null')
    }

    await this.botService!.sendMessage(config.targetChannel, message);
  }
}

export {AuthorNews};
