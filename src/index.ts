import { TelegramListenerService } from './services/telegramListenerService';
import {AuthorNews} from './authors/authorNews';

async function main() {
    const telegramListener = TelegramListenerService.getInstance();
    await telegramListener.init();

    const authorNews = new AuthorNews(telegramListener);

    authorNews.run()
}

export { main };
